import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Configurar cliente de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// Manejador GET
export async function GET() {
  return NextResponse.json({
    message: "Esta ruta existe pero requiere una solicitud POST",
    help: "Debes usar el método POST para crear una preferencia de pago",
  });
}

// Manejador POST
export async function POST(request) {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { items, buyer } = await request.json();

    // Validar datos
    if (!buyer || !buyer.nombre || !buyer.apellido || !buyer.direccion) {
      return NextResponse.json(
        { error: "Información del comprador incompleta" },
        { status: 400 }
      );
    }

    // Generar ID único para la orden
    const orderId = `fibrochu_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    // Crear instancia de Preference
    const preference = new Preference(client);

    // Crear preferencia de pago
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: item.nombre,
          quantity: 1,
          unit_price: Number(item.precio),
          picture_url: item.imagen_url,
          description: item.descripcion || "Sin instrucciones",
        })),
        payer: {
          name: buyer.nombre,
          surname: buyer.apellido,
          address: {
            street_name: buyer.direccion,
            street_number: "",
            zip_code: "2000",
          },
        },
        back_urls: {
          success: `${
            process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
          }/payment/success`,
          failure: `${
            process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
          }/payment/failure`,
        },
        external_reference: orderId,
        auto_return: "approved",
        metadata: {
          orderId: orderId,
          buyer_info: JSON.stringify(buyer),
        },
      },
    });

    // Retornar respuesta exitosa
    return NextResponse.json({
      preferenceId: response.id,
      init_point: response.init_point,
      orderId,
    });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);

    // Retornar respuesta de error
    return NextResponse.json(
      { error: "No se pudo crear la preferencia" },
      { status: 500 }
    );
  }
}
