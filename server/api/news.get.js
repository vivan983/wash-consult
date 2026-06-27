import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  // If Supabase is not configured, return empty array
  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('news_posts')
    .select('id, title, excerpt, image_url, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('News fetch error:', error.message);
    return [];
  }

  return data || [];
});
