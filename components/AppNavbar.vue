<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg" role="navigation" aria-label="Main navigation">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group" aria-label="WASH Consult Home">
          <div class="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-heading font-bold text-primary text-sm group-hover:bg-accent-400 transition-colors">
            WC
          </div>
          <div class="hidden sm:block">
            <span class="font-heading font-bold text-white text-sm md:text-base leading-tight block">
              WASH – CONSULT
            </span>
            <span class="text-accent text-caption leading-tight block">
              General Trading Co. Ltd
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2 text-sm font-heading font-semibold text-white/80 hover:text-accent transition-colors rounded-lg hover:bg-white/5"
            :class="{ 'text-accent bg-white/5': currentPath === link.path }"
          >
            {{ link.label }}
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="ml-4 px-5 py-2 bg-accent text-primary font-heading font-semibold text-sm rounded-lg hover:bg-accent-400 transition-colors shadow-md"
          >
            Get in Touch
          </NuxtLink>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
          @click="mobileOpen = !mobileOpen"
          :aria-expanded="mobileOpen"
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
        >
          <span
            class="block w-6 h-0.5 bg-white rounded transition-all duration-300"
            :class="{ 'rotate-45 translate-y-2': mobileOpen }"
          />
          <span
            class="block w-6 h-0.5 bg-white rounded transition-all duration-300"
            :class="{ 'opacity-0': mobileOpen }"
          />
          <span
            class="block w-6 h-0.5 bg-white rounded transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-2': mobileOpen }"
          />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="menu">
      <div
        v-if="mobileOpen"
        id="mobile-menu"
        class="lg:hidden bg-primary border-t border-white/10"
      >
        <div class="container-custom py-4 flex flex-col gap-2">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="px-4 py-3 text-white/80 hover:text-accent hover:bg-white/5 rounded-lg font-heading font-semibold text-sm transition-colors"
            :class="{ 'text-accent bg-white/5': currentPath === link.path }"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="mt-2 px-4 py-3 bg-accent text-primary font-heading font-semibold text-sm rounded-lg text-center hover:bg-accent-400 transition-colors"
            @click="mobileOpen = false"
          >
            Get in Touch
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
const route = useRoute();
const mobileOpen = ref(false);

const currentPath = computed(() => route.path);

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

// Close mobile menu on route change
watch(currentPath, () => {
  mobileOpen.value = false;
});

// Close mobile menu on escape key
onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape);
});

function handleEscape(e) {
  if (e.key === 'Escape' && mobileOpen.value) {
    mobileOpen.value = false;
  }
}
</script>
