import './Why.css'
import { useEffect, useRef, useState } from 'react'
import { achievements, stats } from '../data/site'
import { Reveal } from '../Reveal'
import { useInView, useCount } from '../hooks'

function Stat({ n, suffix, label, run }) {
  const v = useCount(n, run)
  return (
    <div className="stat">
      <b>{v}{suffix}</b>
      <span>{label}</span>
    </div>
  )
}

export default function Why() {
  const [ref, seen] = useInView()
  const sequenceRef = useRef(null)
  const calendarRef = useRef(null)
  const [turned, setTurned] = useState(false)

  useEffect(() => {
    let frame
    const updatePage = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const sequence = sequenceRef.current
        const calendar = calendarRef.current
        if (!sequence || !calendar) return
        const travel = sequence.offsetHeight - calendar.offsetHeight
        const stickyTop = parseFloat(window.getComputedStyle(calendar).top) || 0
        const progress = travel > 0
          ? Math.max(0, Math.min(1, (stickyTop - sequence.getBoundingClientRect().top) / travel))
          : 0
        setTurned(progress >= 0.5)
      })
    }

    updatePage()
    window.addEventListener('scroll', updatePage, { passive: true })
    window.addEventListener('resize', updatePage)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updatePage)
      window.removeEventListener('resize', updatePage)
    }
  }, [])

  return (
    <section id="why" className="section why">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <p className="eyebrow">Why us</p>
          <h2 className="title">Why businesses choose <em>B-Creative</em></h2>
        </Reveal>

        <Reveal className="stats" >
          <div ref={ref} className="stats__in">
            {stats.map((s) => <Stat key={s.label} {...s} run={seen} />)}
          </div>
        </Reveal>

        <div ref={sequenceRef} className="ach__sequence">
          <section ref={calendarRef} className={`ach ${turned ? 'ach--turned' : ''}`} aria-label="Yearly achievements">
            <div className="ach__head">
              <h3>Great achievement</h3>
              <p>Your brand is in experienced hands</p>
            </div>
            <div className="ach__book">
              {achievements.map((a, index) => (
                <article
                  className={`ach__page ach__page--${index === 0 ? 'current' : 'next'}`}
                  key={a.year}
                  aria-hidden={index === 0 ? turned : !turned}
                >
                  <div className="ach__binding" aria-hidden="true" />
                  <div className="ach__date">
                    <small>ACHIEVEMENTS</small>
                    <strong>{a.year}</strong>
                    <span>YEAR IN REVIEW</span>
                  </div>
                  <div className="ach__copy">
                    <span className="ach__copy-label">A year of meaningful partnerships</span>
                    <p>
                      We&rsquo;re proud to provide {a.lead.toLowerCase()}{' '}
                      {a.names.map((n, i) => (
                        <span key={n}>
                          <strong>{n}</strong>{i < a.names.length - 2 ? ', ' : i === a.names.length - 2 ? ' and ' : ''}
                        </span>
                      ))}
                      {a.tail ? <> {a.tail}</> : '.'}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <div className="ach__footer" aria-live="polite">
              <span>SCROLL TO TURN THE PAGE</span>
              <span>{turned ? `${achievements[1]?.year} · 02 / ${String(achievements.length).padStart(2, '0')}` : `${achievements[0]?.year} · 01 / ${String(achievements.length).padStart(2, '0')}`}</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}