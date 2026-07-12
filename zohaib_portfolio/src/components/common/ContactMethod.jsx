function ContactMethod({ icon, label, text, href, external = false, unavailableText }) {
  const content = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-accent/10 text-lg text-accent">
        <span aria-hidden="true">{icon}</span>
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold tracking-wide text-muted uppercase">{label}</span>
        <span className="mt-0.5 block break-words text-sm font-medium text-foreground-secondary">
          {href ? text : unavailableText}
        </span>
      </span>
    </>
  )

  if (!href) {
    return <div className="flex items-center gap-3 rounded-control border border-border-subtle p-3">{content}</div>
  }

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={`${label}: ${text}`}
      className="focus-ring flex items-center gap-3 rounded-control border border-border-subtle p-3 transition-[border-color,background-color] duration-200 hover:border-border-hover hover:bg-white/5"
    >
      {content}
    </a>
  )
}

export default ContactMethod
