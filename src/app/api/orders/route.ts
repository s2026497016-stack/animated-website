import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { Order } from "@/types";

const OWNER_EMAIL = "thriftee.wear2026@gmail.com";
const digitsOnly = (value: string) => value.replace(/\D/g, "");

const buildOrderEmailHtml = (order: Order) => {
  const customerWhatsApp = `https://wa.me/${digitsOnly(order.phone)}?text=${encodeURIComponent(
    `Hi ${order.customerName}, this is THRIFTEE regarding your order ${order.id}.`,
  )}`;
  const itemRows = order.items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return `<li>${product?.name ?? item.productId} x ${item.quantity} — PKR ${(
        item.price * item.quantity
      ).toLocaleString()}</li>`;
    })
    .join("");

  return `
    <h2>New THRIFTEE Order: ${order.id}</h2>
    <p><strong>Customer:</strong> ${order.customerName}</p>
    <p><strong>Email:</strong> ${order.customerEmail}</p>
    <p><strong>Phone:</strong> ${order.phone}</p>
    <p><strong>Address:</strong> ${order.address}</p>
    <p><strong>Payment:</strong> ${order.paymentMethod}</p>
    <ul>${itemRows}</ul>
    <p><strong>Total:</strong> PKR ${order.total.toLocaleString()}</p>
    <p><strong>WhatsApp Customer:</strong> <a href="${customerWhatsApp}">${customerWhatsApp}</a></p>
  `;
};

export async function POST(request: Request) {
  const order = (await request.json()) as Order;

  if (!order?.id || !order?.customerEmail) {
    return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json({ ok: true, simulated: true });
  }

  const authValue = ["Bearer", resendApiKey].join(" ");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: authValue,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "orders@thriftee.store",
      to: OWNER_EMAIL,
      subject: `New THRIFTEE Order ${order.id}`,
      html: buildOrderEmailHtml(order),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to send order email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
