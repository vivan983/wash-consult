import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' });
  }

  const token = authHeader.replace('Bearer ', '');
  const body = await readBody(event);
  const { id } = body;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Inquiry ID is required.' });
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

  // Delete the inquiry
  const { error: dbError } = await supabaseAdmin.from('inquiries').delete().eq('id', id);
  if (dbError) {
    console.error('Delete error:', dbError.message);
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete inquiry.' });
  }

  return { success: true };
});
