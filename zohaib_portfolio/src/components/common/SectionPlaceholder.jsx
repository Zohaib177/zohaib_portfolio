import SectionHeading from './SectionHeading.jsx'
import SectionWrapper from '../layout/SectionWrapper.jsx'

function SectionPlaceholder({ id, title, description, headingLevel = 'h2' }) {
  return (
    <SectionWrapper id={id} ariaLabelledBy={`${id}-heading`}>
      <SectionHeading
        id={`${id}-heading`}
        title={title}
        description={description}
        headingLevel={headingLevel}
      />
    </SectionWrapper>
  )
}

export default SectionPlaceholder
