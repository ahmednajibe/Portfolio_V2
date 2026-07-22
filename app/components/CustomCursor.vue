<template>
  <div>
    <div ref="dot" class="cursor-dot" />
    <div ref="ring" class="cursor-ring" />
  </div>
</template>

<script setup lang="ts">
const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)

let mouseX = 0
let mouseY = 0
let ringX = 0
let ringY = 0
let raf: number

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function animate() {
  ringX = lerp(ringX, mouseX, 0.1)
  ringY = lerp(ringY, mouseY, 0.1)

  if (dot.value) {
    dot.value.style.left = `${mouseX}px`
    dot.value.style.top = `${mouseY}px`
  }
  if (ring.value) {
    ring.value.style.left = `${ringX}px`
    ring.value.style.top = `${ringY}px`
  }

  raf = requestAnimationFrame(animate)
}

let firstMove = true
function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
  if (firstMove) {
    firstMove = false
    if (dot.value)  dot.value.style.opacity  = '1'
    if (ring.value) ring.value.style.opacity = '1'
  }
}

function onMouseOver(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.matches('a, button, [data-cursor="hover"]')) {
    document.body.classList.add('cursor-hover')
  }
}

function onMouseOut(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.matches('a, button, [data-cursor="hover"]')) {
    document.body.classList.remove('cursor-hover')
  }
}

const isTouch = ref(false)

onMounted(() => {
  // Don't run on touch-only devices
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    isTouch.value = true
    return
  }

  // Don't run if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isTouch.value = true
    return
  }

  // Hide until first real mouse move (avoid 0,0 flash)
  if (dot.value)  { dot.value.style.opacity  = '0' }
  if (ring.value) { ring.value.style.opacity = '0' }

  raf = requestAnimationFrame(animate)
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseover', onMouseOver)
  document.addEventListener('mouseout',  onMouseOut)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mouseout', onMouseOut)
})
</script>
