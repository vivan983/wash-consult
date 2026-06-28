// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],

  runtimeConfig: {
    // Private keys exposed only to server routes
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    emailTo: process.env.EMAIL_TO,
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: '/admin',
      callback: '/admin',
      exclude: ['/', '/about', '/services', '/contact', '/gallery'],
    },
  },

  app: {
    head: {
      title: 'WASH – CONSULT GENERAL TRADING CO. LTD | Juba, South Sudan',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'Connecting South Sudan to the World — Multi-sector trading, logistics, agriculture, and financial services company registered in Juba, South Sudan under the Companies Act 2012.' },
        { name: 'keywords', content: 'WASH Consult, South Sudan trading, Juba, general trading, logistics, agriculture, petroleum, real estate, money transfer' },
        { name: 'author', content: 'WASH – Consult General Trading Co. Ltd' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'WASH – Consult General Trading Co. Ltd' },
        { property: 'og:description', content: 'Connecting South Sudan to the World — Multi-sector trading company based in Juba.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preload', as: 'image', href: '/logo_white_medium.png', type: 'image/png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;500&display=swap' },
      ],
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
      autoSubfolderIndex: false,
    },
  },

  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'access-control-allow-origin': process.env.NODE_ENV === 'production'
          ? 'https://washconsult.com'
          : '*',
      },
    },
  },

  typescript: {
    strict: false,
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',
});
