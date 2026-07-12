function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  headingLevel: Heading = 'h2',
}) {
  const isCentered = align === 'center'

  return (
    <div className={`max-w-3xl ${isCentered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-accent uppercase sm:text-sm">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.035em] text-foreground"
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 max-w-2xl text-[clamp(1rem,2vw,1.125rem)] text-foreground-secondary">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
