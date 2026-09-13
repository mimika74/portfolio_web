<script setup lang="ts">
/**
 * ヒーロー右側に置く星座の装飾。
 * コンセプト:「散らばった実績＝それぞれの星。開いた両手がそれを受けとめ、
 * 線で結ぶとひとつの星座（＝手）が現れる」。
 *
 * - 手のシルエット(cst-figure) … ユーザー提供の open_hands.svg（線画）。
 *   色指定を外し、現行トーンのトークン（墨をうっすら）に置換。
 * - 星座線(cst-lines) … 手首/手のひらから各指先へ扇状に結ぶ。
 * - 星(cst-star) … SparkMark と同じ放射形（#spark-star を <use>）。色はアクセント金茶。
 *   まだ結ばれていない散らばった星も上部に置く。
 * - 動きは数個の星がゆっくり回転＋瞬く程度。prefers-reduced-motion では静止。
 * - 全体の濃さは配置側（HeroSection）の opacity で調整する。新色は足していない。
 */

// SparkMark と同じ 8＋8 本の紡錘スパイク＋中心。星ひとつぶんの形。
const LONG =
  'M0,-46C3,-24 4.6,-10 4.6,-4.6C4.6,-1.5 3,0 0,0C-3,0 -4.6,-1.5 -4.6,-4.6C-4.6,-10 -3,-24 0,-46Z'
const SHORT =
  'M0,-27C1.8,-14 2.7,-6 2.7,-2.7C2.7,-0.9 1.8,0 0,0C-1.8,0 -2.7,-0.9 -2.7,-2.7C-2.7,-6 -1.8,-14 0,-27Z'
const OUTER = [0, 45, 90, 135, 180, 225, 270, 315]
const INNER = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]

// 星の配置（提供 SVG から実測した指先座標に合わせている。viewBox 430x410）
// 指先の星は 親指・中指・小指 の 3 点。手の広がりが出る並び。
const LEFT_TIPS = [
  [77, 85],
  [148, 59],
  [176, 83],
]
const RIGHT_TIPS = [
  [356, 88],
  [282, 59],
  [254, 83],
]
const LEFT_HUB: [number, number] = [113, 178]
const RIGHT_HUB: [number, number] = [318, 178]

const SCATTER: Array<{ p: [number, number]; s: number; o: number; tw?: number }> = [
  { p: [215, 26], s: 15, o: 0.9, tw: 0.3 },
  { p: [171, 40], s: 10, o: 0.55 },
  { p: [259, 37], s: 11, o: 0.6, tw: 2.4 },
  { p: [124, 44], s: 9, o: 0.5 },
  { p: [312, 46], s: 9, o: 0.5 },
  { p: [215, 92], s: 8, o: 0.45, tw: 3.4 },
  { p: [64, 152], s: 8, o: 0.4 },
  { p: [372, 150], s: 8, o: 0.4 },
  { p: [205, 214], s: 7, o: 0.4 },
  { p: [242, 300], s: 8, o: 0.45 },
]
</script>

