import Button from './Button.jsx'

function ScrollLink({ sectionId, children, ...props }) {
  const handleClick = (event) => {
    event.preventDefault()
    const section = document.getElementById(sectionId)

    if (!section) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    section.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    window.history.pushState(null, '', `#${sectionId}`)
  }

  return (
    <Button href={`#${sectionId}`} onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}

export default ScrollLink
