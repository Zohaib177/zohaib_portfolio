function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`professional-border rounded-card bg-card p-6 shadow-card ${hover ? 'card-hover-elevation' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
