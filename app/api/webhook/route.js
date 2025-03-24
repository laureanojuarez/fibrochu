import { supabase } from "@/supabase/client";
import { NextResponse } from "next/server";

// Asegura que la ruta sea dinámica y no se cache
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();

    const topic = body.topic || body.type;

    if (topic !== "payment" && !body.data) {
      console.log("No es una notificación de pago o faltan datos");
      return NextResponse.json({
        status: "ignored",
        message: "Notificación no relevante",
      });
    }

    let paymentId;
    if (topic === "payment") {
      paymentId = body.data.id;
    } else {
      paymentId = body.data?.id;
    }

    if (!paymentId) {
      throw new Error("No se pudo identificar el ID de pago");
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    const paymentDetailsResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!paymentDetailsResponse.ok) {
      throw new Error(
        `Error obteniendo detalles de pago: ${paymentDetailsResponse.status}`
      );
    }

    const payment = await paymentDetailsResponse.json();
    console.log("Detalles del pago:", JSON.stringify(payment, null, 2));

    // Extraer información del pago
    const {
      status,
      status_detail,
      preference_id,
      transaction_amount,
      date_created,
      date_approved,
      payment_method_id,
      payment_type_id,
      external_reference,
      metadata = {},
    } = payment;

    // Extraer información del comprador
    const {
      buyer_name = "",
      buyer_surname = "",
      buyer_address = "",
      buyer_region = "",
      orderId = external_reference,
      items_with_instructions = "{}",
    } = metadata;

    // Parsea la información del comprador desde metadata si existe
    let buyerInfo = {};
    if (metadata.buyer_info) {
      try {
        buyerInfo = JSON.parse(metadata.buyer_info);
      } catch (e) {
        console.error("Error al parsear buyer_info:", e);
      }
    }

    let itemsData = [];
    try {
      itemsData = JSON.parse(items_with_instructions);
    } catch (e) {
      console.error("Error al parsear items_with_instructions:", e);
    }

    // Generar un ID personalizado para referencia
    const customOrderId =
      external_reference ||
      `fibrochu_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Buscamos primero por external_reference
    let orderQuery;
    if (external_reference) {
      console.log(
        `Buscando orden con external_reference: ${external_reference}`
      );
      orderQuery = await supabase
        .from("orders")
        .select("*")
        .eq("external_reference", external_reference)
        .single();
    }

    // Si no encontramos, buscamos por payment_id
    if (!orderQuery?.data) {
      console.log(
        `No se encontró orden con external_reference, buscando por payment_id: ${paymentId}`
      );
      orderQuery = await supabase
        .from("orders")
        .select("*")
        .eq("payment_id", paymentId)
        .single();
    }

    const existingOrder = orderQuery?.data;

    if (existingOrder) {
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status,
          status_detail,
          updated_at: new Date().toISOString(),
          payment_id: paymentId,
        })
        .eq("id", existingOrder.id);

      if (updateError) {
        console.error("Error al actualizar orden:", updateError);
        throw updateError;
      }

      console.log(`Orden ${paymentId} actualizada con estado: ${status}`);
      return NextResponse.json({ status: "updated" });
    }

    // ID para inserción
    const newOrderId = String(paymentId);

    const { error: insertError } = await supabase.from("orders").insert([
      {
        id: newOrderId,
        order_reference: customOrderId, // ID personalizado en la nueva columna
        external_reference,
        payment_id: paymentId,
        preference_id,
        status,
        status_detail,
        created_at: new Date().toISOString(),
        payment_date: date_approved || date_created,
        total_amount: transaction_amount,
        payment_method: payment_method_id,
        payment_type: payment_type_id,

        // Usar los datos del comprador que vienen en buyer_info si están disponibles
        buyer_name: buyerInfo.nombre || buyer_name,
        buyer_surname: buyerInfo.apellido || buyer_surname,
        buyer_address: buyerInfo.direccion || buyer_address,
        buyer_region: buyer_region,

        items_data: itemsData,

        raw_data: payment,
      },
    ]);

    if (insertError) {
      console.error("Error al insertar orden:", insertError);
      throw insertError;
    }

    if (status === "approved") {
      console.log(`Pago ${paymentId} aprobado y procesado correctamente`);
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Error en el webhook:", error);
    return NextResponse.json(
      {
        error: "Error processing webhook",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Para responder a solicitudes GET
export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint activo",
    info: "Este endpoint está diseñado para recibir notificaciones de MercadoPago",
  });
}
