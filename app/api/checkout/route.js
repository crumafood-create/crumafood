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
            title: body.title || "Pedido CRUMAFOOD",
            quantity: 1,
            unit_price: Number(body.price),
            currency_id: "MXN",
          },
        ],
        // Esto asegura que después de pagar, regresen a tu web
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`,
        },
        auto_return: "approved",
      },
    });

    // Importante: devolvemos init_point que es la URL de pago
    return NextResponse.json({ init_point: response.init_point });

  } catch (error) {
    console.error("Error Mercado Pago:", error);
    return NextResponse.json({ error: "Error al crear el pago" }, { status: 500 });
  }
}