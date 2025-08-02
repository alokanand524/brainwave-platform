import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email, url } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const { host } = new URL(url);

  const result = await transporter.sendMail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: `Sign in to ${host}`,
    text: `Sign in to ${host}\n${url}`,
    html: `<p>Sign in to <strong>${host}</strong></p><a href="${url}">Click to sign in</a>`,
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    return NextResponse.json({ error: `Email(s) (${failed.join(", ")}) could not be sent` }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
