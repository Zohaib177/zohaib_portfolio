const variantClasses = {
  default: 'border-border-subtle bg-white/5 text-foreground-secondary',
  primary: 'border-blue-400/20 bg-blue-500/10 text-blue-300',
  success: 'border-green-400/20 bg-green-500/10 text-green-300',
}

function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
