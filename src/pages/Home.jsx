import Seo from '../components/Seo'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Work from '../components/Work'
import Verify from '../components/Verify'
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
    <main id="main">
      <Seo
        title="Pragnesh Kalotara · Freelance web, mobile & desktop developer"
        description="Freelance full-stack developer in Ahmedabad. Web apps, SaaS, Android apps and desktop software from one senior engineer: fixed written quote, pay in three milestones, and the code is yours from day one."
        path="/"
      />
      <Hero />
      <Marquee />
      <Work />
      <Verify />
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
