function FormField({
  id,
  label,
  error,
  as = 'input',
  className = '',
  ...fieldProps
}) {
  const Field = as
  const errorId = `${id}-error`

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground-secondary">
        {label}
      </label>
      <Field
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`focus-ring w-full rounded-control border bg-background-secondary/80 px-4 py-3 text-sm text-foreground outline-none transition-[border-color,background-color] duration-200 placeholder:text-muted/70 focus:bg-background-secondary ${
          as === 'textarea' ? 'min-h-36 resize-y' : 'min-h-12'
        } ${error ? 'border-error' : 'border-border-subtle focus:border-accent'}`}
        {...fieldProps}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-red-300">
          <span className="sr-only">Error: </span>
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
