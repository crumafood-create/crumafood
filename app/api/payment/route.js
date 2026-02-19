import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: "Pedido CRUMAFOOD",
            quantity: 1,
            unit_price: Number(body.price || 10), // Precio dinámico o 10 por defecto
            currency_id: "MXN",
          },
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`,
        },
        auto_return: "approved",
      },
    });

    // Aquí devolvemos el ID para que el botón redirija al usuario
    return NextResponse.json({ id: response.id });

  } catch (error) {
    console.error("Error al crear preferencia:", error);
    return NextResponse.json({ error: "Error al crear el pago" }, { status: 500 });
  }
}
