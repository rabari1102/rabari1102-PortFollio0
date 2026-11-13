import Hero from '../components/Hero'
import Facts from '../components/home/Facts'
import Showcase from '../components/home/Showcase'
import Manifesto from '../components/home/Manifesto'
import ServiceRows from '../components/home/ServiceRows'
import Process from '../components/Process'
import Marquee from '../components/Marquee'
import Verify from '../components/Verify'
import Contact from '../components/Contact'
import Island from '../components/ui/Island'

// The home page reads like one issue of a magazine:
// the masthead → the numbers → the work → who I am → what I build and what it costs →
// how a project runs → the tools → how to check all of it → how to start.
// Deeper detail lives on /work, /services, /about and /contact.
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Island>
        <Facts />
      </Island>
      <Island>
        <Showcase />
      </Island>
      <Island>
        <Manifesto num="02" />
      </Island>
      <Island>
        <ServiceRows num="03" />
      </Island>
      <Island>
        <Process num="04" />
      </Island>
      <Island>
        <Marquee />
      </Island>
      <Island>
        <Verify num="05" />
      </Island>
      <Island>
        <Contact num="06" />
      </Island>
    </main>
  )
}
