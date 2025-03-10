import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
const preference = new Preference(client);

export async function POST(request) {
  const { items } = await request.json();

  try {
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.title,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
        auto_return: "approved",
      },
    });

    return new Response(JSON.stringify({ init_point: response.init_point }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
