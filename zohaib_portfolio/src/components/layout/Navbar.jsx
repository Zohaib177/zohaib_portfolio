import Container from './Container.jsx'

function Navbar() {
  return (
    <header className="border-b border-border-subtle bg-background/80">
      <Container>
        <nav className="py-4" aria-label="Primary navigation">
          <p className="font-heading text-lg font-semibold">Navbar</p>
        </nav>
      </Container>
    </header>
  )
}

export default Navbar
