// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    // '@nuxtjs/supabase', // Temporarily disabled — set up Supabase credentials in .env to enable
  ],

  // supabase: {
  //   redirectOptions: {
  //     login: '/admin',
  //     callback: '/admin',
  //     exclude: ['/', '/about', '/services', '/contact', '/gallery'],
  //   },
  // },

  app: {
    head: {
      title: 'WASH – Consult General Trading Co. Ltd',
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
    '/api/**': { cors: true },
  },

  typescript: {
    strict: false,
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',
});
