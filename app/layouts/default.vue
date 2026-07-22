<template>
  <div>
    <TheNav />
    <div class="grain-overlay" />
    <slot />
    <SectionTransitionOverlay />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { currentPage, isTransitioning, PAGE_IDS, goToPage } from '~/composables/usePageNav'

function setupWheelNav() {
  let lastNav = 0
  const COOLDOWN = 1200

  function onWheel(e: WheelEvent) {
    if (Math.abs(e.deltaY) < 8) return
    if (isTransitioning.value) return
    if (Date.now() - lastNav < COOLDOWN) return

    const panel = document.querySelector(`[data-panel="${currentPage.value}"]`) as HTMLElement | null
    const idx   = PAGE_IDS.indexOf(currentPage.value)

    if (e.deltaY > 0) {
      const atBottom = !panel || panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 60
      if (atBottom && idx < PAGE_IDS.length - 1) {
        lastNav = Date.now()
        goToPage(PAGE_IDS[idx + 1]!)
      }
    } else {
      const atTop = !panel || panel.scrollTop <= 60
      if (atTop && idx > 0) {
        lastNav = Date.now()
        goToPage(PAGE_IDS[idx - 1]!)
      }
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    // Alt+C → toggle custom cursor (useful during DevTools inspection)
    if (e.altKey && e.code === 'KeyC') {
      document.body.classList.toggle('cursor-disabled')
      return
    }
    const idx = PAGE_IDS.indexOf(currentPage.value)
    if (e.code === 'ArrowDown' || e.code === 'PageDown') {
      if (idx < PAGE_IDS.length - 1) { e.preventDefault(); goToPage(PAGE_IDS[idx + 1]!) }
    }
    if (e.code === 'ArrowUp' || e.code === 'PageUp') {
      if (idx > 0) { e.preventDefault(); goToPage(PAGE_IDS[idx - 1]!) }
    }
  }

  // Touch swipe navigation
  let touchStartY = 0
  let touchStartX = 0
  const SWIPE_THRESHOLD = 50

  function onTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0]?.clientY ?? 0
    touchStartX = e.touches[0]?.clientX ?? 0
  }

  function onTouchEnd(e: TouchEvent) {
    if (isTransitioning.value) return
    const endY = e.changedTouches[0]?.clientY ?? 0
    const endX = e.changedTouches[0]?.clientX ?? 0
    const diffY = touchStartY - endY
    const diffX = Math.abs(touchStartX - endX)

    // Only handle vertical swipes (ignore horizontal)
    if (Math.abs(diffY) < SWIPE_THRESHOLD || diffX > Math.abs(diffY)) return

    const panel = document.querySelector(`[data-panel="${currentPage.value}"]`) as HTMLElement | null
    const idx   = PAGE_IDS.indexOf(currentPage.value)

    if (diffY > 0) {
      const atBottom = !panel || panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 60
      if (atBottom && idx < PAGE_IDS.length - 1) goToPage(PAGE_IDS[idx + 1]!)
    } else {
      const atTop = !panel || panel.scrollTop <= 60
      if (atTop && idx > 0) goToPage(PAGE_IDS[idx - 1]!)
    }
  }

  window.addEventListener('wheel',      onWheel,      { passive: true })
  window.addEventListener('keydown',    onKeyDown)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend',   onTouchEnd,   { passive: true })

  return () => {
    window.removeEventListener('wheel',      onWheel)
    window.removeEventListener('keydown',    onKeyDown)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend',   onTouchEnd)
  }
}

let cleanup: (() => void) | null = null

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
    cleanup = setupWheelNav()
  }
})

onUnmounted(() => cleanup?.())
</script>
