import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
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
      },
    });

    return Response.json({
      id: response.id,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error creating preference" }, { status: 500 });
  }
}
