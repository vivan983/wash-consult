<template>
  <main>
    <!-- Page Hero -->
    <section class="pt-32 pb-16 bg-primary relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #D4A017 1px, transparent 1px); background-size: 30px 30px;" />
      <div class="container-custom relative z-10">
        <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Gallery & News</h1>
        <p class="text-white/70 text-lg max-w-2xl">
          Explore highlights from our operations, community engagements, and the latest
          news from WASH Consult across South Sudan.
        </p>
      </div>
    </section>

    <!-- Gallery Content -->
    <section class="section bg-white">
      <div class="container-custom">
        <GalleryGrid :posts="posts" :loading="loading" />
      </div>
    </section>
  </main>
</template>

<script setup>
const posts = ref([]);
const loading = ref(true);

const { data, error } = await useFetch('/api/news');

if (data.value) {
  posts.value = data.value;
}
loading.value = false;

useSeoMeta({
  title: 'Gallery & News | WASH – CONSULT GENERAL TRADING CO. LTD',
  description: 'Explore news, project highlights, and community engagement from WASH – CONSULT GENERAL TRADING CO. LTD in Juba, South Sudan. Updates from our eight business sectors.',
  ogTitle: 'Gallery & News | WASH – CONSULT GENERAL TRADING CO. LTD',
  ogDescription: 'Latest news and highlights from WASH – CONSULT GENERAL TRADING CO. LTD operations in South Sudan.',
  ogType: 'website',
  ogImage: 'https://washconsult.com/og-image.png',
  ogUrl: 'https://washconsult.com/gallery',
});

useHead({
  link: [{ rel: 'canonical', href: 'https://washconsult.com/gallery' }],
});
</script>
