<template>
  <main>
    <!-- Page Hero -->
    <section class="pt-32 pb-16 bg-primary relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #D4A017 1px, transparent 1px); background-size: 30px 30px;" />
      <div class="container-custom relative z-10">
        <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Contact Us</h1>
        <p class="text-white/70 text-lg max-w-2xl">
          Get in touch with our team in Juba, South Sudan. We are ready to discuss your
          business needs and explore partnership opportunities.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <!-- Form -->
          <div class="lg:col-span-3">
            <ContactForm />
          </div>

          <!-- Company Info + Map -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Company Info Card -->
            <div class="card p-8">
              <h3 class="text-xl font-heading font-bold text-primary mb-6">Company Information</h3>

              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-heading font-semibold text-primary text-sm">Location</p>
                    <p class="text-gray-600 text-sm">Juba, South Sudan</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-heading font-semibold text-primary text-sm">Email</p>
                    <a href="mailto:admin@washconsult.com" class="text-accent text-sm hover:text-accent-500 transition-colors">
                      admin@washconsult.com
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-heading font-semibold text-primary text-sm">Registration</p>
                    <p class="text-gray-600 text-sm">Companies Act 2012</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-heading font-semibold text-primary text-sm">Business</p>
                    <p class="text-gray-600 text-sm">General Trading</p>
                  </div>
                </div>
              </div>

              <hr class="my-6 border-gray-100" />

              <div class="bg-accent/5 rounded-lg p-4">
                <p class="text-sm text-gray-600">
                  <strong class="text-primary">Office Hours:</strong><br />
                  Monday – Friday: 8:00 AM – 5:00 PM (CAT)<br />
                  Saturday: 9:00 AM – 1:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            <!-- Map Embed -->
            <div class="card overflow-hidden">
              <div class="relative w-full h-64 bg-primary/5">
                <!-- Google Maps embed for Juba, South Sudan -->
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63789.477288604664!2d31.55292135446142!3d4.851657911451112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1712804cce4e7533%3A0xca2bb79f2f5ff69!2sJuba%2C%20South%20Sudan!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="WASH Consult Office Location — Juba, South Sudan"
                  class="absolute inset-0"
                />
              </div>
              <div class="p-4 bg-primary">
                <p class="text-white/80 text-sm flex items-center gap-2">
                  <svg class="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  WASH – Consult General Trading Co. Ltd — Juba, South Sudan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'Contact Us | WASH – CONSULT GENERAL TRADING CO. LTD',
  description: 'Contact WASH – CONSULT GENERAL TRADING CO. LTD in Juba, South Sudan. Send us an inquiry about our trading, logistics, financial, agriculture, and energy services under the Companies Act 2012.',
  ogTitle: 'Contact Us | WASH – CONSULT GENERAL TRADING CO. LTD',
  ogDescription: 'Get in touch with our team in Juba, South Sudan for trading and logistics services.',
  ogType: 'website',
  ogImage: 'https://washconsult.com/og-image.png',
  ogUrl: 'https://washconsult.com/contact',
});

useHead({
  link: [{ rel: 'canonical', href: 'https://washconsult.com/contact' }],
});
</script>
