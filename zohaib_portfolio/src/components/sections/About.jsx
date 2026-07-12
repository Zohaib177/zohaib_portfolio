import { motion, useReducedMotion } from 'framer-motion'
import {
  FiBookOpen,
  FiCheck,
  FiCode,
  FiDatabase,
  FiMapPin,
  FiSmartphone,
} from 'react-icons/fi'
import Badge from '../common/Badge.jsx'
import Card from '../common/Card.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import SectionWrapper from '../layout/SectionWrapper.jsx'
import { aboutData } from '../../data/aboutData.js'

const highlightIcons = [FiBookOpen, FiCode, FiSmartphone, FiDatabase]

function About() {
  const shouldReduceMotion = useReducedMotion()
  const hidden = shouldReduceMotion ? false : { opacity: 0, y: 18 }
  const visible = { opacity: 1, y: 0 }
  const viewport = { once: true, amount: 0.2 }
  const transition = (delay = 0) => ({
    duration: shouldReduceMotion ? 0 : 0.52,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  })

  return (
    <SectionWrapper
      id="about"
      ariaLabelledBy="about-heading"
      className="section-divider bg-background-secondary/35"
    >
      <motion.div
        initial={hidden}
        whileInView={visible}
        viewport={viewport}
        transition={transition()}
      >
        <SectionHeading
          id="about-heading"
          eyebrow={aboutData.eyebrow}
          title={aboutData.heading}
          description={aboutData.description}
        />
      </motion.div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 xl:gap-16">
        <motion.div
          initial={hidden}
          whileInView={visible}
          viewport={viewport}
          transition={transition(0.08)}
          className="min-w-0"
        >
          <div className="max-w-2xl space-y-5 text-base leading-8 text-foreground-secondary sm:text-lg">
            {aboutData.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.07,
                  delayChildren: shouldReduceMotion ? 0 : 0.16,
                },
              },
            }}
            className="mt-8 grid gap-3 sm:grid-cols-2"
            aria-label="Professional highlights"
          >
            {aboutData.highlights.map((highlight, index) => {
              const Icon = highlightIcons[index]
              return (
                <motion.li
                  key={highlight}
                  variants={{
                    hidden: shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 12 },
                    visible,
                  }}
                  className="professional-border flex min-h-16 items-center gap-3 rounded-control bg-card/55 px-4 py-3 text-sm font-medium text-foreground-secondary"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-accent/10 text-accent">
                    <Icon aria-hidden="true" />
                  </span>
                  {highlight}
                </motion.li>
              )
            })}
          </motion.ul>

          <motion.blockquote
            initial={hidden}
            whileInView={visible}
            viewport={viewport}
            transition={transition(0.2)}
            className="mt-8 border-l-2 border-accent/70 pl-5 text-sm leading-7 text-muted sm:text-base"
          >
            “{aboutData.statement}”
          </motion.blockquote>
        </motion.div>

        <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <motion.div
            initial={hidden}
            whileInView={visible}
            viewport={viewport}
            transition={transition(0.12)}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Card hover className="bg-card-elevated">
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-accent/10 text-xl text-accent">
                  <FiBookOpen aria-hidden="true" />
                </span>
                <Badge variant="success">{aboutData.education.status}</Badge>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">Education</h3>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-muted uppercase">Degree</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground-secondary">
                    {aboutData.education.degree}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-muted uppercase">Field</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground-secondary">
                    {aboutData.education.field}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-muted uppercase">University</dt>
                  <dd className="mt-1 text-sm italic text-muted">
                    {aboutData.education.university}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-muted uppercase">Location</dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground-secondary">
                    <FiMapPin className="text-accent" aria-hidden="true" />
                    {aboutData.education.location}
                  </dd>
                </div>
              </dl>
            </Card>
          </motion.div>

          <motion.div
            initial={hidden}
            whileInView={visible}
            viewport={viewport}
            transition={transition(0.18)}
          >
            <Card hover className="h-full">
              <h3 className="text-lg font-semibold text-foreground">Current Focus</h3>
              <ul className="mt-4 space-y-3">
                {aboutData.focusAreas.map((area) => (
                  <li key={area} className="flex gap-3 text-sm leading-6 text-foreground-secondary">
                    <FiCheck className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={hidden}
            whileInView={visible}
            viewport={viewport}
            transition={transition(0.24)}
          >
            <Card hover className="h-full">
              <h3 className="text-lg font-semibold text-foreground">How I Work</h3>
              <ul className="mt-4 space-y-3">
                {aboutData.approach.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-foreground-secondary">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About
