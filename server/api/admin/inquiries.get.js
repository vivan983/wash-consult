import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  // Verify Authorization header
  const authHeader = getHeader(event, 'Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized — no valid token provided.',
    });
  }

  const token = authHeader.replace('Bearer ', '');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error.',
    });
  }

  // Verify the user's token by getting their user info
  const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized — invalid or expired token.',
    });
  }

  // Fetch all inquiries ordered by most recent first
  const { data, error: dbError } = await supabaseAdmin
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (dbError) {
    console.error('Admin inquiries fetch error:', dbError.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch inquiries.',
    });
  }

  return data || [];
});
