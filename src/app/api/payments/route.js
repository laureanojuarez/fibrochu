import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { supabase } from "../../../utils/supabase/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const { description, price, quantity, email } = body;

    const preference = new Preference(client);
    const preferenceData = {
      items: [
        {
          title: description,
          unit_price: parseFloat(price), // Asegúrate de convertir correctamente a número decimal
          quantity: parseInt(quantity),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
      payer: {
        email: email,
      },
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 2,
      },
    };
    const result = await preference.create({ body: preferenceData });

    // Guardamos la orden en Supabase
    await supabase.from("orders").insert({
      user_email: email,
      product_name: description,
      price: price,
      quantity: quantity,
      status: "pending",
      payment_id: result.id,
    });

    if (error) {
      console.error("Error al insertar la orden en Supabase:", error);
      return NextResponse.json(
        { error: "Error al insertar la orden en Supabase" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: result.id });
  } catch (error) {
    console.error("Error al crear la preferencia", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia" },
      { status: 500 }
    );
  }
}
