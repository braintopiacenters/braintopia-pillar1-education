import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend's free/testing mode only allows sending from @resend.dev to the
// account owner's verified email address. Use a verified domain in production.
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Braintopia <onboarding@resend.dev>';
const RECIPIENT_EMAIL =
  process.env.BOOKING_RECIPIENT_EMAIL || 'braintopiacenters@gmail.com';
const isResendTestMode = FROM_EMAIL.includes('@resend.dev');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, professionOrRole, pillarInterest, classInterest, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    const professionHtml = professionOrRole
      ? `<p><strong>Profession or Role:</strong> ${professionOrRole}</p>`
      : '';
    const professionText = professionOrRole
      ? `Profession or Role: ${professionOrRole}\n`
      : '';

    // 1. Send notification to the Braintopia team
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [RECIPIENT_EMAIL],
      subject: `New Inquiry from Class Finder — ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #272727;">New Inquiry from Class Finder</h2>
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          ${professionHtml}
          <p><strong>Pillar:</strong> ${pillarInterest || 'Not specified'}</p>
          <p><strong>Class Interest:</strong> ${classInterest || 'Not specified'}</p>
          
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="white-space: pre-wrap; background: #f8f9fa; padding: 12px; border-radius: 6px;">
              ${message || 'No additional message provided.'}
            </p>
          </div>

          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          
          <p style="color: #666; font-size: 12px;">
            Submitted via Braintopia Education &amp; Family Support site.
          </p>
        </div>
      `,
      text: `
New Inquiry from Class Finder

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
${professionText}Pillar: ${pillarInterest || 'Not specified'}
Class Interest: ${classInterest || 'Not specified'}

Message:
${message || 'No additional message provided.'}
      `,
    });

    if (error) {
      console.error('Resend error (team email):', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Send confirmation to the submitter (requires a verified sending domain).
    // On Resend's free/testing plan, @resend.dev can only deliver to the account owner.
    if (!isResendTestMode) {
      const { error: confirmationError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: 'We received your QEEG Assessment request',
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px;">
            <h2>Thank you, ${name.split(' ')[0]}!</h2>
            <p>We've received your request for a QEEG Brain Mapping Assessment.</p>
            
            <p>A member of our team will reach out within 48 hours to schedule your session.</p>

            <p style="margin-top: 24px; font-size: 14px;">If you have any questions in the meantime, just reply to this email.</p>
            
            <p style="margin-top: 32px;">— The Braintopia Team</p>
          </div>
        `,
        text: `Thank you, ${name}!\n\nWe've received your request for a QEEG Brain Mapping Assessment.\nA member of our team will reach out within 48 hours to schedule your session.\n\n— The Braintopia Team`,
      });

      if (confirmationError) {
        console.error('Resend error (confirmation email):', confirmationError);
      }
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request. Please try again later.' },
      { status: 500 }
    );
  }
}
