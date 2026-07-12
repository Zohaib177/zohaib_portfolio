import { useState } from 'react'
import { FiCode, FiMonitor, FiSmartphone, FiTerminal } from 'react-icons/fi'

const categoryIcons = {
  mobile: FiSmartphone,
  software: FiTerminal,
  web: FiMonitor,
}

function ProjectImage({ project, compact = false }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (project.image && !imageFailed) {
    return (
      <div className="overflow-hidden rounded-card border border-border-subtle">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          onError={() => setImageFailed(true)}
          width="800"
          height={compact ? '500' : '550'}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${
            compact ? 'aspect-[16/10]' : 'aspect-[16/11]'
          }`}
        />
      </div>
    )
  }

  const Icon = categoryIcons[project.category] ?? FiCode

  return (
    <div
      role="img"
      aria-label={`${project.title} ${imageFailed ? 'preview unavailable' : 'preview coming soon'}`}
      className={`background-grid professional-border flex w-full flex-col items-center justify-center rounded-card bg-background-secondary/80 text-center ${
        compact ? 'aspect-[16/10]' : 'aspect-[16/11]'
      }`}
    >
      <span className="flex size-14 items-center justify-center rounded-card border border-border-subtle bg-card text-2xl text-accent shadow-card">
        <Icon aria-hidden="true" />
      </span>
      <span className="mt-4 px-4 text-xs font-medium tracking-wide text-muted uppercase">
        {imageFailed ? 'Preview unavailable' : 'Project preview coming soon'}
      </span>
    </div>
  )
}

export default ProjectImage
