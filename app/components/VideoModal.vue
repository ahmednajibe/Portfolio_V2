<template>
  <Teleport to="body">
    <div v-if="mounted" ref="backdropEl" class="modal-backdrop" @click.self="close">
      <div ref="boxEl" class="modal-box">

        <!-- Top bar -->
        <div class="modal-topbar">
          <div class="modal-label">
            <span class="modal-dot" />
            <span>{{ title || 'Watch Demo' }}</span>
          </div>
          <button class="modal-close" @click="close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
            </svg>
            <span>ESC</span>
          </button>
        </div>

        <!-- Video -->
        <div class="modal-video">
          <iframe
            v-if="mounted"
            :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`"
            allow="autoplay; encrypted-media; fullscreen"
            allowfullscreen
            class="w-full h-full"
            frameborder="0"
          />
        </div>

        <!-- Bottom glow line -->
        <div class="modal-glow-line" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps<{
  modelValue: boolean
  videoId: string
  title?: string
}>()

const emit   = defineEmits<{ 'update:modelValue': [val: boolean] }>()
const mounted    = ref(false)
const backdropEl = ref<HTMLElement | null>(null)
const boxEl      = ref<HTMLElement | null>(null)

watch(() => props.modelValue, (val) => {
  if (val) openModal()
  else     closeModal()
})

function openModal() {
  mounted.value = true
  document.body.classList.add('modal-open')
  nextTick(() => {
    if (!backdropEl.value || !boxEl.value) return
    gsap.set(backdropEl.value, { opacity: 0 })
    gsap.set(boxEl.value, { opacity: 0, y: 32, scale: 0.94, filter: 'blur(8px)' })
    const tl = gsap.timeline()
    tl.to(backdropEl.value, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      .to(boxEl.value,      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }, '-=0.15')
  })
}

function closeModal() {
  document.body.classList.remove('modal-open')
  if (!backdropEl.value || !boxEl.value) {
    mounted.value = false
    return
  }
  const tl = gsap.timeline({ onComplete: () => { mounted.value = false } })
  tl.to(boxEl.value,      { opacity: 0, y: 16, scale: 0.96, filter: 'blur(6px)', duration: 0.25, ease: 'power2.in' })
    .to(backdropEl.value, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1')
}

function close() {
  emit('update:modelValue', false)
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) close()
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(5, 8, 22, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  cursor: default;
}
.modal-backdrop * { cursor: default; }

.modal-box {
  position: relative;
  width: 100%;
  max-width: 920px;
  background: #0c1120;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(125, 211, 252, 0.05),
    0 60px 120px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255,255,255,0.05);
}

.modal-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.02);
}

.modal-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  font-family: ui-monospace, monospace;
}

.modal-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7DD3FC;
  box-shadow: 0 0 8px rgba(125,211,252,0.6);
  animation: pulse-dot 2s ease infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.modal-close {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  cursor: none;
  padding: 4px 8px;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 4px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  font-family: ui-monospace, monospace;
}
.modal-close:hover {
  color: rgba(255,255,255,0.8);
  border-color: rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04);
}

.modal-video {
  aspect-ratio: 16/9;
  background: #000;
}
.modal-video iframe { display: block; }

.modal-glow-line {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(125,211,252,0.3) 50%, transparent 100%);
}
</style>
