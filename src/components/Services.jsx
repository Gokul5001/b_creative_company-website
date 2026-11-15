import { useEffect, useState } from 'react'
import './Services.css'
import { services } from '../data/site'
import { Reveal } from '../Reveal'
import { Pen, Globe, Phone, Video, Share, Arrow, Check } from './Icons'

const icons = { graphic: Pen, web: Globe, app: Phone, video: Video, marketing: Share }
const INTERVAL = 6000
const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Services() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Rotate through the services automatically; hovering or focusing the section pauses it.
  useEffect(() => {
    if (paused || reduce()) return undefined
    const t = setTimeout(() => setActive((i) => (i + 1) % services.length), INTERVAL)
    return () => clearTimeout(t)
  }, [active, paused])

  const s = services[active]
  const Icon = icons[s.id]

  return (
    <section id="services" className="section services">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <p className="eyebrow">Our services</p>
          <h2 className="title">Integrated services for <em>sustained growth</em></h2>
          <p className="lead">A single partner for creative, technology and marketing, from brand identity to the website and the campaigns that support it.</p>
        </Reveal>

        <Reveal
          className="sv"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="sv__tabs" role="tablist" aria-label="Services" aria-orientation="vertical">
            {services.map((item, i) => {
              const TabIcon = icons[item.id]
              const on = i === active
              return (
                <button
                  key={item.id}
                  role="tab"
                  id={`sv-tab-${item.id}`}
                  aria-selected={on}
                  aria-controls="sv-panel"
                  className={`sv__tab ${on ? 'is-on' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span className="sv__tabnum">0{i + 1}</span>
                  <span className="sv__tabicon"><TabIcon width="22" height="22" /></span>
                  <span className="sv__tabtitle">{item.title}</span>
                  <span className="sv__tabarrow"><Arrow /></span>
                  {on && <i className={`sv__bar ${paused ? 'is-paused' : ''}`} style={{ '--ms': `${INTERVAL}ms` }} key={`${i}-${paused}`} aria-hidden="true"></i>}
                </button>
              )
            })}
          </div>

          <div className="sv__panel" role="tabpanel" id="sv-panel" aria-labelledby={`sv-tab-${s.id}`}>
            <span className="sv__glow" aria-hidden="true"></span>
            <div className="sv__content" key={s.id}>
              <span className="sv__bignum" aria-hidden="true">0{active + 1}</span>
              <span className="sv__icon"><Icon width="34" height="34" /></span>
              <h3 className="sv__title">{s.title}</h3>
              <p className="sv__text">{s.text}</p>
              <ul className="sv__points">
                {s.points.map((p, i) => (
                  <li key={p} style={{ '--i': i }}><span><Check width="16" height="16" /></span>{p}</li>
                ))}
              </ul>
              <a href="#contact" className="btn btn--orange sv__cta">Request a quote <Arrow /></a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}