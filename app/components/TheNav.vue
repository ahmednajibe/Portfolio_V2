<template>
  <!-- Bottom floating dock -->
  <nav ref="navEl" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
    <div class="dock">
      <a
        v-for="item in links"
        :key="item.href"
        :href="item.href"
        class="dock-item cursor-none"
        :class="{ 'dock-active': currentPage === item.section }"
        @click.prevent="goToPage(item.section)"
      >
        <!-- Tooltip -->
        <span class="dock-tooltip">{{ item.label }}</span>
        <!-- Icon -->
        <component :is="item.icon" class="w-5 h-5" />
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { gsap } from 'gsap'
import { DUR, EASE } from '~/composables/useAnimation'
import { currentPage, goToPage } from '~/composables/usePageNav'

const navEl = ref<HTMLElement | null>(null)

const IconHome = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M3 12L12 3l9 9' }),
  h('path', { d: 'M9 21V12h6v9' }),
  h('path', { d: 'M3 12v9h18V12' }),
])
const IconUser = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '8', r: '4' }),
  h('path', { d: 'M4 20c0-4 3.6-7 8-7s8 3 8 7' }),
])
const IconLayers = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M12 2L2 7l10 5 10-5-10-5z' }),
  h('path', { d: 'M2 17l10 5 10-5' }),
  h('path', { d: 'M2 12l10 5 10-5' }),
])
const IconFolder = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z' }),
])
const IconBriefcase = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: '2', y: '7', width: '20', height: '14', rx: '2' }),
  h('path', { d: 'M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2' }),
])
const IconActivity = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('polyline', { points: '22 12 18 12 15 21 9 3 6 12 2 12' }),
])
const IconMail = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: '2', y: '4', width: '20', height: '16', rx: '2' }),
  h('path', { d: 'M2 7l10 7 10-7' }),
])

const links = [
  { href: '#hero',       label: 'Home',       section: 'hero',       icon: IconHome },
  { href: '#about',      label: 'About',      section: 'about',      icon: IconUser },
  { href: '#stack',      label: 'Stack',      section: 'stack',      icon: IconLayers },
  { href: '#projects',   label: 'Projects',   section: 'projects',   icon: IconFolder },
  { href: '#polluscan',  label: 'Polluscan',  section: 'polluscan',  icon: IconActivity },
  { href: '#experience', label: 'Experience', section: 'experience', icon: IconBriefcase },
  { href: '#contact',    label: 'Contact',    section: 'contact',    icon: IconMail },
]

onMounted(() => {
  if (navEl.value) {
    gsap.from(navEl.value, {
      opacity : 0,
      y       : 24,
      duration: DUR.md,
      delay   : 1.2,
      ease    : EASE.enter,
    })
  }
})
</script>

<style scoped>
.dock {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 6px 8px;
  background: rgba(10, 10, 15, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  overflow: visible;
}

.dock-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: rgba(148, 163, 184, 0.4);
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

@media (min-width: 640px) {
  .dock { padding: 8px 12px; }
  .dock-item { width: 38px; height: 38px; }
}

.dock-item:hover {
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-3px);
}

.dock-active {
  color: #7DD3FC;
  background: rgba(125, 211, 252, 0.07);
}

/* Tooltip */
.dock-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(6px);
  background: rgba(15, 15, 19, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e5e7eb;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 5px 10px;
  border-radius: 100px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.18s ease, transform 0.18s ease;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.dock-item:hover .dock-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
