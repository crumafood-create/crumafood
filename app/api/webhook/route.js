import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto"; // Necesario para validar la firma

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    // 1. VALIDACIÓN DE SEGURIDAD (Usando el Secret que pegaste en Vercel)
    const xSignature = req.headers.get("x-signature");
    const xRequestId = req.headers.get("x-request-id");
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

    // Solo validamos si el secret existe para no romper pruebas locales
    if (secret && xSignature && xRequestId) {
      const parts = xSignature.split(",");
      const ts = parts.find(p => p.startsWith("ts=")).split("=")[1];
      const hash = parts.find(p => p.startsWith("v1=")).split("=")[1];
      
      const manifest = `id:${xRequestId};ts:${ts};`;
      const hmac = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

      if (hmac !== hash) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    // 2. OBTENCIÓN DEL ID DEL PAGO
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("data.id") || searchParams.get("id");
    const body = await req.json().catch(() => ({}));
    const paymentId = id || body?.data?.id;

    if (!paymentId) {
      return NextResponse.json({ message: "No payment ID found" }, { status: 200 });
    }

    // 3. CONSULTA A MERCADO PAGO
    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      }
    );

    if (!mpResponse.ok) throw new Error("Error fetching payment data");
    const payment = await mpResponse.json();

    // 4. GUARDAR EN SUPABASE SI ESTÁ APROBADO
    if (payment.status === "approved") {
      const { error: insertError } = await supabase.from("orders").insert([
        {
          payment_id: payment.id.toString(),
          status: payment.status,
          amount: payment.transaction_amount,
          payer_email: payment.payer?.email || "cliente@mercadopago.com",
          created_at: new Date().toISOString(),
        },
      ]);

      // Si el error es por duplicado, el constraint de Supabase lo manejará
      if (insertError && insertError.code !== "23505") throw insertError;
      
      console.log("✅ Orden procesada:", payment.id);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}