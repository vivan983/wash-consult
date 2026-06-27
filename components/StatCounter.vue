<template>
  <section class="py-16 bg-primary relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #D4A017 1px, transparent 1px); background-size: 30px 30px;" />

    <div class="container-custom relative z-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          ref="statRefs"
          class="text-center animate-on-scroll"
        >
          <div class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-accent mb-2">
            <span v-if="stat.prefix">{{ stat.prefix }}</span>{{ displayedValues[stat.label] }}<span v-if="stat.suffix">{{ stat.suffix }}</span>
          </div>
          <p class="text-white/60 text-sm md:text-base font-heading font-semibold">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const statRefs = ref([]);

const stats = [
  { label: 'Business Sectors', value: 8, prefix: '', suffix: '' },
  { label: 'Share Capital', value: 100, prefix: 'US$', suffix: 'K' },
  { label: 'South Sudan Based', value: 1, prefix: '', suffix: '' },
  { label: 'Established', value: 2024, prefix: '', suffix: '' },
];

const displayedValues = reactive({
  'Business Sectors': 0,
  'Share Capital': 0,
  'South Sudan Based': 0,
  'Established': 0,
});

let observer = null;

function animateValue(key, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    displayedValues[key] = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      displayedValues[key] = target;
    }
  }

  requestAnimationFrame(update);
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Animate only on first view
          if (!entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const statEls = entry.target.closest('.grid')?.querySelectorAll('.animate-on-scroll');
            if (statEls) {
              stats.forEach((stat) => {
                animateValue(stat.label, stat.value);
              });
            }
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  // Observe the first stat element
  if (statRefs.value && statRefs.value[0]) {
    observer.observe(statRefs.value[0]);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>
