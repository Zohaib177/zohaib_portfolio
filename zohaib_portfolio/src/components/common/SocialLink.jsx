function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="focus-ring flex size-10 items-center justify-center rounded-control border border-border-subtle text-lg text-muted transition-[color,border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-hover hover:bg-white/5 hover:text-accent"
    >
      <span aria-hidden="true">{icon}</span>
    </a>
  )
}

export default SocialLink
