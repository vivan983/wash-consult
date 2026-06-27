<template>
  <main>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Services Overview -->
    <section class="section bg-white">
      <div class="container-custom">
        <h2 class="section-title">Our Business Sectors</h2>
        <p class="section-subtitle">
          WASH Consult operates across eight strategic sectors, delivering reliable and professional
          services that drive economic growth in South Sudan and connect the country to global markets.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <ServiceCard
            v-for="sector in servicesStore.sectors.slice(0, 6)"
            :key="sector.id"
            :title="sector.title"
            :description="sector.description"
            :icon="sector.icon"
          />
        </div>

        <div class="text-center">
          <NuxtLink to="/services" class="btn-primary">
            View All Services
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Counter -->
    <StatCounter />

    <!-- Why Choose Us -->
    <section class="section bg-white">
      <div class="container-custom">
        <h2 class="section-title">Why Choose WASH Consult</h2>
        <p class="section-subtitle">
          We bring together deep local knowledge, diverse sector expertise, and an unwavering
          commitment to integrity in every engagement.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Trusted -->
          <div class="card border-2 border-transparent hover-lift p-8 text-center group">
            <div class="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 class="font-heading font-semibold text-primary text-xl mb-3">Trusted & Licensed</h3>
            <p class="text-gray-600 leading-relaxed">
              Incorporated under the Companies Act 2012 in Juba, South Sudan, with a registered
              share capital of US$100,000. We operate with full legal authorization and regulatory compliance.
            </p>
          </div>

          <!-- Diverse -->
          <div class="card border-2 border-transparent hover-lift p-8 text-center group">
            <div class="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <h3 class="font-heading font-semibold text-primary text-xl mb-3">Diverse Expertise</h3>
            <p class="text-gray-600 leading-relaxed">
              From petroleum and energy to agriculture, real estate, and financial services — our
              eight business sectors cover the full spectrum of South Sudan's growing economy.
            </p>
          </div>

          <!-- Licensed -->
          <div class="card border-2 border-transparent hover-lift p-8 text-center group">
            <div class="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <h3 class="font-heading font-semibold text-primary text-xl mb-3">South Sudan Focused</h3>
            <p class="text-gray-600 leading-relaxed">
              Headquartered in Juba, we understand the local market deeply. Our mission is to drive
              economic growth within South Sudan while connecting businesses to global opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-primary relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #D4A017 1px, transparent 1px); background-size: 30px 30px;" />
      <div class="container-custom text-center relative z-10">
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Ready to Partner with Us?
        </h2>
        <p class="text-white/70 text-lg mb-8 max-w-xl mx-auto">
          Whether you need trading services, logistics support, or financial solutions,
          our team in Juba is ready to help your business grow.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" class="btn-primary text-lg px-8 py-4">
            Get in Touch
          </NuxtLink>
          <NuxtLink to="/about" class="btn-outline text-lg px-8 py-4">
            Learn About Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useServicesStore } from '~/stores/useServicesStore';

const servicesStore = useServicesStore();

useSeoMeta({
  title: 'WASH – CONSULT GENERAL TRADING CO. LTD | Juba, South Sudan',
  description: 'Multi-sector trading company registered in Juba, South Sudan under the Companies Act 2012. Providing general trading, logistics, financial services, agriculture, petroleum, energy, and real estate solutions with US$100,000 share capital.',
  ogTitle: 'WASH – CONSULT GENERAL TRADING CO. LTD | Juba, South Sudan',
  ogDescription: 'Connecting South Sudan to the World — Multi-sector trading company based in Juba, South Sudan. Registered under the Companies Act 2012.',
  ogType: 'website',
  ogImage: 'https://washconsult.com/og-image.png',
  ogUrl: 'https://washconsult.com',
});

useHead({
  link: [{ rel: 'canonical', href: 'https://washconsult.com' }],
});
</script>
