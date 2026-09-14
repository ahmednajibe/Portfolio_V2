import { gsap } from 'gsap'

export const currentPage    = ref('hero')
export const isTransitioning = ref(false)
export const overlayText    = ref('')
export const overlayVisible = ref(false)

export const PAGE_IDS = ['hero', 'about', 'projects', 'experience', 'stack', 'case-study', 'contact']

// Sync currentPage with URL hash for deep linking
if (import.meta.client) {
  window.addEventListener('popstate', (e) => {
    const page = (e.state?.page as string) || window.location.hash.slice(1) || 'hero'
    if (PAGE_IDS.includes(page) && page !== currentPage.value) {
      goToPage(page)
    }
  })
}

const SECTION_NAMES: Record<string, string> = {
  hero:       'Home',
  about:      'About',
  stack:      'Stack',
  projects:   'Projects',
  'case-study': 'Case Study',
  experience: 'Experience',
  contact:    'Contact',
}

export function goToPage(id: string) {
  // If already on the target page, make sure no stuck overlay/transition state remains.
  if (id === currentPage.value) {
    if (isTransitioning.value) {
      isTransitioning.value = false
      overlayVisible.value = false
    }
    return
  }
  if (isTransitioning.value) return

  const prev = document.querySelector(`[data-panel="${currentPage.value}"]`) as HTMLElement | null
  const next = document.querySelector(`[data-panel="${id}"]`)             as HTMLElement | null

  if (!next) return

  isTransitioning.value = true
  overlayText.value     = SECTION_NAMES[id] ?? id
  overlayVisible.value  = true

  next.scrollTop = 0

  // Safety timeout: if the GSAP timeline somehow fails to complete (e.g.
  // tab backgrounded, rAF paused), force-clear the transition state after
  // 1.5s so the nav doesn't get permanently stuck.
  const safety = setTimeout(() => {
    isTransitioning.value = false
    overlayVisible.value = false
  }, 1500)

  const tl = gsap.timeline({
    onComplete: () => {
      clearTimeout(safety)
      isTransitioning.value = false
    },
  })

  // Wait for the overlay label to land, then swap panels.
  // Timings are tight on purpose: this runs on every navigation, so the whole
  // transition stays around 550ms rather than the 1.3s the old handwriting
  // overlay required.
  tl.addLabel('swap', 0.14)

  if (prev) {
    tl.to(prev, {
      opacity : 0,
      duration: 0.18,
      ease    : 'power2.in',
      onComplete() {
        prev!.style.display = 'none'
        gsap.set(prev!, { clearProps: 'opacity' })
      },
    }, 'swap')
  }

  tl.call(() => {
    currentPage.value  = id
    next!.style.display = 'block'
    if (import.meta.client) {
      window.history.pushState({ page: id }, '', `#${id}`)
    }
  }, [], 'swap+=0.12')

  tl.fromTo(
    next,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: 'power2.out' },
    'swap+=0.12',
  )

  // Hide overlay once the incoming panel is established
  tl.call(() => { overlayVisible.value = false }, [], 'swap+=0.34')
}
