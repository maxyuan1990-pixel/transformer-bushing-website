import nodemailer from "nodemailer";

export const prerender = false;

const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,
  port: Number(import.meta.env.SMTP_PORT),
  secure: import.meta.env.SMTP_SECURE === "true",
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
});

function buildHtml(body: Record<string, string>) {
  const fields = Object.entries(body)
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${v}</td></tr>`)
    .join("");

  return `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;padding:20px">
<h2 style="color:#f90">New Inquiry from Qixing Website</h2>
<table style="border-collapse:collapse">${fields}</table>
<p style="color:#999;font-size:12px;margin-top:24px">Sent via qixinghv.com contact form</p>
</body></html>`;
}

export async function POST({ request }: { request: Request }) {
  try {
    const body: Record<string, string> = await request.json();
    const to = import.meta.env.SMTP_TO || "mark@qixinghv.com";
    const from = import.meta.env.SMTP_FROM;

    const emailLabel = body.email || body["Your Email"] || "(no email)";

    await transporter.sendMail({
      from: `"Qixing Website" <${from}>`,
      to,
      replyTo: body.email || undefined,
      subject: `New Inquiry — ${emailLabel}`,
      text: Object.entries(body)
        .filter(([, v]) => v?.trim())
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n"),
      html: buildHtml(body),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Contact form email error:", err);
    return new Response(JSON.stringify({ success: false, error: "Send failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
