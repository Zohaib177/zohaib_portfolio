import Button from './Button.jsx'
import { scrollToSection } from '../../utils/scrollToSection.js'

function ScrollLink({ sectionId, children, ...props }) {
  const handleClick = (event) => {
    event.preventDefault()
    scrollToSection(sectionId)
  }

  return (
    <Button href={`#${sectionId}`} onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}

export default ScrollLink
