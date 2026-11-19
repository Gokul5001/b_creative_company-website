import './Why.css'
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

        <Reveal className="ach">
          <div className="ach__head">
            <h3>Great achievement</h3>
            <p>Your brand is in experienced hands</p>
          </div>
          <div className="ach__grid">
            {achievements.map((a) => (
              <div className="ach__item" key={a.year}>
                <div className="ach__card">
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
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}