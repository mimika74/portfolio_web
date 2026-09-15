<script setup lang="ts">
import { works } from '~/data/works'

useSeoMeta({
  title: 'Works',
  description: '個人開発のプロジェクトと、GitHub の公開リポジトリ。',
  ogTitle: 'Works | Portfolio',
  ogDescription: '個人開発のプロジェクトと、GitHub の公開リポジトリ。',
})
</script>

<template>
  <section class="container-page py-section-sm md:py-24">
    <AppReveal targets="[data-fade]" :stagger="0.08">
      <SectionLabel data-fade class="mb-8">Works</SectionLabel>
      <h1 data-fade class="max-w-2xl text-3xl md:text-4xl">
        これまでに手を動かしてきたもの
      </h1>
      <p data-fade class="mt-6 max-w-xl text-ink-soft">
        ここでは主に個人開発のプロジェクトを並べています。関わった案件については職務経歴書に記載しております。
      </p>

      <div data-fade class="mt-16">
        <WorkCard v-for="work in works" :key="work.slug" :work="work" />
        <div class="border-t border-line" />
      </div>

      <div data-fade>
        <RepoList />
      </div>
    </AppReveal>
  </section>
</template>
