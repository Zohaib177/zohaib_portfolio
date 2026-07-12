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
      <Navbar />
      <main id="main-content">
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
