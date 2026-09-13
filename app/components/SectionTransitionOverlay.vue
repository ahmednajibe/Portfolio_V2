
<!--
  Section transition label.

  A large, fast cinematic chapter beat between panels. The handwriting moment
  belongs to the intro loader and happens once per session; repeating it on
  every panel change cost roughly 1.2s of blocking animation and stopped
  feeling intentional after the second navigation. This keeps the "new
  chapter" beat the design wants — large display type, masked reveal — at
  roughly a third of the duration.
-->
<template>
  <Teleport to="body">
    <div ref="overlayEl" class="soverlay" aria-hidden="true">
      <div class="soverlay-content">
        <span ref="labelEl" class="soverlay-label">{{ overlayText }}</span>
        <span ref="ruleEl" class="soverlay-rule" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { overlayText, overlayVisible } from '~/composables/usePageNav'

const overlayEl = ref<HTMLElement | null>(null)
const labelEl = ref<HTMLElement | null>(null)
const ruleEl = ref<HTMLElement | null>(null)

const reduceMotion = () =>
  import.meta.client
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  gsap.set(overlayEl.value, { autoAlpha: 0, pointerEvents: 'none' })
})

watch(overlayVisible, async (visible) => {
  if (!overlayEl.value) return

  if (visible) {
    await nextTick()

    if (reduceMotion()) {
      gsap.set(overlayEl.value, { autoAlpha: 1 })
      gsap.set([labelEl.value, ruleEl.value], { opacity: 1, y: 0, scaleX: 1 })
      return
    }

    gsap.set(labelEl.value, { opacity: 0, y: 8, filter: 'blur(6px)' })
    gsap.set(ruleEl.value, { opacity: 0, y: 8, scaleX: 0, transformOrigin: 'center' })

    gsap.timeline()
      .to(overlayEl.value, { autoAlpha: 1, duration: 0.12, ease: 'none' })
      .to(labelEl.value, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.24,
        ease: 'power3.out',
      }, 0.04)
      .to(ruleEl.value, {
        opacity: 1,
        y: 0,
        scaleX: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 0.08)

  } else {
    if (reduceMotion()) {
      gsap.set(overlayEl.value, { autoAlpha: 0 })
      return
    }

    gsap.timeline()
      .to([labelEl.value, ruleEl.value], {
        opacity: 0,
        y: -6,
        duration: 0.16,
        ease: 'power2.in',
      })
      .to(overlayEl.value, { autoAlpha: 0, duration: 0.18, ease: 'power2.in' }, '-=0.06')
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
  background: rgba(6, 6, 8, 0.55);
  backdrop-filter: blur(14px) brightness(0.7);
  -webkit-backdrop-filter: blur(14px) brightness(0.7);
  visibility: hidden;
  opacity: 0;
}

.soverlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
}

.soverlay-label {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 9vw, 7rem);
  font-weight: 900;
  letter-spacing: -0.035em;
  line-height: 1;
  text-transform: none;
  color: var(--text-primary);
  will-change: transform, opacity, filter;
}

.soverlay-rule {
  display: block;
  width: clamp(3rem, 12vw, 8rem);
  height: 1px;
  background: var(--accent);
  will-change: transform;
}

@media (prefers-reduced-transparency: reduce) {
  .soverlay {
    background: rgba(6, 6, 8, 0.94);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
