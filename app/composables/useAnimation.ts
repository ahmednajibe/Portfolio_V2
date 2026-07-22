/**
 * useAnimation — Unified animation system for the portfolio.
 *
 * All timing, easing, and scroll-reveal logic lives here.
 * Components import from this composable only — no raw gsap calls scattered around.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─────────────────────────────────────────────
// REDUCED MOTION
// ─────────────────────────────────────────────

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ─────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────

/** Easing */
export const EASE = {
  enter : 'power3.out',   // every element entering the scene
  exit  : 'power2.inOut', // blur-out, fade-out exits
  scale : 'power2.out',   // scale / photo reveals
  text  : 'power4.out',   // big headline words
} as const

/** Durations (seconds) */
export const DUR = {
  xs : 0.40, // fast micro: small labels, thin elements
  sm : 0.60, // standard: paragraphs, badges, small blocks
  md : 0.75, // headlines, feature rows
  lg : 0.90, // blur reveals, large panels
  xl : 1.10, // hero anchor / photo / full-panel
} as const

/** Y offset pixels for from-state */
export const Y = {
  sm : 16, // small: labels, tags
  md : 28, // standard blocks
  lg : 44, // hero big heading words
} as const

/** Stagger between sibling elements */
export const STAGGER = {
  sm : 0.07,  // tight: badges, tech icons
  md : 0.11,  // cards, timeline items
  lg : 0.17,  // large separated blocks
} as const

/** ScrollTrigger start (kept for hero animations) */
export const SCROLL_START = 'top 82%'

// ─────────────────────────────────────────────
// SETUP
// ─────────────────────────────────────────────

let registered = false
function ensureRegistered() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

/**
 * Native IntersectionObserver trigger — fires once when element enters viewport.
 * rootMargin '-18% bottom' = equivalent to ScrollTrigger 'top 82%'.
 */
function onEnterViewport(el: Element, callback: () => void) {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        // Delay so animations start after panel transition completes
        setTimeout(callback, 400)
        io.disconnect()
      }
    },
    { rootMargin: '0px 0px -18% 0px', threshold: 0 },
  )
  io.observe(el)
}

// ─────────────────────────────────────────────
// SCROLL-REVEAL HELPERS
// ─────────────────────────────────────────────

type RevealOpts = {
  delay?    : number
  duration? : number
  y?        : number
  ease?     : string
  start?    : string
}

type StaggerOpts = RevealOpts & {
  stagger?  : number
  x?        : number
}

/**
 * Fade + slide up from `y` offset. The most common scroll reveal.
 */
export function revealFadeUp(el: HTMLElement | null, opts: RevealOpts = {}) {
  if (!el) return
  if (prefersReducedMotion) { gsap.set(el, { opacity: 1, y: 0 }); return }
  const y = opts.y ?? Y.md
  gsap.set(el, { opacity: 0, y })
  onEnterViewport(el, () => gsap.to(el, {
    opacity : 1,
    y       : 0,
    duration: opts.duration ?? DUR.md,
    delay   : opts.delay    ?? 0,
    ease    : opts.ease     ?? EASE.enter,
  }))
}

/**
 * Staggered reveal for a list of sibling elements.
 */
export function revealStagger(
  els     : NodeListOf<Element> | HTMLElement[] | null,
  opts    : StaggerOpts = {},
) {
  if (!els || !els.length) return
  const arr = Array.from(els)
  if (prefersReducedMotion) { gsap.set(arr, { opacity: 1, y: 0, x: 0 }); return }
  const y   = opts.y ?? Y.md
  const x   = opts.x ?? 0
  gsap.set(arr, { opacity: 0, y, x })
  onEnterViewport(arr[0] as Element, () => gsap.to(arr, {
    opacity : 1,
    y       : 0,
    x       : 0,
    duration: opts.duration ?? DUR.sm,
    delay   : opts.delay    ?? 0,
    stagger : opts.stagger  ?? STAGGER.md,
    ease    : opts.ease     ?? EASE.enter,
  }))
}

/**
 * Fade + slide in from left.
 */
export function revealFromLeft(el: HTMLElement | null, opts: RevealOpts = {}) {
  if (!el) return
  if (prefersReducedMotion) { gsap.set(el, { opacity: 1, x: 0 }); return }
  gsap.set(el, { opacity: 0, x: -50 })
  onEnterViewport(el, () => gsap.to(el, { opacity: 1, x: 0, duration: opts.duration ?? DUR.lg, delay: opts.delay ?? 0, ease: opts.ease ?? EASE.enter }))
}

/**
 * Fade + slide in from right.
 */
export function revealFromRight(el: HTMLElement | null, opts: RevealOpts = {}) {
  if (!el) return
  if (prefersReducedMotion) { gsap.set(el, { opacity: 1, x: 0 }); return }
  gsap.set(el, { opacity: 0, x: 50 })
  onEnterViewport(el, () => gsap.to(el, { opacity: 1, x: 0, duration: opts.duration ?? DUR.lg, delay: opts.delay ?? 0, ease: opts.ease ?? EASE.enter }))
}

/**
 * Blur + fade reveal (for section headers and featured elements).
 */
