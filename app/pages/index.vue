<template>
  <div>
    <IntroLoader @done="onLoaderDone" />

    <template v-if="loaderDone">
      <!-- Hero panel -->
      <div data-panel="hero" class="page-panel">
        <HeroSection :loaderDone="loaderDone" />
      </div>

      <!-- About panel -->
      <div data-panel="about" class="page-panel">
        <div class="panel-inner">
          <AboutSection />
          <StatsSection />
        </div>
      </div>

      <!-- Projects panel -->
      <div data-panel="projects" class="page-panel">
        <div class="panel-inner">
          <ProjectsSection />
        </div>
      </div>

      <!-- Polluscan panel -->
      <div data-panel="polluscan" class="page-panel">
        <div class="panel-inner">
          <PolluscanSection />
        </div>
      </div>

      <!-- Stack panel -->
      <div data-panel="stack" class="page-panel">
        <div class="panel-inner">
          <TechStackSection />
        </div>
      </div>

      <!-- Experience panel -->
      <div data-panel="experience" class="page-panel">
        <div class="panel-inner">
          <ExperienceSection />
        </div>
      </div>

      <!-- Contact panel -->
      <div data-panel="contact" class="page-panel">
        <div class="panel-inner">
          <ContactSection />
          <TheFooter />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { currentPage } from '~/composables/usePageNav'
import HeroSection from '~/components/HeroSection.vue'

const AboutSection      = defineAsyncComponent(() => import('~/components/AboutSection.vue'))
const StatsSection      = defineAsyncComponent(() => import('~/components/StatsSection.vue'))
const ProjectsSection   = defineAsyncComponent(() => import('~/components/ProjectsSection.vue'))
const PolluscanSection  = defineAsyncComponent(() => import('~/components/PolluscanSection.vue'))
const TechStackSection  = defineAsyncComponent(() => import('~/components/TechStackSection.vue'))
const ExperienceSection = defineAsyncComponent(() => import('~/components/ExperienceSection.vue'))
const ContactSection    = defineAsyncComponent(() => import('~/components/ContactSection.vue'))
const TheFooter         = defineAsyncComponent(() => import('~/components/TheFooter.vue'))

const loaderDone = ref(false)

function onLoaderDone() {
  loaderDone.value = true
  nextTick(() => {
    // Determine which panel to show from URL hash
    const hash = window.location.hash.slice(1)
    const target = ['hero', 'about', 'projects', 'polluscan', 'stack', 'experience', 'contact'].includes(hash)
      ? hash
      : 'hero'

    currentPage.value = target

    // Hide all panels except the target
    document.querySelectorAll('[data-panel]').forEach(el => {
      const panel = el as HTMLElement
      if (panel.dataset.panel !== target) panel.style.display = 'none'
    })
  })
}

useHead({ title: 'Ahmed Najiebe — Digital Systems Engineer' })
</script>

<style scoped>
.page-panel {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  contain: layout style paint;
}

.panel-inner {
  min-height: 100vh;
  padding-bottom: 6rem;
}
</style>
