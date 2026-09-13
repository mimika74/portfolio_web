<script setup lang="ts">
/**
 * 節番号ラベル（"01 — About" など）。
 * 先頭に SparkMark を添えて、見出し周辺のワンポイントにする。
 * class / data-* などの属性は単一ルート要素へそのまま透過する。
 */
withDefaults(defineProps<{ markSize?: number }>(), { markSize: 14 })
</script>

<template>
  <p class="section-label inline-flex items-center gap-2">
    <SparkMark :size="markSize" />
    <span><slot /></span>
  </p>
</template>
