import './Services.css'
import { services } from '../data/site'
import { Reveal } from '../Reveal'
import { Pen, Globe, Phone, Share, Arrow, Check } from './Icons'

const icons = { graphic: Pen, web: Globe, app: Phone, marketing: Share }

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <p className="eyebrow">Services</p>
          <h2 className="title">Everything your brand needs to <em>grow online</em></h2>
          <p className="lead">IT and creative services under one roof, from the first logo to the finished website and the campaign behind it.</p>
        </Reveal>

        <div className="services__grid">
          {services.map((s, i) => {
            const Icon = icons[s.id]
            return (
              <Reveal as="article" className="svc" key={s.id} delay={(i % 2) * 0.1}>
                <span className="svc__num" aria-hidden="true">0{i + 1}</span>
                <span className="svc__icon"><Icon /></span>
                <h3 className="svc__title">{s.title}</h3>
                <p className="svc__text">{s.text}</p>
                <ul className="svc__points">
                  {s.points.map((p) => <li key={p}><Check width="16" height="16" />{p}</li>)}
                </ul>
                <a href="#contact" className="svc__link">Get a quote <Arrow /></a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
