const variantClasses = {
  primary: 'bg-accent text-background hover:bg-accent-hover',
  secondary: 'bg-accent-secondary text-background hover:bg-accent-secondary-hover',
  outline: 'border border-border-subtle bg-transparent text-foreground hover:border-border-hover hover:bg-white/5',
  ghost: 'bg-transparent text-foreground-secondary hover:bg-white/5 hover:text-foreground',
}

const sizeClasses = {
  small: 'min-h-9 px-3.5 text-sm',
  medium: 'min-h-11 px-5 text-sm',
  large: 'min-h-12 px-6 text-base',
}

function Button({
  children,
  href,
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  const content = (
    <>
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </>
  )

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={`${classes} ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {content}
    </button>
  )
}

export default Button
