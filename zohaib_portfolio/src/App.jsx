import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import About from './components/sections/About.jsx'
import Contact from './components/sections/Contact.jsx'
import Hero from './components/sections/Hero.jsx'
import Journey from './components/sections/Journey.jsx'
import Projects from './components/sections/Projects.jsx'
import Skills from './components/sections/Skills.jsx'

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="focus-ring fixed top-3 left-3 z-[100] -translate-y-24 rounded-control bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex="-1" className="pt-[72px] outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
