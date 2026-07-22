import { gsap } from 'gsap'

/**
 * useMagnetic — applies a magnetic pull effect to an element.
 * The element subtly follows the cursor on hover and snaps back on leave.
 *
 * Usage:
 *   const btn = ref<HTMLElement | null>(null)
 *   useMagnetic(btn, 0.3)
 */
export function useMagnetic(
  el: Ref<HTMLElement | null>,
  strength = 0.3,
) {
  let cleanup: (() => void) | null = null

  onMounted(() => {
    if (!el.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const btn = el.value

    function onMove(e: MouseEvent) {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
    }

    function onLeave() {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' })
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)

    cleanup = () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  })

  onUnmounted(() => cleanup?.())
}
