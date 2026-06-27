import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { fullName, email, phone, serviceInterest, message } = body;

  // Validation
  if (!fullName || fullName.trim().length < 2) {
    throw createError({ statusCode: 400, statusMessage: 'Full name is required (minimum 2 characters).' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid email address is required.' });
  }
  if (!message || message.trim().length < 20) {
    throw createError({ statusCode: 400, statusMessage: 'Message must be at least 20 characters.' });
  }

  // Supabase insert
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error.' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

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
    .select('id')
    .single();

  if (dbError) {
    console.error('DB insert error:', dbError);
    throw createError({ statusCode: 500, statusMessage: 'Unable to save your inquiry. Please try again later.' });
  }

  // Email notification
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
        auth: { user: emailUser, pass: emailPass },
      });
      await transporter.sendMail({
        from: `"WASH Consult Website" <${emailUser}>`,
        to: emailTo,
        subject: `New Inquiry from ${fullName} — ${serviceInterest || 'Not specified'}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px"><div style="background:#0B1E3D;padding:24px;text-align:center"><h1 style="color:#D4A017;margin:0;font-size:20px">WASH – Consult General Trading Co. Ltd</h1><p style="color:#ffffff80;margin:4px 0 0;font-size:13px">New Contact Inquiry</p></div><div style="background:#fff;padding:24px;border:1px solid #e5e7eb"><table style="width:100%"><tr><td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600">From</td><td style="padding:8px 0;color:#1A1A2E">${fullName}</td></tr><tr><td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#D4A017">${email}</a></td></tr><tr><td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600">Phone</td><td style="padding:8px 0;color:#1A1A2E">${phone || 'Not provided'}</td></tr><tr><td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600">Service</td><td style="padding:8px 0;color:#1A1A2E">${serviceInterest || 'Not specified'}</td></tr></table><div style="margin-top:16px;padding:16px;background:#F8F9FA;border-radius:8px"><p style="color:#6b7280;font-size:13px;font-weight:600;margin:0 0 8px">Message</p><p style="color:#1A1A2E;margin:0;line-height:1.6">${message}</p></div></div></div>`,
      });
    } catch (e) {
      console.error('Email error:', e.message);
    }
  }

  return {
    success: true,
    id: data.id,
    message: 'Your inquiry has been received. We will get back to you within 1–2 business days.',
  };
});
