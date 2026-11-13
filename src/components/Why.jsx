import './Why.css'
import { approach, benefits, achievements, stats } from '../data/site'
import { Reveal } from '../Reveal'
import { useInView, useCount } from '../hooks'
import { Check } from './Icons'

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
  return (
    <section id="why" className="section why">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <p className="eyebrow">Why us</p>
          <h2 className="title">Why businesses choose <em>B-Creative</em></h2>
        </Reveal>

        <div className="why__cols">
          <Reveal className="panel panel--light">
            <h3>Our approach</h3>
            <ol>
              {approach.map((a, i) => (
                <li key={a.title}>
                  <span className="step">0{i + 1}</span>
                  <div><b>{a.title}</b><p>{a.text}</p></div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="panel panel--dark" delay={0.1}>
            <h3>Benefits</h3>
            <ul>
              {benefits.map((b) => (
                <li key={b.title}>
                  <span className="tick"><Check width="18" height="18" /></span>
                  <div><b>{b.title}</b><p>{b.text}</p></div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="stats" >
          <div ref={ref} className="stats__in">
            {stats.map((s) => <Stat key={s.label} {...s} run={seen} />)}
          </div>
        </Reveal>

        <Reveal className="ach">
          <div className="ach__head">
            <h3>Great achievement</h3>
            <p>Your brand is in experienced hands</p>
          </div>
          <div className="ach__grid">
            {achievements.map((a) => (
              <div className="ach__item" key={a.year}>
                <div className="ach__year"><span>{a.year}</span><i></i></div>
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
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
