import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("id");

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
    }

    const payment = new Payment(client);
    const response = await payment.get({ id: paymentId });

    return NextResponse.json({
      id: response.id,
      status: response.status,
      amount: response.transaction_amount,
      payer_email: response.payer?.email,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching payment" }, { status: 500 });
  }
}
