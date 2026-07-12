import { FiCheck } from 'react-icons/fi'
import Badge from './Badge.jsx'
import Card from './Card.jsx'
import ProjectImage from './ProjectImage.jsx'
import ProjectLinks from './ProjectLinks.jsx'

function ProjectCard({ project }) {
  return (
    <Card hover className="group flex h-full flex-col p-4 sm:p-5">
      <ProjectImage project={project} compact />
      <div className="flex flex-1 flex-col px-1 pt-5 pb-1">
        <div>
          <Badge>{project.type}</Badge>
          <h3 className="mt-3 text-xl font-semibold text-foreground">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
        </div>

        <ul className="mt-5 space-y-2" aria-label={`${project.title} features`}>
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm leading-6 text-foreground-secondary">
              <FiCheck className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Badge variant="primary">{technology}</Badge>
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} compact />
      </div>
    </Card>
  )
}

export default ProjectCard
