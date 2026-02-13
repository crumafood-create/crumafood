import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();

    if (body.type === "payment") {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: body.data.id });

      console.log("Pago recibido:", paymentData);

      if (paymentData.status === "approved") {
        console.log("✅ Pago aprobado:", paymentData.id);
        
        // Aquí luego conectamos base de datos
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
