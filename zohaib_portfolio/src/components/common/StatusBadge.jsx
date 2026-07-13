const statusStyles = {
  completed: 'border-accent/20 bg-accent/10 text-accent-hover',
  current: 'border-accent/35 bg-accent/15 text-accent-hover',
  future: 'border-border-subtle bg-white/5 text-muted',
}

const statusLabels = {
  completed: 'Completed milestone',
  current: 'Current',
  future: 'Future direction',
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide uppercase ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  )
}

export default StatusBadge
