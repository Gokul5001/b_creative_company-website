import { useEffect, useState } from 'react'
import './Hero.css'
import { stats } from '../data/site'
import abeer from '../assets/abeer.jpeg'
import albaik from '../assets/albaik.jpeg'
import cityUniversity from '../assets/city_university.jpeg'
import creativeSolutions from '../assets/creative_solutions.jpeg'
import hyundai from '../assets/hyundai.jpeg'
import khanBuilders from '../assets/khanbuilders.jpeg'
import markhar from '../assets/markhar.jpeg'
import nadec from '../assets/nadec.jpeg'
import saif from '../assets/saif.jpeg'

const clients = [
  { name: 'Albaik', logo: albaik },
  { name: 'Hyundai', logo: hyundai },
  { name: 'NADEC', logo: nadec },
  { name: 'Abeer Medical Group', logo: abeer },
  { name: 'City University', logo: cityUniversity },
  { name: 'Khan Builders', logo: khanBuilders },
  { name: 'Markhar', logo: markhar },
  { name: 'Saif', logo: saif },
  { name: 'Creative Solutions', logo: creativeSolutions },
]
import heroImage from '../assets/Developer Skills Robot Mascot Infographic.png'

const arrow = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

const titleBrand = 'B-CREATIVE NETWORK AGENCY'
const titlePost = ' is a dynamic creative agency proudly based in Saudi Arabia and Pakistan.'
const titleFull = titleBrand + titlePost
const TITLE_SPEED = 40
const TITLE_START = 500
const leadText = 'We are committed to combining innovation, strategy, and technology to help businesses build a powerful online presence. Trusted by clients across both regions, we focus on creativity, quality, and long-term growth.'

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useTyping(total, speed = 22, startDelay = 700) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (reduceMotion()) { setCount(total); return }
    let i = 0
    let timer
    const tick = () => {
      i += 1
      setCount(i)
      if (i < total) timer = setTimeout(tick, speed)
    }
    timer = setTimeout(tick, startDelay)
    return () => clearTimeout(timer)
  }, [total, speed, startDelay])
  return count
}

export default function Hero() {
  const typedTitle = useTyping(titleFull.length, TITLE_SPEED, TITLE_START)
  const titleDone = typedTitle >= titleFull.length
  const typed = useTyping(leadText.length, 16, TITLE_START + titleFull.length * TITLE_SPEED + 300)
  const done = typed >= leadText.length

  const brandShown = Math.min(typedTitle, titleBrand.length)
  const postShown = Math.max(0, typedTitle - titleBrand.length)
  const caretInBrand = typedTitle <= titleBrand.length
  const caret = !titleDone && <span className="hero__caret" />
  return (
    <section id="top" className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__in" style={{ '--d': '0.05s' }}>Advertising &amp; IT agency</p>
          <h1 className="hero__title hero__in" style={{ '--d': '0.15s' }} aria-label={titleFull}>
            <span aria-hidden="true">
              <em>
                {titleBrand.slice(0, brandShown)}
                {caretInBrand && caret}
                <span className="hero__ghost">{titleBrand.slice(brandShown)}</span>
              </em>
              {titlePost.slice(0, postShown)}
              {!caretInBrand && caret}
              <span className="hero__ghost">{titlePost.slice(postShown)}</span>
            </span>
          </h1>
          <p className="lead hero__in" style={{ '--d': '0.3s' }} aria-label={leadText}>
            <span aria-hidden="true">
              {leadText.slice(0, typed)}
              {titleDone && !done && <span className="hero__caret hero__caret--sm" />}
              <span className="hero__ghost">{leadText.slice(typed)}</span>
            </span>
          </p>
          <div className="hero__cta hero__in" style={{ '--d': '0.45s' }}>
            <a href="#contact" className="btn btn--dark">Get a Quote {arrow}</a>
            <a href="#work" className="btn btn--ghost">See our work</a>
          </div>
        </div>

        <div className="hero__visual hero__in" style={{ '--d': '0.25s' }}>
          <img
            className="hero__art"
            src={heroImage}
            alt="B-Creative services: AI video editing, application development, video editing, graphic designing, website development and digital marketing"
          />

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
              {[...clients, ...clients].map((c, i) => (
                <span key={i} className="hero__logo" aria-hidden={i >= clients.length || undefined}>
                  <img src={c.logo} alt={c.name} height="48" loading="lazy" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}