import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const preference = new Preference(client);
    
    // Usamos el dominio que viene en la petición para que coincida siempre
    const host = req.headers.get("host");
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

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
        // payer_email es recomendable para evitar errores de procesamiento
        payer: {
          email: body.email || "cliente@crumafood.com.mx",
        },
        back_urls: {
          success: `${baseUrl}/success`,
          failure: `${baseUrl}/failure`,
          pending: `${baseUrl}/pending`,
        },
        auto_return: "approved",
        // Vinculamos el webhook que ya configuraste en el panel de MP
        notification_url: `${baseUrl}/api/webhook`,
        external_reference: `order_${Date.now()}`,
      },
    });

    return NextResponse.json({ init_point: response.init_point });

  } catch (error) {
    console.error("❌ Error Mercado Pago:", error);
    return NextResponse.json({ error: "Error al crear el pago" }, { status: 500 });
  }
}