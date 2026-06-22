import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const transporter = nodemailer.createTransport({
  host: "smtpdm.aliyun.com",
  port: Number("465"),
  secure: true,
  auth: {
    user: "webpush@push.qixinghv.com",
    pass: "7xK2qP9vR5mL"
  }
});
function buildHtml(body) {
  const fields = Object.entries(body).filter(([, v]) => v?.trim()).map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${v}</td></tr>`).join("");
  return `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;padding:20px">
<h2 style="color:#f90">New Inquiry from Qixing Website</h2>
<table style="border-collapse:collapse">${fields}</table>
<p style="color:#999;font-size:12px;margin-top:24px">Sent via qixinghv.com contact form</p>
</body></html>`;
}
async function POST({ request }) {
  try {
    const body = await request.json();
    const to = "mark@qixinghv.com";
    const from = "webpush@push.qixinghv.com";
    const emailLabel = body.email || body["Your Email"] || "(no email)";
    await transporter.sendMail({
      from: `"Qixing Website" <${from}>`,
      to,
      replyTo: body.email || void 0,
      subject: `New Inquiry — ${emailLabel}`,
      text: Object.entries(body).filter(([, v]) => v?.trim()).map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: buildHtml(body)
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Contact form email error:", err);
    return new Response(JSON.stringify({ success: false, error: "Send failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
