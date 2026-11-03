import Seo from '../components/Seo'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Work from '../components/Work'
import WhyCheaper from '../components/WhyCheaper'
import Services from '../components/Services'
import Estimator from '../components/Estimator'
import Process from '../components/Process'
import Toolbox from '../components/Toolbox'
import Experience from '../components/Experience'
import Faq from '../components/Faq'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main>
      <Seo
        title="Pragnesh Kalotara · Freelance web, mobile & desktop developer"
        description="Freelance full-stack developer in Ahmedabad. I build web apps, SaaS, Android apps and desktop software from a home studio, AI-assisted, so you pay far less than an agency."
        path="/"
      />
      <Hero />
      <Marquee />
      <Work />
      <WhyCheaper />
      <Services />
      <Estimator />
      <Process />
      <Toolbox />
      <Experience />
      <Faq />
      <Contact />
    </main>
  )
}
