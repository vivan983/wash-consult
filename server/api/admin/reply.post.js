import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' });
  }

  const token = authHeader.replace('Bearer ', '');
  const body = await readBody(event);
  const { inquiryId, replyMessage } = body;

  if (!inquiryId || !replyMessage || replyMessage.trim().length < 5) {
    throw createError({ statusCode: 400, statusMessage: 'Inquiry ID and reply message (min 5 chars) are required.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error.' });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

  // Verify token
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
  if (authError || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' });
  }

  // Get the inquiry
  const { data: inquiry, error: fetchError } = await supabaseAdmin
    .from('inquiries')
    .select('*')
    .eq('id', inquiryId)
    .single();

  if (fetchError || !inquiry) {
    throw createError({ statusCode: 404, statusMessage: 'Inquiry not found.' });
  }

  // Send reply email
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (emailHost && emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: emailHost,
        port: parseInt(emailPort) || 587,
        secure: parseInt(emailPort) === 465,
        auth: { user: emailUser, pass: emailPass },
      });
      await transporter.sendMail({
        from: `"WASH – CONSULT" <${emailUser}>`,
        to: inquiry.email,
        subject: `Re: Your Inquiry — ${inquiry.service_interest || 'WASH Consult'}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px"><div style="background:#0B1E3D;padding:24px;text-align:center"><h1 style="color:#D4A017;margin:0;font-size:20px">WASH – Consult General Trading Co. Ltd</h1><p style="color:#ffffff80;margin:4px 0 0;font-size:13px">Response to Your Inquiry</p></div><div style="background:#fff;padding:24px;border:1px solid #e5e7eb"><p style="color:#1A1A2E;line-height:1.6">Dear ${inquiry.full_name},</p><div style="margin:16px 0;padding:16px;background:#F8F9FA;border-radius:8px;white-space:pre-wrap;color:#1A1A2E;line-height:1.6">${replyMessage}</div><p style="color:#6b7280;font-size:13px;margin-top:24px">Best regards,<br><strong>WASH – CONSULT GENERAL TRADING CO. LTD</strong><br>Juba, South Sudan</p></div></div>`,
      });
    } catch (e) {
      console.error('Reply email error:', e.message);
    }
  }

  // Update status to replied
  await supabaseAdmin.from('inquiries').update({ status: 'replied' }).eq('id', inquiryId);

  return { success: true, message: 'Reply sent and status updated to replied.' };
});
