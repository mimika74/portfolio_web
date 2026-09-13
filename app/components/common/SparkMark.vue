<script setup lang="ts">
/**
 * 見出し脇に置く放射状のワンポイント装飾。
 * ゆっくり回転しながら微かに呼吸する（prefers-reduced-motion では静止）。
 * 色は currentColor を継承するので、置いた場所の文字色（＝アクセント色）になる。
 */
withDefaults(defineProps<{ size?: number }>(), { size: 14 })
</script>

<template>
  <svg
    class="spark"
    :width="size"
    :height="size"
    viewBox="-50 -50 100 100"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <g class="spark__rays">
      <path
        v-for="i in 8"
        :key="`o${i}`"
        d="M0,-46 C3,-24 4.6,-10 4.6,-4.6 C4.6,-1.5 3,0 0,0 C-3,0 -4.6,-1.5 -4.6,-4.6 C-4.6,-10 -3,-24 0,-46 Z"
        :transform="`rotate(${(i - 1) * 45})`"
      />
    </g>
    <g class="spark__rays spark__rays--inner">
      <path
        v-for="i in 8"
        :key="`i${i}`"
        d="M0,-27 C1.8,-14 2.7,-6 2.7,-2.7 C2.7,-0.9 1.8,0 0,0 C-1.8,0 -2.7,-0.9 -2.7,-2.7 C-2.7,-6 -1.8,-14 0,-27 Z"
        :transform="`rotate(${(i - 1) * 45 + 22.5})`"
      />
    </g>
    <circle r="3.2" />
  </svg>
</template>

<style scoped>
.spark {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
  transform-origin: center;
  animation: spark-breathe 7s ease-in-out infinite;
}

.spark__rays {
  transform-box: fill-box;
  transform-origin: center;
  animation: spark-turn 30s linear infinite;
}

.spark__rays--inner {
  opacity: 0.55;
  animation-duration: 46s;
  animation-direction: reverse;
}

@keyframes spark-turn {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spark-breathe {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.09);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spark,
  .spark__rays,
  .spark__rays--inner {
    animation: none;
  }
}
</style>
