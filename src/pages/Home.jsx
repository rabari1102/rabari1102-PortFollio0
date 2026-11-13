import Hero from '../components/Hero'
import Cred from '../components/Cred'
import SelectedWork from '../components/work/SelectedWork'
import ServicesTeaser from '../components/ServicesTeaser'
import Toolbox from '../components/Toolbox'
import Process from '../components/Process'
import AboutTeaser from '../components/AboutTeaser'
import Verify from '../components/Verify'
import Contact from '../components/Contact'
import Island from '../components/ui/Island'

// The home page tells one story, top to bottom:
// who I am → proof at a glance → the work → what I do → how I do it → who I am → why you can
// check all of it → how to start. Deeper detail lives on /work, /services, /about and /contact.
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Island>
        <Cred />
      </Island>
      <Island>
        <SelectedWork />
      </Island>
      <Island>
        <ServicesTeaser num="02" />
      </Island>
      <Island>
        <Toolbox num="03" />
      </Island>
      <Island>
        <Process num="04" />
      </Island>
      <Island>
        <AboutTeaser num="05" />
      </Island>
      <Island>
        <Verify num="06" />
      </Island>
      <Island>
        <Contact num="07" />
      </Island>
    </main>
  )
}
