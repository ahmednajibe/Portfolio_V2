<template>
  <Teleport to="body">
    <div ref="overlayEl" class="soverlay">
      <div class="soverlay-grain" />
      <div class="soverlay-content">

        <!-- Characters written one by one -->
        <div ref="textContainerEl" class="soverlay-text">
          <span
            v-for="(char, i) in chars"
            :key="i"
            :ref="(el) => setCharRef(el, i)"
            class="soverlay-char"
          >{{ char === ' ' ? '\u00A0' : char }}</span>
        </div>

        <!-- Wavy underline drawn by stroke -->
        <svg ref="svgEl" class="soverlay-underline" viewBox="0 0 400 18" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hw-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stop-color="#7DD3FC" />
              <stop offset="100%" stop-color="#34D399" />
            </linearGradient>
          </defs>
          <path
            ref="pathEl"
            d="M0 9 C40 4, 80 14, 120 9 C160 4, 200 13, 240 8 C280 3, 320 13, 360 8 C380 6, 390 9, 400 9"
            stroke="url(#hw-grad)"
            stroke-width="2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { overlayText, overlayVisible } from '~/composables/usePageNav'

const overlayEl       = ref<HTMLElement | null>(null)
const svgEl           = ref<SVGSVGElement | null>(null)
const pathEl          = ref<SVGPathElement | null>(null)
const textContainerEl = ref<HTMLElement | null>(null)

let charRefs: HTMLElement[] = []
function setCharRef(el: unknown, i: number) {
  if (el instanceof HTMLElement) charRefs[i] = el
}

const chars = computed(() => overlayText.value.split(''))

onMounted(() => {
  gsap.set(overlayEl.value, { autoAlpha: 0, pointerEvents: 'none' })
})

watch(overlayVisible, async (visible) => {
  if (!overlayEl.value) return

  if (visible) {
    await nextTick()

    // Sync underline width to actual text width
    if (svgEl.value && textContainerEl.value) {
      svgEl.value.style.width = textContainerEl.value.offsetWidth + 'px'
    }

    // Reset chars
    charRefs = charRefs.slice(0, chars.value.length)
    charRefs.forEach(el => {
      if (el) gsap.set(el, { opacity: 0, scaleX: 0, scaleY: 0.3, rotation: -10, transformOrigin: '0% 85%' })
    })

    // Reset underline
    const pathLen = pathEl.value?.getTotalLength() ?? 400
    if (pathEl.value) gsap.set(pathEl.value, { strokeDasharray: pathLen, strokeDashoffset: pathLen })

    const tl = gsap.timeline()

    // 1. Background fades in
    tl.to(overlayEl.value, { autoAlpha: 1, pointerEvents: 'auto', duration: 0.15, ease: 'none' })

    // 2. Each character written in sequence
    charRefs.forEach((el, i) => {
      if (!el) return
      tl.to(el, {
        opacity   : 1,
        scaleX    : 1,
        scaleY    : 1,
        rotation  : 0,
        duration  : 0.11,
        ease      : 'back.out(2)',
      }, 0.1 + i * 0.058)
    })

    // 3. Underline draws after last char
    const lastCharTime = 0.1 + (chars.value.length - 1) * 0.058 + 0.11
    if (pathEl.value) {
      tl.to(pathEl.value, {
        strokeDashoffset: 0,
        duration        : 0.45,
        ease            : 'power2.inOut',
      }, lastCharTime - 0.1)
    }

  } else {
    gsap.to(overlayEl.value, {
      autoAlpha   : 0,
      pointerEvents: 'none',
      duration    : 0.28,
      ease        : 'power2.in',
    })
  }
})
</script>

<style scoped>
.soverlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  backdrop-filter: blur(40px) brightness(0.5);
  -webkit-backdrop-filter: blur(40px) brightness(0.5);
  visibility: hidden;
  opacity: 0;
}

.soverlay-grain {
  display: none;
}

.soverlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  width: 100%;
  max-width: 90vw;
}

.soverlay-text {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 1;
}

.soverlay-char {
  font-family: 'Kalam', 'Caveat', cursive;
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  font-weight: 700;
  color: #ffffff;
  display: inline-block;
  will-change: transform, opacity;
  text-shadow:
    0 0 40px rgba(125, 211, 252, 0.6),
    0 0 80px rgba(125, 211, 252, 0.2),
    0 2px 20px rgba(0, 0, 0, 0.8);
}

.soverlay-underline {
  width: 100%;
  height: 18px;
  display: block;
  overflow: visible;
}
</style>
