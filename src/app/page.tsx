import About from "@/components/About";
import Awards from "@/components/Awards";
import Competitions from "@/components/Competitions";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import EmberField from "@/components/EmberField";
import Glowfield from "@/components/Glowfield";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Spotlight from "@/components/Spotlight";
import StatsStrip from "@/components/StatsStrip";
import Ticker from "@/components/Ticker";
import { CONTACT, GITHUB_USER } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Glowfield />
      <Spotlight />
      <EmberField />
      <div aria-hidden="true" className="hairgrid pointer-events-none fixed inset-[-10%] z-0" />
      <div aria-hidden="true" className="scanlines" />
      <div aria-hidden="true" className="grain" />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <StatsStrip />
        <About />
        <Ticker />
        <Education />
        <Skills />
        <Projects />
        <Competitions />
        <Research />
        <Awards />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-line py-9 text-[0.7rem] text-muted">
        <div className="shell flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Durjoy Saha · {CONTACT.location}</span>
          <span className="mono">next.js · static export · github pages</span>
          <a href={`https://github.com/${GITHUB_USER}`} className="hover:text-gold">
            source ↗
          </a>
        </div>
      </footer>
    </>
  );
}
