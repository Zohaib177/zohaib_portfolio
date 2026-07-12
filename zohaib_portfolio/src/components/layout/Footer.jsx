import { useEffect, useState } from 'react'
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { navigationLinks } from '../../data/navigationData.js'
import { personalData } from '../../data/personalData.js'
import { isUsableContactLink } from '../../utils/contactLinks.js'
import Container from './Container.jsx'

function scrollToSection(event, sectionId) {
  event.preventDefault()
  const section = document.getElementById(sectionId)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  section?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  window.history.pushState(null, '', `#${sectionId}`)
}

const socialItems = [
  { key: 'github', label: 'GitHub', icon: FiGithub },
  { key: 'linkedin', label: 'LinkedIn', icon: FiLinkedin },
  { key: 'email', label: 'Email', icon: FiMail },
]

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 700)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBackToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('home')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    window.history.pushState(null, '', '#home')
  }

  return (
    <footer className="section-divider bg-background-secondary" aria-label="Website footer">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr] lg:py-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              onClick={(event) => scrollToSection(event, 'home')}
              aria-label="Zohaib Akhtar — back to home"
              className="focus-ring inline-flex rounded-control font-heading text-2xl font-bold tracking-[-0.04em] text-foreground"
            >
              ZA<span className="text-accent">.</span>
            </a>
            <p className="mt-3 font-heading text-lg font-semibold text-foreground">{personalData.name}</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted">
              BS Data Science student building practical web, mobile and backend applications.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Quick Links</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-1">
              {navigationLinks.map((link) => (
                <li key={link.sectionId}>
                  <a
                    href={link.href}
                    onClick={(event) => scrollToSection(event, link.sectionId)}
                    className="focus-ring inline-flex min-h-9 items-center rounded text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">Connect</h2>
            <ul className="mt-4 space-y-2">
              {socialItems.map(({ key, label, icon: Icon }) => {
                const href = personalData.socialLinks[key]
                const isAvailable = isUsableContactLink(href)
                return (
                  <li key={key}>
                    {isAvailable ? (
                      <a
                        href={href}
                        target={key === 'email' ? undefined : '_blank'}
                        rel={key === 'email' ? undefined : 'noopener noreferrer'}
                        className="focus-ring inline-flex min-h-10 items-center gap-2 rounded text-sm text-muted transition-colors hover:text-accent"
                        aria-label={`${label} — ${personalData.name}`}
                      >
                        <Icon aria-hidden="true" />
                        {label}
                      </a>
                    ) : (
                      <span className="inline-flex min-h-10 items-center gap-2 text-sm text-muted/60">
                        <Icon aria-hidden="true" />
                        {label} — add link
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border-subtle py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
          <p>Designed and developed with React, Vite and Tailwind CSS. Built in Pakistan.</p>
        </div>
      </Container>

      {showBackToTop && (
        <button
          type="button"
          onClick={handleBackToTop}
          aria-label="Back to top"
          className="focus-ring fixed right-4 bottom-4 z-40 flex size-11 items-center justify-center rounded-full border border-border-subtle bg-card-elevated text-foreground shadow-card transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-hover hover:bg-card sm:right-6 sm:bottom-6"
        >
          <FiArrowUp aria-hidden="true" />
        </button>
      )}
    </footer>
  )
}

export default Footer
