<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="card overflow-hidden">
        <div class="skeleton h-48 w-full" />
        <div class="p-4 space-y-2">
          <div class="skeleton h-5 w-3/4" />
          <div class="skeleton h-4 w-1/4" />
          <div class="skeleton h-4 w-full" />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="posts.length === 0" class="text-center py-16">
      <div class="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      </div>
      <h3 class="text-xl font-heading font-bold text-primary mb-2">No Posts Yet</h3>
      <p class="text-gray-600 max-w-md mx-auto">
        Our gallery is being updated with news and project highlights. Check back soon for updates on our activities across South Sudan.
      </p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="post in posts"
        :key="post.id"
        class="card overflow-hidden hover-lift group cursor-pointer"
      >
        <!-- Image -->
        <div class="relative h-48 overflow-hidden bg-primary/5">
          <img
            v-if="post.image_url"
            :src="post.image_url"
            :alt="post.title"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div class="p-5">
          <time
            :datetime="post.created_at"
            class="text-caption text-accent font-heading font-semibold block mb-2"
          >
            {{ formatDate(post.created_at) }}
          </time>
          <h3 class="font-heading font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
            {{ post.title }}
          </h3>
          <p v-if="post.excerpt" class="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {{ post.excerpt }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>
