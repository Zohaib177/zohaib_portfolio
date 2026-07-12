import { useEffect, useState } from 'react'

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')
  const sectionKey = sectionIds.join(',')

  useEffect(() => {
    const ids = sectionKey.split(',').filter(Boolean)
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return undefined

    const visibleSections = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio)
          } else {
            visibleSections.delete(entry.target.id)
          }
        })

        const nextSection = [...visibleSections.entries()].sort(
          (first, second) => second[1] - first[1],
        )[0]?.[0]

        if (nextSection) {
          setActiveSection((current) =>
            current === nextSection ? current : nextSection,
          )
        }
      },
      {
        rootMargin: '-76px 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    )

    sections.forEach((section) => observer.observe(section))

    const handlePageEdges = () => {
      if (window.scrollY < 24) {
        setActiveSection((current) => (current === ids[0] ? current : ids[0]))
        return
      }

      const nearPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
      const lastId = ids.at(-1)
      if (nearPageBottom && lastId) {
        setActiveSection((current) => (current === lastId ? current : lastId))
      }
    }

    handlePageEdges()
    window.addEventListener('scroll', handlePageEdges, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handlePageEdges)
    }
  }, [sectionKey])

  return activeSection
}

export default useActiveSection
