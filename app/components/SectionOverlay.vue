<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="overlay"
      class="section-overlay"
    >
      <p class="font-hand text-5xl md:text-7xl text-text-primary text-glow-blue">
        {{ displayText }}<span class="loader-cursor" />
      </p>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { typeText, EASE, DUR } from '~/composables/useAnimation'

const props = defineProps<{ label: string; trigger: boolean }>()
const { trigger } = toRefs(props)

const overlay     = ref<HTMLElement | null>(null)
const visible     = ref(false)
const displayText = ref('')
const emit        = defineEmits<{ done: [] }>()

watch(trigger, async (val) => {
  if (!val) return
  visible.value     = true
  displayText.value = ''

  await new Promise(r => setTimeout(r, 80))

  // Fade in overlay
  if (overlay.value) gsap.fromTo(overlay.value, { opacity: 0 }, { opacity: 1, duration: DUR.xs, ease: EASE.enter })

  // Type the section label
  await typeText(displayText, props.label, 38, 300)

  // Blur exit — same as loader exit
  if (overlay.value) {
    await gsap.to(overlay.value, {
      opacity  : 0,
      filter   : 'blur(14px)',
      duration : DUR.md,
      ease     : EASE.exit,
    }).then()
  }

  visible.value     = false
  displayText.value = ''
  emit('done')
})
</script>
