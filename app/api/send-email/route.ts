// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || process.env.SMTP_USER;

if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
  console.warn(
    "[send-email] Missing SMTP env vars. Check .env.local (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)."
  );
}

/**
 * POST /api/send-email
 * Expects JSON like:
 * {
 *   "email": "person@example.com",
 *   "code": "ABCD1234",
 *   "summary": "optional text",
 *   "raw": {...anything, ignored}
 * }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, code, summary } = body as {
      email?: string;
      code?: string;
      summary?: string;
    };

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Missing email" },
        { status: 400 }
      );
    }

    // Fallback subject/body if code/summary aren’t provided
    const subject = "Your MINDTRX – Inner Mind Integration results";
    const textBody = [
      "Thank you for completing the MINDTRX – Inner Mind Integration Inventory.",
      code ? `\nYour result code: ${code}` : "",
      summary ? `\n\nSummary:\n${summary}` : "",
      "\n\nYou can return to your results page any time using your saved link.",
    ]
      .join("")
      .trim();

    const htmlBody = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="color:#7c3aed; margin-bottom: 8px;">
          MINDTRX – Inner Mind Integration Inventory
        </h2>
        <p>Thank you for completing your Inner Mind Integration assessment.</p>
        ${
          code
            ? `<p><strong>Your result code:</strong> <code>${code}</code></p>`
            : ""
        }
        ${
          summary
            ? `<p><strong>Summary:</strong><br />${summary
                .toString()
                .replace(/\n/g, "<br />")}</p>`
            : ""
        }
        <p style="margin-top: 24px;">
          With appreciation,<br />
          <strong>MINDTRX</strong>
        </p>
      </div>
    `;

    // If SMTP is not configured, just simulate success in dev
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.log("[send-email] SMTP not configured, skipping real send.", {
        to: email,
        code,
      });
      return NextResponse.json({ ok: true, simulated: true });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 587,
      secure: false, // Gmail + 587 = STARTTLS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[send-email] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
