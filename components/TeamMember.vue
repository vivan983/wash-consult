<template>
  <div class="card hover-lift p-6 text-center group">
    <!-- Avatar placeholder -->
    <div class="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
      <span class="text-2xl font-heading font-bold text-accent">
        {{ initials }}
      </span>
    </div>

    <h3 class="font-heading font-semibold text-primary text-lg mb-1">{{ name }}</h3>
    <p class="text-accent text-sm font-heading font-semibold mb-2">{{ role }}</p>
    <p class="text-gray-600 text-sm leading-relaxed">{{ bio }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
});

const initials = computed(() => {
  return props.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
});
</script>
