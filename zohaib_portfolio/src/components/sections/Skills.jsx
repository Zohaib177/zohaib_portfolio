import { motion, useReducedMotion } from 'framer-motion'
import Card from '../common/Card.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import SkillBadge from '../common/SkillBadge.jsx'
import SectionWrapper from '../layout/SectionWrapper.jsx'
import { coreSkills, skillsData } from '../../data/skillsData.js'
import { getSkillIcon } from '../../utils/skillIconMap.jsx'

const marqueeSkills = Array.from(
  new Map(
    [...coreSkills, ...skillsData.flatMap((category) => category.skills)].map((skill) => [
      skill.name,
      skill,
    ]),
  ).values(),
)

function MarqueeSkill({ skill }) {
  const Icon = getSkillIcon(skill.icon)

  return (
    <li className="flex shrink-0 items-center gap-3 text-base font-semibold text-foreground-secondary sm:text-lg">
      <Icon className="text-xl text-accent sm:text-2xl" aria-hidden="true" />
      <span>{skill.name}</span>
    </li>
  )
}

function Skills() {
  const shouldReduceMotion = useReducedMotion()
  const hidden = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
  const visible = { opacity: 1, y: 0 }
  const viewport = { once: true, amount: 0.15 }
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.52,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <SectionWrapper id="skills" ariaLabelledBy="skills-heading" className="section-divider">
      <motion.div
        initial={hidden}
        whileInView={visible}
        viewport={viewport}
        transition={transition}
      >
        <SectionHeading
          id="skills-heading"
          eyebrow="Technical Skills"
          title="Technologies I Use to Build Modern Applications"
          description="A structured overview of the programming languages, frameworks, backend tools and databases I use in software and data-focused projects."
        />
      </motion.div>

      <motion.div
        initial={hidden}
        whileInView={visible}
        viewport={viewport}
        transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
        className="professional-border mt-10 overflow-hidden rounded-card bg-card-elevated/80 py-6 shadow-card sm:py-7"
      >
        <div className="px-5 text-center sm:px-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase sm:text-sm">
            Technologies I Work With
          </p>
          <h3 className="sr-only">My technology stack</h3>
        </div>

        <div className="skill-marquee mt-7" role="region" aria-label="Scrolling technology skills">
          <div className="skill-marquee__track">
            <ul className="skill-marquee__list" aria-label="Technology skills">
              {marqueeSkills.map((skill) => (
                <MarqueeSkill key={`primary-${skill.name}`} skill={skill} />
              ))}
            </ul>
            <ul className="skill-marquee__list" aria-hidden="true">
              {marqueeSkills.map((skill) => (
                <MarqueeSkill key={`duplicate-${skill.name}`} skill={skill} />
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.08,
              delayChildren: shouldReduceMotion ? 0 : 0.12,
            },
          },
        }}
        className="mt-6 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {skillsData.map((category) => {
          const CategoryIcon = getSkillIcon(category.icon)

          return (
            <motion.div
              key={category.id}
              variants={{ hidden, visible }}
              transition={transition}
              className={category.id === 'tools' ? 'xl:col-span-2' : ''}
            >
              <Card hover className="flex h-full flex-col">
                <span className="flex size-11 items-center justify-center rounded-control bg-accent/10 text-xl text-accent">
                  <CategoryIcon aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{category.description}</p>
                <ul
                  className={`mt-5 grid gap-2.5 ${
                    category.id === 'tools' ? 'sm:grid-cols-2' : 'grid-cols-1 xs:grid-cols-2'
                  }`}
                  aria-label={`${category.title} skills`}
                >
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} {...skill} />
                  ))}
                </ul>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}

export default Skills
