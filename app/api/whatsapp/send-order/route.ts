import { NextRequest, NextResponse } from "next/server";

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v26.0";

function cleanPhone(value: string) {
  return value.replace(/\D/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const adminNumber = cleanPhone(process.env.WHATSAPP_ADMIN_NUMBER || "");
    const templateName = process.env.WHATSAPP_ORDER_TEMPLATE || "order_notification";
    const templateLanguage = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "ar";

    if (!token || !phoneNumberId || !adminNumber) {
      return NextResponse.json(
        { ok: false, error: "WhatsApp environment variables are missing." },
        { status: 500 }
      );
    }

    const order = await request.json();

    const orderMessage = String(order.orderMessage || "طلب جديد من رمال الطائف");

    // Production order alerts should use an approved WhatsApp template.
    // Create a template named `order_notification` whose body contains one
    // text variable, for example:
    // "طلب جديد من رمال الطائف\n\n{{1}}"
    const payload = {
      messaging_product: "whatsapp",
      to: adminNumber,
      type: "template",
      template: {
        name: templateName,
        language: { code: templateLanguage },
        components: [
          {
            type: "body",
            parameters: [{ type: "text", text: orderMessage }],
          },
        ],
      },
    };

    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API error:", data);
      return NextResponse.json(
        { ok: false, error: data?.error?.message || "WhatsApp API error", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (error) {
    console.error("send-order error:", error);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
