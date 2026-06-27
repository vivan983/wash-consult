export default defineNuxtRouteMiddleware(async (to) => {
  // Only protect /admin routes
  if (!to.path.startsWith('/admin')) {
    return;
  }

  // The admin page handles its own login UI — no redirect needed
  // Auth check happens inside the page component via useSupabaseClient().auth.getSession()
});