export function revealBlur(el: HTMLElement | null, opts: RevealOpts = {}) {
  if (!el) return
  if (prefersReducedMotion) { gsap.set(el, { opacity: 1, filter: 'blur(0px)', y: 0 }); return }
  const y = opts.y ?? Y.sm
  gsap.set(el, { opacity: 0, filter: 'blur(10px)', y })
  onEnterViewport(el, () => gsap.to(el, {
    opacity : 1,
    filter  : 'blur(0px)',
    y       : 0,
    duration: opts.duration ?? DUR.lg,
    delay   : opts.delay    ?? 0,
    ease    : opts.ease     ?? EASE.enter,
  }))
}

/**
 * Scale + fade (images, photo cards, large panels).
 */
export function revealScale(el: HTMLElement | null, opts: RevealOpts & { scale?: number } = {}) {
  if (!el) return
  if (prefersReducedMotion) { gsap.set(el, { opacity: 1, scale: 1 }); return }
  const fromScale = opts.scale ?? 0.94
  gsap.set(el, { opacity: 0, scale: fromScale })
  onEnterViewport(el, () => gsap.to(el, {
    opacity : 1,
    scale   : 1,
    duration: opts.duration ?? DUR.xl,
    delay   : opts.delay    ?? 0,
    ease    : opts.ease     ?? EASE.scale,
  }))
}

// ─────────────────────────────────────────────
// COMPOSABLE (backward-compatible wrapper)
// ─────────────────────────────────────────────

/**
 * Drop-in composable for Vue components.
 * Usage:
 *   const { revealFadeUp, revealStagger, ... } = useAnimation()
 */
export function useAnimation() {
  onMounted(() => ensureRegistered())
  return {
    revealFadeUp,
    revealStagger,
    revealFromLeft,
    revealFromRight,
    revealBlur,
    revealScale,
    // tokens exposed for inline use
    EASE,
    DUR,
    Y,
    STAGGER,
    SCROLL_START,
  }
}

// ─────────────────────────────────────────────
// HERO TIMELINE BUILDER
// ─────────────────────────────────────────────

type HeroElements = {
  tagline    : HTMLElement | null
  word1      : HTMLElement | null
  word2      : HTMLElement | null
  word3      : HTMLElement | null
  desc       : HTMLElement | null
  cta        : HTMLElement | null
  socials    : HTMLElement | null
  photo      : HTMLElement | null
}

export function heroSetInitialStates(els: HeroElements) {
  const { tagline, word1, word2, word3, desc, cta, socials, photo } = els
  if (prefersReducedMotion) {
    gsap.set([tagline, word1, word2, word3, desc, cta, socials, photo], { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' })
    return
  }
  gsap.set(tagline, { opacity: 0, y: Y.sm })
  gsap.set(word1,   { opacity: 0, y: Y.lg })
  gsap.set(word2,   { opacity: 0, filter: 'blur(14px)', y: Y.md })
  gsap.set(word3,   { opacity: 0, y: Y.md })
  gsap.set(desc,    { opacity: 0, y: Y.sm })
  gsap.set(cta,     { opacity: 0, y: Y.sm })
  gsap.set(socials, { opacity: 0 })
  gsap.set(photo,   { opacity: 0, scale: 0.93, y: Y.sm })
}

export function heroAnimateIn(els: HeroElements) {
  const { tagline, word1, word2, word3, desc, cta, socials, photo } = els
  if (prefersReducedMotion) return gsap.timeline()
  const tl = gsap.timeline({ defaults: { ease: EASE.enter } })

  tl.to(tagline, { opacity: 1, y: 0, duration: DUR.sm })
    .to(word1,   { opacity: 1, y: 0, duration: DUR.md },        '-=0.25')
    .to(word2,   { opacity: 1, y: 0, filter: 'blur(0px)', duration: DUR.lg, ease: EASE.text }, '-=0.20')
    .to(word3,   { opacity: 1, y: 0, duration: DUR.md },        '-=0.30')
    .to(desc,    { opacity: 1, y: 0, duration: DUR.sm },        '-=0.25')
    .to(cta,     { opacity: 1, y: 0, duration: DUR.sm },        '-=0.20')
    .to(socials, { opacity: 1,       duration: DUR.xs },        '-=0.15')
    .to(photo,   { opacity: 1, y: 0, scale: 1, duration: DUR.xl, ease: EASE.scale }, '-=0.75')

  return tl
}

// ─────────────────────────────────────────────
// TYPING (shared between Loader & SectionOverlay)
// ─────────────────────────────────────────────

/** Resolves after fully typing `text` at `charSpeed` ms/char + `pauseAfter` ms delay. */
export function typeText(
  target    : Ref<string>,
  text      : string,
  charSpeed : number = 45,
  pauseAfter: number = 350,
): Promise<void> {
  return new Promise((resolve) => {
    let i = 0
    const interval = setInterval(() => {
      target.value = text.slice(0, ++i)
      if (i >= text.length) {
        clearInterval(interval)
        setTimeout(resolve, pauseAfter)
      }
    }, charSpeed)
  })
}
