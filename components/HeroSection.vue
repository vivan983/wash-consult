<template>
  <section class="relative min-h-screen flex items-center bg-primary overflow-hidden" role="banner">
    <!-- Background Pattern / Animation -->
    <div class="absolute inset-0 z-0">
      <!-- Subtle grid pattern -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 40px 40px;" />

      <!-- Animated accent blob -->
      <div class="hero-bg-pulse absolute -top-20 -right-20 w-96 h-96 bg-accent rounded-full mix-blend-overlay opacity-20 blur-3xl" />

      <!-- Secondary blob -->
      <div class="hero-bg-pulse absolute -bottom-20 -left-20 w-72 h-72 bg-accent/60 rounded-full mix-blend-overlay opacity-10 blur-3xl" style="animation-delay: 2s;" />
    </div>

    <!-- Content -->
    <div class="container-custom relative z-10 py-20 md:py-28">
      <div class="max-w-3xl">
        <div class="animate-fade-in">
          <span class="inline-block px-4 py-1.5 bg-accent/20 text-accent text-sm font-heading font-semibold rounded-full mb-6">
            Registered in Juba, South Sudan — Companies Act 2012
          </span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 tracking-tight animate-slide-up delay-100">
          Connecting
          <span class="text-accent">South Sudan</span>
          to the World
        </h1>

        <p class="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 animate-slide-up delay-200">
          WASH – Consult General Trading Co. Ltd is a multi-sector trading company
          providing reliable general trading, logistics, financial services, and
          agricultural solutions from our base in Juba, South Sudan.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
          <NuxtLink to="/services" class="btn-primary text-lg px-8 py-4">
            Explore Services
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-outline text-lg px-8 py-4">
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
      <div class="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
        <div class="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
