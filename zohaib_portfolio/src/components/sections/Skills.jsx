import { motion, useReducedMotion } from 'framer-motion'
import Card from '../common/Card.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import SkillBadge from '../common/SkillBadge.jsx'
import SectionWrapper from '../layout/SectionWrapper.jsx'
import { coreSkills, skillsData } from '../../data/skillsData.js'
import { getSkillIcon } from '../../utils/skillIconMap.jsx'

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
        className="professional-border mt-10 rounded-card bg-card-elevated/80 p-5 shadow-card sm:p-6"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Selected Technologies</p>
            <h3 className="mt-1.5 text-xl font-semibold text-foreground sm:text-2xl">Core Stack</h3>
          </div>
          <p className="mt-2 text-sm text-muted sm:mt-0">A representative set of tools I currently work with.</p>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {coreSkills.map((skill) => (
            <SkillBadge key={skill.name} {...skill} featured />
          ))}
        </ul>
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
