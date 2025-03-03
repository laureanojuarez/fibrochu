import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, email } = body;

    const preference = new Preference(client);
    const preferenceData = {
      items,
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
      external_reference: orderId,
      notification_url: "http://localhost:3000/api/webhook/mercadopago",
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

    return NextResponse.json({ id: result.id });
  } catch (error) {
    console.error("Error al crear la preferencia", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia" },
      { status: 500 }
    );
  }
}
