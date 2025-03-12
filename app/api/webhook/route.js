import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const supabase = await createClient({ cookies: cookieStore });

    const body = await req.json();

    console.log("Webhook payload completo:", JSON.stringify(body, null, 2));

    if (!body.data) {
      throw new Error("No se recibieron datos en el webhook");
    }

    console.log("Data del webhook:", JSON.stringify(body.data, null, 2));

    // Extraer información relevante del webhook
    const {
      status,
      preference_id,
      id: payment_id, // MercadoPago usa 'id' para el payment_id
      transaction_amount,
      payer,
    } = body.data;
    // Guardar el estado del pago en la base de datos
    const { error } = await supabase.from("orders").insert([
      {
        payment_id,
        status,
        preference_id,
        created_at: new Date().toISOString(),
        payer_email: payer?.email,
        total_amount: transaction_amount,
        raw_data: body, // Guarda el payload completo por si lo necesitas después
      },
    ]);

    if (error) {
      console.error("Error de Supabase:", error);
      throw error;
    }
    // Responder a MercadoPago
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
