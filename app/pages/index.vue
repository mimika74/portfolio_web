<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio',
  description:
    'GitHub 上に散らばった開発実績を、ひとつの静かな場所にまとめた個人ポートフォリオ。Nuxt / Vue / React / Laravel を中心に、設計から運用まで。',
  ogTitle: 'Portfolio',
  ogDescription: 'GitHub 上に散らばった開発実績を、ひとつの静かな場所にまとめた個人ポートフォリオ。',
})
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <WorksPreview />
    <NewsPreview />
  </div>
</template>
