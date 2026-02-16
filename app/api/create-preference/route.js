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
            title: body.title,
            quantity: 1,
            unit_price: Number(body.price),
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

    return NextResponse.json({
  id: response.id,
  init_point: response.init_point,
});


  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating preference" },
      { status: 500 }
    );
  }
}
