const statusStyles = {
  completed: 'border-blue-400/20 bg-blue-500/10 text-blue-300',
  current: 'border-blue-400/35 bg-blue-500/15 text-blue-200',
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
