import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // If Supabase is not configured, return empty array (empty state on gallery page)
  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('News fetch error:', error.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch news posts.',
    });
  }

  return data || [];
});
