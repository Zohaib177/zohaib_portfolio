import Container from './Container.jsx'

function SectionWrapper({ id, children, className = '', ariaLabelledBy }) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${className}`}
      aria-labelledby={ariaLabelledBy}
    >
      <Container>{children}</Container>
    </section>
  )
}

export default SectionWrapper
