import './Approach.css'
import { approach, benefits } from '../data/site'
import { Reveal } from '../Reveal'
import { Check } from './Icons'

export default function Approach() {
  return (
    <section id="approach" className="section approach">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <p className="eyebrow">Our approach</p>
          <h2 className="title">A structured approach, <em>measurable value</em></h2>
        </Reveal>

        <div className="ap__cols">
          <Reveal className="ap__card ap__card--light">
            <header className="ap__head">
              <span className="ap__tag">Process</span>
              <h3>Our Approach</h3>
              <p>Five clear stages, from the first conversation to long-term support.</p>
            </header>
            <ol className="tl">
              {approach.map((a, i) => (
                <li key={a.title} style={{ '--i': i }}>
                  <span className="tl__dot">{i + 1}</span>
                  <div className="tl__body">
                    <b>{a.title}</b>
                    <p>{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="ap__card ap__card--dark" delay={0.12}>
            <header className="ap__head">
              <span className="ap__tag">Value</span>
              <h3>Key Benefits</h3>
              <p>What you can expect when you work with B-Creative.</p>
            </header>
            <ul className="bn">
              {benefits.map((b, i) => (
                <li key={b.title} style={{ '--i': i }}>
                  <span className="bn__tick"><Check width="18" height="18" /></span>
                  <div>
                    <b>{b.title}</b>
                    <p>{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}