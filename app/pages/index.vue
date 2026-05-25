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
import { currentPage } from '~/composables/usePageNav'

const loaderDone = ref(false)

function onLoaderDone() {
  loaderDone.value = true
  nextTick(() => {
    // Hide all panels except hero
    document.querySelectorAll('[data-panel]').forEach(el => {
      const panel = el as HTMLElement
      if (panel.dataset.panel !== 'hero') panel.style.display = 'none'
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
}

.panel-inner {
  min-height: 100vh;
  padding-bottom: 6rem;
}
</style>
