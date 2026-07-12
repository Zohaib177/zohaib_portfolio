import { FiCheck } from 'react-icons/fi'
import Badge from './Badge.jsx'
import ProjectImage from './ProjectImage.jsx'
import ProjectLinks from './ProjectLinks.jsx'

function FeaturedProjectCard({ project, reverse = false }) {
  return (
    <article
      className={`group professional-border card-hover-elevation overflow-hidden rounded-[1.25rem] shadow-card ${
        project.prominent ? 'bg-card-elevated' : 'bg-card'
      }`}
    >
      <div className="grid items-center lg:grid-cols-2">
        <div className={`p-4 sm:p-6 lg:p-8 ${reverse ? 'lg:order-2' : ''}`}>
          <ProjectImage project={project} />
        </div>
        <div className={`p-6 pt-2 sm:p-8 sm:pt-2 lg:p-10 ${reverse ? 'lg:order-1' : ''}`}>
          <Badge variant={project.prominent ? 'primary' : 'default'}>{project.type}</Badge>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 leading-7 text-muted">{project.description}</p>

          <ul className="mt-6 grid gap-x-5 gap-y-2.5 sm:grid-cols-2" aria-label={`${project.title} features`}>
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-sm leading-6 text-foreground-secondary">
                <FiCheck className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Badge>{technology}</Badge>
              </li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}

export default FeaturedProjectCard
