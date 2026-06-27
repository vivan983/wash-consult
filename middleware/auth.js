export default defineNuxtRouteMiddleware(async (to) => {
  // Only protect /admin routes
  if (!to.path.startsWith('/admin')) {
    return;
  }

  try {
    const supabase = useSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Store the intended destination so we can redirect back after login
      return navigateTo(`/admin?login=true&redirect=${encodeURIComponent(to.fullPath)}`);
    }
  } catch (e) {
    // If Supabase client isn't available or fails, redirect to admin login
    return navigateTo(`/admin?login=true&redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
