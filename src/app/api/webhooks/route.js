import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Notificación recibida:", body);

    // Verifica la notificación de MercadoPago
    if (body.type === "payment" && body.data && body.data.id) {
      const paymentId = body.data.id;
      console.log("Payment ID:", paymentId);

      // Obtén los detalles del pago desde MercadoPago
      const paymentResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
          },
        }
      );
      const paymentData = await paymentResponse.json();
      console.log("Detalles del pago:", paymentData);

      if (paymentData.status === "approved") {
        // Crear la orden en Supabase
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .insert({
            user_email: paymentData.payer.email,
            items: JSON.stringify(paymentData.additional_info.items), // Guardamos los items como JSON
            status: "completed",
            payment_id: paymentId,
          })
          .select("*")
          .single();

        if (orderError) {
          console.error("Error al insertar la orden en Supabase:", orderError);
          return NextResponse.json(
            { error: "Error al insertar la orden en Supabase" },
            { status: 500 }
          );
        }

        console.log("Orden creada:", orderData);

        // Actualiza el stock del producto en Supabase
        const { error: stockError } = await supabase
          .from("productos")
          .update({ stock: 0 })
          .eq("id", paymentData.additional_info.items[0].id);

        if (stockError) {
          console.error(
            "Error al actualizar el stock en Supabase:",
            stockError
          );
          return NextResponse.json(
            { error: "Error al actualizar el stock en Supabase" },
            { status: 500 }
          );
        }

        return NextResponse.json({
          message: "Pago procesado, orden creada y stock actualizado",
        });
      }
    }

    return NextResponse.json({ message: "Notificación no procesada" });
  } catch (error) {
    console.error("Error al procesar la notificación de MercadoPago:", error);
    return NextResponse.json(
      { error: "Error al procesar la notificación de MercadoPago" },
      { status: 500 }
    );
  }
}
