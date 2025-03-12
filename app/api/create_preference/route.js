import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { items } = await req.json();

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.title,
          quantity: 1,
          unit_price: Number(item.unit_price),
          picture_url: item.imagen,
        })),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_DOMAIN}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_DOMAIN}/payment/failure`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({
      preferenceId: response.id,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia" },
      { status: 500 }
    );
  }
}
