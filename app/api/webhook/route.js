import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.type !== "payment") {
      return NextResponse.json({ message: "Not a payment" });
    }

    const paymentId = body.data.id;

    // 🔎 Consultar pago en Mercado Pago
    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      }
    );

    const payment = await mpResponse.json();

    // ✅ Solo continuar si está aprobado
    if (payment.status !== "approved") {
      return NextResponse.json({ message: "Payment not approved" });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 🛡️ Verificar si ya existe la orden (anti-duplicados)
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("id")
      .eq("payment_id", payment.id)
      .maybeSingle();

    if (!existingOrder) {
      await supabase.from("orders").insert([
        {
          payment_id: payment.id,
          status: payment.status,
          amount: payment.transaction_amount,
          payer_email: payment.payer.email,
        },
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
