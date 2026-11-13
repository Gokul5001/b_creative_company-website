import './Hero.css'
import { clients } from '../data/site'

const arrow = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__in" style={{ '--d': '0.05s' }}>Advertising &amp; IT agency</p>
          <h1 className="hero__title hero__in" style={{ '--d': '0.15s' }}>
            Creative <em>branding</em> and technology for businesses in Saudi Arabia and Pakistan.
          </h1>
          <p className="lead hero__in" style={{ '--d': '0.3s' }}>
            We combine innovation, strategy and technology to help businesses build a powerful online presence, and we stay with you as you grow.
          </p>
          <div className="hero__cta hero__in" style={{ '--d': '0.45s' }}>
            <a href="#contact" className="btn btn--dark">Get a Quote {arrow}</a>
            <a href="#work" className="btn btn--ghost">See our work</a>
          </div>
        </div>

        <div className="hero__visual hero__in" style={{ '--d': '0.25s' }} aria-hidden="true">
          <div className="hero__disc">
            <svg className="hero__ring" viewBox="0 0 400 400">
              <defs><path id="ringPath" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" /></defs>
              <text>
                <textPath href="#ringPath" startOffset="0">SAUDI ARABIA · PAKISTAN · BRANDING · WEB · APPS · MARKETING · </textPath>
              </text>
            </svg>
            <span className="hero__b">B</span>
          </div>
          <div className="hero__chip hero__chip--a"><b>50+</b><span>Projects delivered</span></div>
          <div className="hero__chip hero__chip--b"><b>30+</b><span>Happy clients</span></div>
        </div>
      </div>

      <div className="wrap">
        <div className="hero__clients">
          <p>Work delivered for</p>
          <div className="hero__marquee">
            <div className="hero__run">
              {[...clients, ...clients].map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
