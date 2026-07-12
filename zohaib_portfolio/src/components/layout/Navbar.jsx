import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FiExternalLink, FiMenu, FiX } from 'react-icons/fi'
import Button from '../common/Button.jsx'
import NavLink from '../common/NavLink.jsx'
import { navigationLinks } from '../../data/navigationData.js'
import { personalData } from '../../data/personalData.js'
import useActiveSection from '../../hooks/useActiveSection.js'
import useClickOutside from '../../hooks/useClickOutside.js'
import { scrollToSection } from '../../utils/scrollToSection.js'
import Container from './Container.jsx'

const sectionIds = navigationLinks.map((link) => link.sectionId)

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  const shouldReduceMotion = useReducedMotion()
  const navigationRef = useRef(null)
  const menuButtonRef = useRef(null)
  const firstMobileLinkRef = useRef(null)

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  useClickOutside(navigationRef, closeMenu, isMenuOpen)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const focusTimer = window.setTimeout(() => firstMobileLinkRef.current?.focus(), 50)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        menuButtonRef.current?.focus()
      }
    }
    const desktopMedia = window.matchMedia('(min-width: 1024px)')
    const handleDesktopChange = (event) => {
      if (event.matches) closeMenu()
    }

    document.addEventListener('keydown', handleKeyDown)
    desktopMedia.addEventListener('change', handleDesktopChange)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      desktopMedia.removeEventListener('change', handleDesktopChange)
    }
  }, [closeMenu, isMenuOpen])

  const handleLogoClick = (event) => {
    event.preventDefault()
    scrollToSection('home')
    closeMenu()
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ${
        isScrolled
          ? 'border-border-subtle bg-background/90 shadow-[0_8px_24px_rgb(0_0_0/0.18)] backdrop-blur-md'
          : 'border-transparent bg-background/20'
      }`}
    >
      <Container className="h-full">
        <nav
          ref={navigationRef}
          className="relative flex h-full items-center justify-between gap-4"
          aria-label="Primary navigation"
        >
          <a
            href="#home"
            onClick={handleLogoClick}
            aria-label="Zohaib Akhtar — go to home section"
            className="focus-ring shrink-0 rounded-control font-heading text-xl font-bold tracking-[-0.04em] text-foreground sm:text-2xl"
          >
            ZA<span className="text-accent">.</span>
          </a>

          <div className="hidden items-center gap-5 lg:flex lg:gap-7">
            <div className="flex items-center gap-3 lg:gap-5">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.sectionId}
                  link={link}
                  isActive={activeSection === link.sectionId}
                />
              ))}
            </div>
            {personalData.resumePath && (
              <Button
                href={personalData.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="small"
                rightIcon={<FiExternalLink />}
                aria-label="Open Zohaib Akhtar's resume PDF in a new tab"
              >
                Resume
              </Button>
            )}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="focus-ring flex size-11 items-center justify-center rounded-control border border-border-subtle text-xl text-foreground transition-colors hover:border-border-hover hover:bg-white/5 lg:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-navigation"
                initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                className="professional-border absolute top-[calc(100%+0.75rem)] right-0 left-0 overflow-hidden rounded-card bg-card-elevated p-3 shadow-card lg:hidden"
              >
                <div className="flex flex-col">
                  {navigationLinks.map((link, index) => (
                    <NavLink
                      key={link.sectionId}
                      link={link}
                      isActive={activeSection === link.sectionId}
                      onNavigate={closeMenu}
                      mobile
                      linkRef={index === 0 ? firstMobileLinkRef : undefined}
                    />
                  ))}
                </div>
                {personalData.resumePath && (
                  <div className="mt-3 border-t border-border-subtle pt-3">
                    <Button
                      href={personalData.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="medium"
                      rightIcon={<FiExternalLink />}
                      className="w-full"
                      onClick={closeMenu}
                      aria-label="Open Zohaib Akhtar's resume PDF in a new tab"
                    >
                      Resume
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </Container>
    </header>
  )
}

export default Navbar
