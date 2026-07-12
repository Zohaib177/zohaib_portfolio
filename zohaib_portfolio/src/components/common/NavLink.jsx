import { scrollToSection } from '../../utils/scrollToSection.js'

function NavLink({ link, isActive, onNavigate, mobile = false, linkRef }) {
  const handleClick = (event) => {
    event.preventDefault()
    if (scrollToSection(link.sectionId)) onNavigate?.()
  }

  return (
    <a
      ref={linkRef}
      href={link.href}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      className={`focus-ring relative flex min-h-11 items-center font-medium transition-colors duration-200 ${
        mobile ? 'w-full px-3 text-base' : 'px-1 text-sm'
      } ${
        isActive
          ? 'text-accent'
          : 'text-muted hover:text-foreground'
      }`}
    >
      {link.name}
      <span
        aria-hidden="true"
        className={`absolute bg-accent transition-transform duration-200 ${
          mobile
            ? 'inset-y-2 left-0 w-0.5 origin-center'
            : '-bottom-0.5 inset-x-1 h-0.5 origin-left'
        } ${isActive ? 'scale-100' : 'scale-0'}`}
      />
    </a>
  )
}

export default NavLink
