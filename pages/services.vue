<template>
  <main>
    <!-- Page Hero -->
    <section class="pt-32 pb-16 bg-primary relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #D4A017 1px, transparent 1px); background-size: 30px 30px;" />
      <div class="container-custom relative z-10">
        <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Services</h1>
        <p class="text-white/70 text-lg max-w-2xl">
          Eight strategic business sectors covering the full spectrum of trading, logistics,
          and professional services across South Sudan and beyond.
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 1. General Trading and Supply -->
          <div class="card border-2 border-transparent hover-lift p-8 group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-heading font-semibold text-primary mb-2">General Trading and Supply</h3>
                <p class="text-gray-600 leading-relaxed mb-3">
                  Supplying goods and commodities across South Sudan and beyond, serving both
                  institutional and commercial markets with a reliable supply chain network.
                </p>
                <ul class="space-y-1">
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Commodity sourcing and procurement
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Cross-border trade facilitation
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Wholesale supply to businesses and institutions
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 2. Cleaning and Facility Services -->
          <div class="card border-2 border-transparent hover-lift p-8 group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-heading font-semibold text-primary mb-2">Cleaning and Facility Services</h3>
                <p class="text-gray-600 leading-relaxed mb-3">
                  Professional cleaning solutions for businesses, institutions, and government
                  facilities, maintaining the highest standards of hygiene and presentation.
                </p>
                <ul class="space-y-1">
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Commercial and office cleaning
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Institutional facility maintenance
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Sanitation and hygiene services
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 3. Money Transfer and Financial Services -->
          <div class="card border-2 border-transparent hover-lift p-8 group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-heading font-semibold text-primary mb-2">Money Transfer and Financial Services</h3>
                <p class="text-gray-600 leading-relaxed mb-3">
                  Secure money transfer, currency exchange, and financial agency services
                  connecting South Sudan to regional and global financial markets.
                </p>
                <ul class="space-y-1">
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Domestic and international money transfer
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Currency exchange operations
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Financial agency and intermediation
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 4. Petroleum and Energy Products -->
          <div class="card border-2 border-transparent hover-lift p-8 group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-heading font-semibold text-primary mb-2">Petroleum and Energy Products</h3>
                <p class="text-gray-600 leading-relaxed mb-3">
                  Fuel supply, petroleum products, and energy distribution to power South Sudan's
                  growing economy and support infrastructure development.
                </p>
                <ul class="space-y-1">
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Fuel and petroleum product supply
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Energy product distribution
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Lubricants and industrial oils
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 5. Transportation and Logistics -->
          <div class="card border-2 border-transparent hover-lift p-8 group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.321c0-.237-.036-.464-.107-.695a1.72 1.72 0 00-1.553-1.307H4.125a1.125 1.125 0 00-1.125 1.125v7.875M14.25 7.5h3.487c.655 0 1.262.319 1.63.846a17.86 17.86 0 012.827 8.158.112.112 0 01-.092.116l-.352.055a1.125 1.125 0 01-1.12-.518l-.005-.009" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-heading font-semibold text-primary mb-2">Transportation and Logistics</h3>
                <p class="text-gray-600 leading-relaxed mb-3">
                  Haulage, cargo transport, and customs clearing services ensuring goods reach
                  their destination reliably and efficiently across South Sudan.
                </p>
                <ul class="space-y-1">
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Goods haulage and cargo transport
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Customs clearing and forwarding
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Supply chain and logistics management
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 6. Agriculture and Farming -->
          <div class="card border-2 border-transparent hover-lift p-8 group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-heading font-semibold text-primary mb-2">Agriculture and Farming</h3>
                <p class="text-gray-600 leading-relaxed mb-3">
                  Commercial farming, animal rearing, and agri-product export supporting South Sudan's
                  food security and agricultural development goals.
                </p>
                <ul class="space-y-1">
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Commercial crop farming
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Livestock and animal rearing
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Agricultural product export
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 7. Real Estate and Property Leasing -->
          <div class="card border-2 border-transparent hover-lift p-8 group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-heading font-semibold text-primary mb-2">Real Estate and Property Leasing</h3>
                <p class="text-gray-600 leading-relaxed mb-3">
                  Acquiring, leasing, and managing land and property assets for commercial,
                  residential, and industrial use across South Sudan.
                </p>
                <ul class="space-y-1">
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Land acquisition and development
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Commercial property leasing
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Property asset management
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 8. Wholesale and Retail Distribution -->
          <div class="card border-2 border-transparent hover-lift p-8 group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-heading font-semibold text-primary mb-2">Wholesale and Retail Distribution</h3>
                <p class="text-gray-600 leading-relaxed mb-3">
                  Distributing skincare products, agricultural produce, and general commodities
                  across South Sudan through established retail and wholesale channels.
                </p>
                <ul class="space-y-1">
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Wholesale commodity distribution
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Retail product placement
                  </li>
                  <li class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Market and supply chain access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-light">
      <div class="container-custom text-center">
        <h2 class="text-2xl font-heading font-bold text-primary mb-4">
          Interested in Our Services?
        </h2>
        <p class="text-gray-600 mb-6 max-w-xl mx-auto">
          Contact our team to discuss how we can support your business needs across any of our eight sectors.
        </p>
        <NuxtLink to="/contact" class="btn-primary">
          Get in Touch
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'Our Services | WASH – Consult General Trading — 8 Business Sectors',
  description: 'WASH Consult operates in 8 sectors: General Trading, Cleaning, Money Transfer, Petroleum, Transportation, Agriculture, Real Estate, and Wholesale Distribution — all registered under the Companies Act 2012 in Juba, South Sudan.',
  ogTitle: 'WASH – Consult Services — 8 Business Sectors',
  ogDescription: 'From general trading to petroleum, agriculture to real estate — eight sectors driving growth in South Sudan.',
});
</script>
