// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateEmailHTML, generateEmailText } from "@/lib/email-template";

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
 *   "result": { comm50, trust50, quadrant, position, ... }
 * }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, code, result } = body as {
      email?: string;
      code?: string;
      result?: any;
    };

    if (!email || !code) {
      return NextResponse.json(
        { ok: false, error: "Missing email or code" },
        { status: 400 }
      );
    }

    if (!result) {
      return NextResponse.json(
        { ok: false, error: "Missing result data" },
        { status: 400 }
      );
    }

    // Generate email content using the template
    const subject = `Your MINDTRX Results - ${result.quadrant}`;
    const htmlBody = generateEmailHTML(result, code);
    const textBody = generateEmailText(result, code);

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
