import { supabase } from "@/supabase/client";
import { NextResponse } from "next/server";

// Asegura que la ruta sea dinámica y no se cache
export const dynamic = "force-dynamic";

export async function POST(req) {
  console.log(`🔔 Webhook recibido: ${new Date().toISOString()}`);

  try {
    const body = await req.json();
    console.log("Webhook payload:", JSON.stringify(body, null, 2));

    const topic = body.topic || body.type;
    const action = body.action || "";

    // Verificar si es una notificación de prueba o una notificación real de pago
    if ((topic !== "payment" && !body.data) || !body.data?.id) {
      console.log("No es una notificación de pago válida o faltan datos");
      return NextResponse.json({
        status: "ignored",
        message: "Notificación no relevante",
      });
    }

    // Extraer ID de pago correctamente
    const paymentId = body.data.id;
    console.log(`✅ Procesando notificación para pago ID: ${paymentId}`);

    // Obtener detalles del pago desde MercadoPago
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Token de acceso de MercadoPago no configurado");
    }

    console.log(
      `🔍 Consultando detalles del pago ${paymentId} en MercadoPago...`
    );
    const paymentDetailsResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!paymentDetailsResponse.ok) {
      console.error(
        `❌ Error al obtener detalles del pago: ${paymentDetailsResponse.status}`
      );

      // Si es un error 404, puede ser un pago que aún no existe o una prueba
      if (paymentDetailsResponse.status === 404) {
        console.log(
          "⚠️ Pago no encontrado en MercadoPago (404). Puede ser una prueba o un pago recién creado."
        );
        return NextResponse.json({
          status: "acknowledged",
          message: "Notificación recibida, pero el pago no está disponible aún",
        });
      }

      throw new Error(
        `Error obteniendo detalles de pago: ${paymentDetailsResponse.status}`
      );
    }

    // Procesar el pago normalmente
    const payment = await paymentDetailsResponse.json();
    console.log(`💰 Detalles del pago ${paymentId} obtenidos correctamente`);
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

    // Al finalizar, agregar logs claros
    if (status === "approved") {
      console.log(`💵 Pago ${paymentId} aprobado y procesado correctamente`);
    } else {
      console.log(`ℹ️ Pago ${paymentId} procesado con estado: ${status}`);
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("❌ Error en el webhook:", error);
    return NextResponse.json(
      {
        error: "Error processing webhook",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Endpoint GET para verificar que el webhook está activo
export async function GET() {
  return NextResponse.json({
    status: "online",
    message: "Webhook endpoint está activo y listo para recibir notificaciones",
    timestamp: new Date().toISOString(),
  });
}
