<template>
  <div>
    <TheNav />
    <div class="grain-overlay" />
    <slot />
    <SectionTransitionOverlay />

    <!-- Navigation progress indicator -->
    <div class="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
      <span class="text-[10px] font-mono text-text-secondary tabular-nums">
        {{ String(currentIndex + 1).padStart(2, '0') }}
      </span>
      <div class="w-px h-32 bg-white/10 relative overflow-hidden rounded-full">
        <div class="absolute top-0 left-0 w-full bg-accent-blue transition-all duration-500 ease-out rounded-full"
             :style="{ height: `${((currentIndex + 1) / PAGE_IDS.length) * 100}%` }" />
      </div>
      <span class="text-[10px] font-mono text-text-secondary/50 tabular-nums">
        {{ String(PAGE_IDS.length).padStart(2, '0') }}
      </span>
    </div>

    <!-- Back to top button -->
    <Transition name="fade">
      <button
        v-if="showBackToTop"
        class="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-all cursor-none"
        aria-label="Back to top"
        @click="scrollPanelToTop"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { currentPage, isTransitioning, PAGE_IDS, goToPage } from '~/composables/usePageNav'

const currentIndex = computed(() => PAGE_IDS.indexOf(currentPage.value))

const showBackToTop = ref(false)
let activeScrollEl: HTMLElement | null = null

function onPanelScroll() {
  showBackToTop.value = !!activeScrollEl && activeScrollEl.scrollTop > 400
}

function scrollPanelToTop() {
  if (activeScrollEl) activeScrollEl.scrollTo({ top: 0, behavior: 'smooth' })
}

// Attach scroll listener to active panel whenever page changes
watch(currentPage, (page) => {
  if (activeScrollEl) {
    activeScrollEl.removeEventListener('scroll', onPanelScroll)
    activeScrollEl = null
  }
  showBackToTop.value = false
  nextTick(() => {
    activeScrollEl = document.querySelector(`[data-panel="${page}"]`) as HTMLElement | null
    if (activeScrollEl) activeScrollEl.addEventListener('scroll', onPanelScroll, { passive: true })
  })
}, { immediate: true })

function setupWheelNav() {
  let lastNav = 0
  const COOLDOWN = 800

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
    if (activeScrollEl) activeScrollEl.removeEventListener('scroll', onPanelScroll)
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
