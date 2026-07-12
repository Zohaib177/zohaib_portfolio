import { getSkillIcon } from '../../utils/skillIconMap.jsx'

function SkillBadge({ name, icon, featured = false, className = '' }) {
  const Icon = getSkillIcon(icon)

  return (
    <li
      className={`professional-border flex min-w-0 items-center gap-2.5 rounded-control bg-background-secondary/75 font-medium text-foreground-secondary transition-[border-color,background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-hover hover:bg-card-elevated hover:text-foreground ${
        featured ? 'min-h-14 px-4 py-3 text-sm sm:text-base' : 'min-h-11 px-3 py-2 text-sm'
      } ${className}`}
    >
      <Icon className={`${featured ? 'text-xl' : 'text-base'} shrink-0 text-accent`} aria-hidden="true" />
      <span className="min-w-0 break-words">{name}</span>
    </li>
  )
}

export default SkillBadge
