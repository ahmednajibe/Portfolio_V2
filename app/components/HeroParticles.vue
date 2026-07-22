<template>
  <canvas ref="canvas" class="hero-canvas" />
</template>

<script setup lang="ts">
import { currentPage } from '~/composables/usePageNav'

const canvas = ref<HTMLCanvasElement | null>(null)

let raf       = 0
let mouse     = { x: -9999, y: -9999 }

const MOUSE_RADIUS = 120
const MOUSE_FORCE  = 0.06

type Particle = {
  x: number; y: number
  vx: number; vy: number
  ox: number; oy: number
  size: number; opacity: number; blue: boolean
}

let particles: Particle[] = []

function initParticles(w: number, h: number) {
  const count = Math.min(Math.floor((w * h) / 14000), 90)
  particles = Array.from({ length: count }, () => makeParticle(w, h))
}

function makeParticle(w: number, h: number): Particle {
  const x = Math.random() * w
  const y = Math.random() * h
  return {
    x, y,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    ox: x, oy: y,
    size   : Math.random() * 1.4 + 0.4,
    opacity: Math.random() * 0.45 + 0.1,
    blue   : Math.random() < 0.28,
  }
}

function draw() {
  const cv = canvas.value
  if (!cv) return
  const ctx = cv.getContext('2d')!
  const W = cv.width
  const H = cv.height

  ctx.clearRect(0, 0, W, H)

  for (const p of particles) {
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < MOUSE_RADIUS && dist > 0) {
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE
      p.vx -= (dx / dist) * force * 3.5
      p.vy -= (dy / dist) * force * 3.5
    }

    p.vx += (p.ox - p.x) * 0.0008
    p.vy += (p.oy - p.y) * 0.0008
    p.vx *= 0.98
    p.vy *= 0.98

    p.x += p.vx
    p.y += p.vy

    if (p.x < -10) p.x = W + 10
    if (p.x > W + 10) p.x = -10
    if (p.y < -10) p.y = H + 10
    if (p.y > H + 10) p.y = -10

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = p.blue
      ? `rgba(125, 211, 252, ${p.opacity})`
      : `rgba(255, 255, 255, ${p.opacity})`
    ctx.fill()
  }

  raf = requestAnimationFrame(draw)
}

function resize() {
  const cv = canvas.value
  if (!cv) return
  const rect = cv.parentElement!.getBoundingClientRect()
  cv.width  = rect.width
  cv.height = rect.height
  initParticles(cv.width, cv.height)
}

function onMouseMove(e: MouseEvent) {
  const cv = canvas.value
  if (!cv) return
  const rect = cv.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

function onMouseLeave() {
  mouse.x = -9999
  mouse.y = -9999
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  resize()
  draw()

  const section = canvas.value?.parentElement
  section?.addEventListener('mousemove', onMouseMove, { passive: true })
  section?.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('resize', resize, { passive: true })
})

// Pause/resume particles based on active panel
watch(currentPage, (page) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (page === 'hero') {
    if (!raf) draw()
  } else {
    if (raf) { cancelAnimationFrame(raf); raf = 0 }
  }
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  const section = canvas.value?.parentElement
  section?.removeEventListener('mousemove', onMouseMove)
  section?.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
