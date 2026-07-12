function SectionPlaceholder({ id, title }) {
  const headingId = `${id}-heading`

  return (
    <section id={id} className="section-spacing" aria-labelledby={headingId}>
      <div className="site-container">
        <h2 id={headingId} className="text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
      </div>
    </section>
  )
}

export default SectionPlaceholder
