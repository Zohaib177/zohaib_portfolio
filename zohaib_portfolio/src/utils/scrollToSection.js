export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToSection(sectionId, { updateHash = true } = {}) {
  const section = document.getElementById(sectionId)
  if (!section) return false

  section.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })

  if (updateHash) window.history.pushState(null, '', `#${sectionId}`)
  return true
}
