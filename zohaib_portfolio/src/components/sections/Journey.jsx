import { motion, useReducedMotion } from 'framer-motion'
import { FiExternalLink, FiTrendingUp } from 'react-icons/fi'
import Badge from '../common/Badge.jsx'
import Button from '../common/Button.jsx'
import Card from '../common/Card.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import TimelineItem from '../common/TimelineItem.jsx'
import SectionWrapper from '../layout/SectionWrapper.jsx'
import { careerDirection, journeyData } from '../../data/journeyData.js'
import { personalData } from '../../data/personalData.js'

function Journey() {
  const shouldReduceMotion = useReducedMotion()
  const hidden = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
  const visible = { opacity: 1, y: 0 }
  const viewport = { once: true, amount: 0.1 }
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.52,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <SectionWrapper id="journey" ariaLabelledBy="journey-heading" className="section-divider">
      <motion.div initial={hidden} whileInView={visible} viewport={viewport} transition={transition}>
        <SectionHeading
          id="journey-heading"
          eyebrow="My Journey"
          title="Learning, Building and Growing Through Technology"
          description="A timeline of my education, technical development, practical projects and career direction as a BS Data Science student."
        />
      </motion.div>

      <div className="relative mt-12">
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: 'easeOut' }}
          className="absolute top-5 bottom-7 left-5 w-px origin-top bg-border-subtle md:left-[10.25rem]"
        />

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
                delayChildren: shouldReduceMotion ? 0 : 0.08,
              },
            },
          }}
          aria-label="Education and technical learning journey"
        >
          {journeyData.map((item) => (
            <TimelineItem
              key={item.id}
              item={item}
              animationProps={{ variants: { hidden, visible }, transition }}
            />
          ))}
        </motion.ol>
      </div>

      <motion.div
        initial={hidden}
        whileInView={visible}
        viewport={viewport}
        transition={transition}
        className="mt-5 md:ml-[11.5rem]"
      >
        <Card className="border-border-hover bg-card-elevated">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="flex size-11 items-center justify-center rounded-control bg-accent/10 text-xl text-accent">
                <FiTrendingUp aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-foreground">{careerDirection.title}</h2>
              <p className="mt-3 leading-7 text-muted">{careerDirection.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Career direction focus areas">
                {careerDirection.focusAreas.map((area) => (
                  <li key={area}>
                    <Badge variant="primary">{area}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            {personalData.resumePath && (
              <Button
                href={personalData.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="small"
                rightIcon={<FiExternalLink />}
                className="shrink-0 self-start lg:self-center"
              >
                View Resume
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </SectionWrapper>
  )
}

export default Journey
