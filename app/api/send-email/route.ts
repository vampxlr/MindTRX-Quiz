import { NextRequest, NextResponse } from 'next/server';
import { generateEmailHTML, generateEmailText } from '@/lib/email-template';
import type { StoredResult } from '@/lib/types';

// Note: For production, install nodemailer and configure SMTP settings
// npm install nodemailer
// import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email, code, result }: { email: string; code: string; result: StoredResult } = await request.json();

    if (!email || !code || !result) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const htmlContent = generateEmailHTML(result, code);
    const textContent = generateEmailText(result, code);

    // For production with nodemailer:
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@mindtrx.app',
      to: email,
      subject: `Your MINDTRX IMII Report – Code ${code}`,
      text: textContent,
      html: htmlContent,
    });
    */

    // For development: just log the email
    console.log('=== EMAIL WOULD BE SENT ===');
    console.log('To:', email);
    console.log('Subject:', `Your MINDTRX IMII Report – Code ${code}`);
    console.log('HTML Content:', htmlContent.substring(0, 200) + '...');
    console.log('===========================');

    // Simulate success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

