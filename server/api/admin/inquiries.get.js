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

  const config = useRuntimeConfig();
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = config.supabaseServiceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error.',
    });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

  // Verify token and get user
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized — invalid or expired token.',
    });
  }

  // Check if user has admin role in profiles table
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || profile.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden — admin access required.',
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
