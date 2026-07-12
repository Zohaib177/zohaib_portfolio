import {
  FiBookOpen,
  FiCheck,
  FiCode,
  FiCompass,
  FiFolder,
  FiMonitor,
  FiSmartphone,
  FiTarget,
} from 'react-icons/fi'
import Badge from './Badge.jsx'
import Card from './Card.jsx'
import StatusBadge from './StatusBadge.jsx'

const timelineIcons = {
  code: FiCode,
  direction: FiCompass,
  education: FiBookOpen,
  focus: FiTarget,
  mobile: FiSmartphone,
  projects: FiFolder,
  web: FiMonitor,
}

function TimelineItem({ item, animationProps }) {
  const Icon = timelineIcons[item.icon] ?? FiCode
  const isCurrent = item.status === 'current'
  const isFuture = item.status === 'future'

  return (
    <motion.li
      {...animationProps}
      className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-start md:grid-cols-[9rem_2.5rem_minmax(0,1fr)]"
    >
      <p className="hidden pt-6 pr-5 text-right text-sm font-medium text-muted md:block">
        {item.period}
      </p>

      <div className="relative z-10 flex justify-center pt-5">
        <span
          className={`flex size-9 items-center justify-center rounded-full border bg-background-secondary text-sm ${
            isCurrent
              ? 'animate-pulse border-accent bg-accent text-white shadow-[0_0_0_5px_rgb(59_130_246/0.10)] motion-reduce:animate-none'
              : isFuture
                ? 'border-muted/45 text-muted'
                : 'border-blue-400/40 text-blue-300'
          }`}
        >
          {item.status === 'completed' ? (
            <FiCheck aria-hidden="true" />
          ) : (
            <Icon aria-hidden="true" />
          )}
        </span>
      </div>

      <Card
        hover
        className={`mb-7 ml-3 min-w-0 md:ml-5 ${
          isCurrent ? 'border-border-hover bg-blue-500/[0.06]' : isFuture ? 'bg-card/70' : ''
        }`}
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant={isCurrent ? 'primary' : 'default'}>{item.category}</Badge>
          <StatusBadge status={item.status} />
        </div>
        <p className="mt-4 text-xs font-semibold tracking-wide text-accent uppercase md:hidden">
          {item.period}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted sm:text-base">{item.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${item.title} topics`}>
          {item.tags.map((tag) => (
            <li key={tag}>
              <Badge variant={isCurrent ? 'primary' : 'default'}>{tag}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </motion.li>
  )
}

export default TimelineItem
import { motion } from 'framer-motion'
