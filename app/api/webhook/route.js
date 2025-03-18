import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    console.log("Webhook recibido:", JSON.stringify(body, null, 2));

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
      metadata = {},
    } = payment;

    // Extraer información del comprador
    const {
      buyer_name = "",
      buyer_surname = "",
      buyer_address = "",
      buyer_region = "",
      items_with_instructions = "{}",
    } = metadata;

    let itemsData = [];
    try {
      itemsData = JSON.parse(items_with_instructions);
    } catch (e) {
      console.error("Error al parsear items_with_instructions:", e);
    }

    const { data: existingOrder } = await supabase
      .from("orders")
      .select("*")
      .eq("payment_id", paymentId)
      .single();

    if (existingOrder) {
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status,
          status_detail,
          updated_at: new Date().toISOString(),
        })
        .eq("payment_id", paymentId);

      if (updateError) {
        console.error("Error al actualizar orden:", updateError);
        throw updateError;
      }

      console.log(`Orden ${paymentId} actualizada con estado: ${status}`);
      return NextResponse.json({ status: "updated" });
    }

    const { error: insertError } = await supabase.from("orders").insert([
      {
        payment_id: paymentId,
        preference_id,
        status,
        status_detail,
        created_at: new Date().toISOString(),
        payment_date: date_approved || date_created,
        total_amount: transaction_amount,
        payment_method: payment_method_id,
        payment_type: payment_type_id,

        buyer_name: buyer_name,
        buyer_surname: buyer_surname,
        buyer_address: buyer_address,
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
