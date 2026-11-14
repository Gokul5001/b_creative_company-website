import './Why.css'
import { approach, benefits } from '../data/site'
import { Reveal } from '../Reveal'
import { Check } from './Icons'

export default function Approach() {
  return (
    <section id="approach" className="section approach">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <p className="eyebrow">Our approach</p>
          <h2 className="title">Our approach &amp; <em>benefits</em></h2>
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
      </div>
    </section>
  )
}
