import { motion, useReducedMotion } from 'framer-motion'
import FeaturedProjectCard from '../common/FeaturedProjectCard.jsx'
import ProjectCard from '../common/ProjectCard.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import SectionWrapper from '../layout/SectionWrapper.jsx'
import { projectsData } from '../../data/projectsData.js'

function Projects() {
  const shouldReduceMotion = useReducedMotion()
  const featuredProjects = projectsData.filter((project) => project.featured)
  const additionalProjects = projectsData.filter((project) => !project.featured)
  const hidden = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
  const visible = { opacity: 1, y: 0 }
  const viewport = { once: true, amount: 0.12 }
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.55,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <SectionWrapper
      id="projects"
      ariaLabelledBy="projects-heading"
      className="section-divider bg-background-secondary/35"
    >
      <motion.div initial={hidden} whileInView={visible} viewport={viewport} transition={transition}>
        <SectionHeading
          id="projects-heading"
          eyebrow="Featured Work"
          title="Projects Built to Solve Practical Problems"
          description="A selection of web, mobile and software projects demonstrating my work with frontend development, backend APIs, databases and problem-solving."
        />
      </motion.div>

      <div className="mt-12 space-y-6 lg:space-y-8">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={hidden}
            whileInView={visible}
            viewport={viewport}
            transition={{
              ...transition,
              delay: shouldReduceMotion ? 0 : Math.min(index * 0.07, 0.14),
            }}
          >
            <FeaturedProjectCard project={project} reverse={index % 2 === 1} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={hidden}
        whileInView={visible}
        viewport={viewport}
        transition={transition}
        className="mt-16 flex items-end justify-between gap-6"
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">More Work</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">Additional Projects</h2>
        </div>
        <p className="hidden max-w-md text-right text-sm text-muted md:block">
          Mobile, console and frontend projects built while developing practical skills.
        </p>
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
              delayChildren: shouldReduceMotion ? 0 : 0.08,
            },
          },
        }}
        className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {additionalProjects.map((project) => (
          <motion.div key={project.id} variants={{ hidden, visible }} transition={transition}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

export default Projects
