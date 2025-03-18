import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { items, buyer } = await req.json();

    if (
      !buyer ||
      !buyer.nombre ||
      !buyer.apellido ||
      !buyer.direccion ||
      !buyer.region ||
      !buyer.region.toLowerCase().includes("rosario")
    ) {
      return NextResponse.json(
        { error: "Información del comprador incompleta o inválida" },
        { status: 400 }
      );
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: item.nombre,
          quantity: 1,
          description: `Instrucciones: ${
            item.descripcion || "Sin instrucciones"
          }`,
          unit_price: Number(item.precio),
          picture_url: item.imagen_url,
          category_id: "fibrochu_products",
        })),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_DOMAIN}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_DOMAIN}/payment/failure`,
        },
        auto_return: "approved",
        statement_descriptor: "Fibrochu - Productos de Fibrofácil",

        payer: {
          name: buyer.nombre,
          surname: buyer.apellido,
          address: {
            street_name: buyer.direccion,
            street_number: "",
            zip_code: "2000",
          },
        },

        metadata: {
          buyer_name: buyer.nombre,
          buyer_surname: buyer.apellido,
          buyer_address: buyer.direccion,
          buyer_region: buyer.region,
          items_with_instructions: JSON.stringify(
            items.map((i) => ({
              id: i.id,
              nombre: i.nombre,
              instrucciones: i.descripcion,
            }))
          ),
        },
        shipments: {
          cost: 0,
          mode: "not_specified",
          receiver_address: {
            street_name: buyer.direccion,
            city_name: "Rosario",
            state_name: "Santa Fe",
            country_name: "AR",
            zip_code: "2000",
          },
        },
        payment_methods: {
          excluded_payment_types: [],
          installments: 6,
        },
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
