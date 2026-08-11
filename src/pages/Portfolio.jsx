import CustomCursor from '../components/ui/CustomCursor'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import CloudSpotlight from '../components/CloudSpotlight'
import AiConsultant from '../components/AiConsultant'
import Articles from '../components/Articles'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Portfolio() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <CloudSpotlight />
        <AiConsultant />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
