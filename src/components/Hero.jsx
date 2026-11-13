import './Hero.css'
import { clients, stats } from '../data/site'
import markDark from '../assets/logo-mark.png'
import heroArt from '../assets/Corporate Analytics Meeting.png'

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

        <div className="hero__visual hero__in" style={{ '--d': '0.25s' }}>
          <img
            className="hero__art"
            src={heroArt}
            alt="Team reviewing analytics and marketing performance charts"
            width="1254"
            height="1254"
            fetchPriority="high"
          />

          <div className="hero__badge" aria-hidden="true"><img src={markDark} alt="" /></div>

          <div className="hero__stats">
            <div><b>{stats[0].n}{stats[0].suffix}</b><span>{stats[0].label}</span></div>
            <i></i>
            <div><b>{stats[1].n}{stats[1].suffix}</b><span>{stats[1].label}</span></div>
          </div>
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