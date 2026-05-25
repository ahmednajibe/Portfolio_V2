<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="wrapper"
      class="loader-wrapper"
    >
      <div class="text-center space-y-3">
        <p
          ref="line1El"
          class="font-hand text-3xl md:text-5xl text-text-primary leading-tight opacity-0"
        >
          {{ displayLine1 }}<span v-if="typingLine === 1" class="loader-cursor" />
        </p>
        <p
          ref="line2El"
          class="font-hand text-lg md:text-2xl text-text-secondary opacity-0"
        >
          {{ displayLine2 }}<span v-if="typingLine === 2" class="loader-cursor" />
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { typeText, EASE, DUR } from '~/composables/useAnimation'

const emit = defineEmits<{ done: [] }>()

const wrapper = ref<HTMLElement | null>(null)
const line1El = ref<HTMLElement | null>(null)
const line2El = ref<HTMLElement | null>(null)

const visible      = ref(true)
const displayLine1 = ref('')
const displayLine2 = ref('')
const typingLine   = ref(0)

const LINE1 = 'Ahmed Najiebe'
const LINE2 = 'Building systems beyond interfaces.'

async function runLoader() {
  await new Promise(r => setTimeout(r, 300))

  // Reveal line 1 then type
  if (line1El.value) gsap.to(line1El.value, { opacity: 1, y: 0, duration: DUR.sm, ease: EASE.enter })
  typingLine.value = 1
  await typeText(displayLine1, LINE1, 55, 200)
  typingLine.value = 0

  // Reveal line 2 then type
  if (line2El.value) gsap.to(line2El.value, { opacity: 1, y: 0, duration: DUR.sm, ease: EASE.enter })
  typingLine.value = 2
  await typeText(displayLine2, LINE2, 38, 650)
  typingLine.value = 0

  // Cinematic exit
  if (wrapper.value) {
    gsap.to(wrapper.value, {
      opacity  : 0,
      filter   : 'blur(20px)',
      duration : DUR.lg,
      ease     : EASE.exit,
      onComplete: () => {
        visible.value = false
        emit('done')
      },
    })
  }
}

onMounted(() => {
  // Set initial hidden states
  if (line1El.value) gsap.set(line1El.value, { opacity: 0, y: 12 })
  if (line2El.value) gsap.set(line2El.value, { opacity: 0, y: 12 })
  runLoader()
})
</script>
