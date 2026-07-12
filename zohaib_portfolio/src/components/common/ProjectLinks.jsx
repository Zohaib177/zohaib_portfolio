import { FiArrowUpRight, FiExternalLink, FiGithub } from 'react-icons/fi'
import Button from './Button.jsx'

function ProjectLinks({ project, compact = false }) {
  const hasLinks = project.githubUrl || project.liveUrl || project.caseStudyUrl

  if (!hasLinks) return null

  return (
    <div className={`flex flex-wrap gap-3 ${compact ? 'mt-5' : 'mt-7'}`}>
      {project.githubUrl && (
        <Button
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="small"
          leftIcon={<FiGithub />}
          aria-label={`View ${project.title} source code on GitHub`}
        >
          GitHub
        </Button>
      )}
      {project.liveUrl && (
        <Button
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="small"
          rightIcon={<FiExternalLink />}
          aria-label={`Open live demo of ${project.title}`}
        >
          Live Demo
        </Button>
      )}
      {project.caseStudyUrl && (
        <Button
          href={project.caseStudyUrl}
          variant="ghost"
          size="small"
          rightIcon={<FiArrowUpRight />}
        >
          Case Study
        </Button>
      )}
    </div>
  )
}

export default ProjectLinks