<template>
  <svg
    class="cst"
    viewBox="18 12 396 334"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <symbol id="spark-star" viewBox="-50 -50 100 100" overflow="visible">
        <g fill="currentColor">
          <path v-for="a in OUTER" :key="`l${a}`" :d="LONG" :transform="`rotate(${a})`" />
          <path v-for="a in INNER" :key="`s${a}`" :d="SHORT" :transform="`rotate(${a})`" />
          <circle r="3.2" />
        </g>
      </symbol>
    </defs>

    <!-- 手のシルエット（提供 SVG の線画。色のみ差し替え） -->
    <g
      class="cst-figure"
      fill="none"
      stroke="var(--color-ink-soft)"
      stroke-width="2.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M47 334 C60 301 74 266 85 238 C89 228 92 218 94 212 M91 207 C80 182 73 156 70 127 C68 108 67 91 72 86 C76 82 85 87 89 93 C94 102 95 119 98 134 C116 138 129 148 137 161 C144 172 146 182 145 193 M98 134 C96 124 96 115 98 104 C102 87 111 68 124 62 C132 58 138 62 138 69 C138 78 131 97 125 115 M116 118 C121 96 130 70 141 62 C149 56 156 60 157 67 C158 76 150 100 143 122 M134 121 C140 99 149 74 158 67 C166 61 172 66 171 74 C170 84 161 107 156 126 M151 126 C157 107 164 89 171 84 C177 80 184 85 184 92 C184 101 178 118 175 132 C174 144 176 158 178 173 C181 196 176 222 169 248 L145 334"
      />
      <path
        d="M286 334 L261 247 C254 222 249 196 252 173 C254 158 256 144 255 132 C252 118 246 101 246 92 C246 85 253 80 259 84 C266 89 273 107 279 126 M274 126 C269 107 260 84 259 74 C258 66 264 61 272 67 C281 74 290 99 296 121 M287 122 C280 100 272 76 273 67 C274 60 281 56 289 62 C300 70 309 96 314 118 M305 115 C299 97 292 78 292 69 C292 62 298 58 306 62 C319 68 328 87 332 104 C334 115 334 124 332 134 C335 119 336 102 341 93 C345 87 354 82 358 86 C363 91 362 108 360 127 C357 156 350 182 339 207 M336 212 C338 218 341 228 345 238 C356 266 370 301 383 334 M332 134 C314 138 301 148 293 161 C286 172 284 182 285 193"
      />
    </g>

    <!-- 星座線：手のひらの中心から各指先へ扇状に -->
    <g
      class="cst-lines"
      stroke="var(--color-accent)"
      stroke-width="1.1"
      stroke-linecap="round"
    >
      <line
        v-for="(t, i) in LEFT_TIPS"
        :key="`ll${i}`"
        :x1="LEFT_HUB[0]"
        :y1="LEFT_HUB[1]"
        :x2="t[0]"
        :y2="t[1]"
      />
      <line
        v-for="(t, i) in RIGHT_TIPS"
        :key="`rl${i}`"
        :x1="RIGHT_HUB[0]"
        :y1="RIGHT_HUB[1]"
        :x2="t[0]"
        :y2="t[1]"
      />
      <polyline
        :points="LEFT_TIPS.map((t) => t.join(',')).join(' ')"
        fill="none"
      />
      <polyline
        :points="RIGHT_TIPS.map((t) => t.join(',')).join(' ')"
        fill="none"
      />
      <path class="cst-forming" d="M215,26 L148,59" stroke-dasharray="2 5" />
      <path class="cst-forming" d="M215,26 L282,59" stroke-dasharray="2 5" />
    </g>

    <!-- 星（SparkMark と同じ形／色） -->
    <g class="cst-stars">
      <g v-for="(t, i) in LEFT_TIPS" :key="`ls${i}`" :transform="`translate(${t[0]} ${t[1]})`">
        <use
          class="cst-star"
          href="#spark-star"
          :x="i === 1 ? -9 : -7"
          :y="i === 1 ? -9 : -7"
          :width="i === 1 ? 18 : 14"
          :height="i === 1 ? 18 : 14"
        />
      </g>
      <g v-for="(t, i) in RIGHT_TIPS" :key="`rs${i}`" :transform="`translate(${t[0]} ${t[1]})`">
        <use
          class="cst-star"
          href="#spark-star"
          :x="i === 1 ? -9 : -7"
          :y="i === 1 ? -9 : -7"
          :width="i === 1 ? 18 : 14"
          :height="i === 1 ? 18 : 14"
        />
      </g>

      <g :transform="`translate(${LEFT_HUB[0]} ${LEFT_HUB[1]})`">
        <use class="cst-star" href="#spark-star" x="-6" y="-6" width="12" height="12" />
      </g>
      <g :transform="`translate(${RIGHT_HUB[0]} ${RIGHT_HUB[1]})`">
        <use class="cst-star" href="#spark-star" x="-6" y="-6" width="12" height="12" />
      </g>

      <g
        v-for="(st, i) in SCATTER"
        :key="`sc${i}`"
        :transform="`translate(${st.p[0]} ${st.p[1]})`"
        :style="{ opacity: st.o }"
      >
        <use
          :class="['cst-star', st.tw != null ? 'tw' : '']"
          href="#spark-star"
          :x="-st.s / 2"
          :y="-st.s / 2"
          :width="st.s"
          :height="st.s"
          :style="st.tw != null ? { animationDelay: `${st.tw}s` } : undefined"
        />
      </g>
    </g>
  </svg>
</template>

<style scoped>
/* 幅は配置側の w-* ユーティリティに任せる（ここで width を指定すると競合する） */
.cst {
  display: block;
  height: auto;
  max-width: 100%;
  overflow: visible;
  color: var(--color-accent);
}

.cst-figure {
  opacity: 0.2;
}

.cst-lines {
  opacity: 0.55;
}

.cst-forming {
  opacity: 0.5;
}

.cst-star {
  transform-box: fill-box;
  transform-origin: center;
  animation: cst-turn 40s linear infinite;
}

.cst-star.tw {
  animation:
    cst-turn 40s linear infinite,
    cst-twinkle 5s ease-in-out infinite;
}

@keyframes cst-turn {
  to {
    transform: rotate(360deg);
  }
}

@keyframes cst-twinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cst-star,
  .cst-star.tw {
    animation: none;
  }
}
</style>
