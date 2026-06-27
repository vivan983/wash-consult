import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate required fields
  const { fullName, email, phone, serviceInterest, message } = body;

  if (!fullName || fullName.trim().length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Full name is required (minimum 2 characters).',
    });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid email address is required.',
    });
  }

  if (!message || message.trim().length < 20) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message must be at least 20 characters.',
    });
  }

  // Initialize Supabase client with service role (server-side)
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error. Please try again later.',
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Insert into Supabase
  const { data, error: dbError } = await supabase
    .from('inquiries')
    .insert({
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      service_interest: serviceInterest || null,
      message: message.trim(),
      status: 'new',
    })
    .select()
    .single();

  if (dbError) {
    console.error('Database insert error:', dbError.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save your inquiry. Please try again later.',
    });
  }

  // Send email notification via Nodemailer
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO;

  if (emailHost && emailUser && emailPass && emailTo) {
    try {
      const transporter = nodemailer.createTransport({
        host: emailHost,
        port: parseInt(emailPort) || 587,
        secure: parseInt(emailPort) === 465,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const serviceLabel = serviceInterest || 'Not specified';

      await transporter.sendMail({
        from: `"WASH Consult Website" <${emailUser}>`,
        to: emailTo,
        subject: `New Inquiry from ${fullName} — ${serviceLabel}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0B1E3D; padding: 24px; text-align: center;">
              <h1 style="color: #D4A017; margin: 0; font-size: 20px;">WASH – Consult General Trading Co. Ltd</h1>
              <p style="color: #ffffff80; margin: 4px 0 0; font-size: 13px;">New Contact Inquiry</p>
            </div>
            <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600;">From</td>
                  <td style="padding: 8px 0; color: #1A1A2E;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600;">Email</td>
                  <td style="padding: 8px 0; color: #1A1A2E;"><a href="mailto:${email}" style="color: #D4A017;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600;">Phone</td>
                  <td style="padding: 8px 0; color: #1A1A2E;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600;">Service Interest</td>
                  <td style="padding: 8px 0; color: #1A1A2E;">${serviceLabel}</td>
                </tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background: #F8F9FA; border-radius: 8px;">
                <p style="color: #6b7280; font-size: 13px; font-weight: 600; margin: 0 0 8px;">Message</p>
                <p style="color: #1A1A2E; margin: 0; line-height: 1.6;">${message}</p>
              </div>
            </div>
            <div style="text-align: center; padding: 16px; color: #9ca3af; font-size: 12px;">
              <p>This email was sent from the WASH Consult website contact form.</p>
              <p>Registered in Juba, South Sudan | Companies Act 2012</p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      // Log but don't fail the request — the inquiry is saved
      console.error('Email sending error:', emailError.message);
    }
  } else {
    console.warn('Email not configured. Inquiry saved but no notification sent.');
  }

  return {
    success: true,
    message: 'Your inquiry has been received. We will get back to you within 1–2 business days.',
  };
});
