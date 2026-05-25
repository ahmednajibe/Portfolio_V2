<template>
  <footer ref="footerEl" class="border-t border-white/5 py-10">
    <div class="section-container">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="font-satoshi font-black text-sm tracking-[0.15em] uppercase text-text-primary">AN<span class="text-accent-blue">.</span></span>
          <span class="text-text-secondary text-xs">Ahmed Najiebe — Full Stack Developer</span>
        </div>

        <div class="flex items-center gap-6">
          <a href="https://github.com/ahmednajibe" target="_blank" rel="noopener" class="text-text-secondary hover:text-text-primary transition-colors text-xs uppercase tracking-wider cursor-none">GitHub</a>
          <a href="https://linkedin.com/in/ahmed-m-najibe" target="_blank" rel="noopener" class="text-text-secondary hover:text-text-primary transition-colors text-xs uppercase tracking-wider cursor-none">LinkedIn</a>
          <a href="https://mostaql.com/u/lectara" target="_blank" rel="noopener" class="text-text-secondary hover:text-text-primary transition-colors text-xs uppercase tracking-wider cursor-none">Mostaql</a>
        </div>

        <p class="text-text-secondary text-xs font-mono">
          © {{ new Date().getFullYear() }} — Built with Nuxt 4 + GSAP
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { revealFadeUp, DUR, Y } from '~/composables/useAnimation'
const footerEl = ref<HTMLElement | null>(null)
onMounted(() => revealFadeUp(footerEl.value, { y: Y.sm, duration: DUR.sm }))
</script>
