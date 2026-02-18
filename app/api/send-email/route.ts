import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ message: 'API key not configured' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Dev Mama <onboarding@resend.dev>',
      to: process.env.MAIL_USER || 'yoursvishnation@gmail.com',
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    return NextResponse.json({ message: "We'll contact you soon" }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ message: 'Failed to send email', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
