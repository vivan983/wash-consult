<template>
  <div class="min-h-screen bg-primary flex items-center justify-center p-4">
    <div class="text-center max-w-lg">
      <!-- Logo -->
      <div class="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <span class="font-heading font-bold text-primary text-2xl">WC</span>
      </div>

      <!-- Error code -->
      <h1 class="text-6xl md:text-8xl font-heading font-bold text-accent mb-4">
        {{ error?.statusCode || 404 }}
      </h1>

      <!-- Message -->
      <h2 class="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
        {{ error?.statusCode === 500 ? 'Server Error' : 'Page Not Found' }}
      </h2>
      <p class="text-white/60 text-lg mb-8">
        {{ error?.statusCode === 500
          ? 'Something went wrong on our end. Please try again shortly.'
          : 'The page you are looking for does not exist or has been moved.' }}
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/" class="btn-primary text-lg px-8 py-4">
          Back to Home
        </a>
        <a href="/contact" class="btn-outline text-lg px-8 py-4">
          Contact Us
        </a>
      </div>

      <!-- Footer -->
      <p class="text-white/30 text-sm mt-12">
        WASH – Consult General Trading Co. Ltd &bull; Juba, South Sudan
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});
</script>
