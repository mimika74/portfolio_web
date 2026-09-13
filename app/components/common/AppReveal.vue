<script setup lang="ts">
/**
 * スクロールで中身を控えめにフェードインさせるラッパー。
 * アニメーション本体は composables/useScrollFadeIn.ts に集約している（概要書 5.）。
 *
 *   <AppReveal targets="[data-fade]" :stagger="0.12">
 *     <p data-fade>...</p>
 *     <p data-fade>...</p>
 *   </AppReveal>
 *
 * targets 省略時はラッパー自身をひとつの塊としてフェードする。
 */
const props = withDefaults(
  defineProps<{
    targets?: string
    y?: number
    stagger?: number
    start?: string
  }>(),
  {},
)

const root = useTemplateRef<HTMLElement>('root')

useScrollFadeIn(root, {
  targets: props.targets,
  y: props.y,
  stagger: props.stagger,
  start: props.start,
})
</script>

<template>
  <div ref="root">
    <slot />
  </div>
</template>
