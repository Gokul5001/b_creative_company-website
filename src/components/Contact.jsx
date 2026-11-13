import { useState } from 'react'
import './Contact.css'
import { brand, formServices } from '../data/site'
import { Reveal } from '../Reveal'
import { Call, Mail, Pin, WhatsApp } from './Icons'

const empty = { name: '', phone: '', service: formServices[0], message: '' }

export default function Contact() {
  const [f, setF] = useState(empty)
  const [err, setErr] = useState({})
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (f.name.trim().length < 2) next.name = 'Please enter your name.'
    if (f.phone.replace(/[^\d]/g, '').length < 7) next.phone = 'Please enter a valid phone number.'
    setErr(next)
    if (Object.keys(next).length) return

    const text = [
      'Hello B-Creative, I would like a quote.',
      `Name: ${f.name.trim()}`,
      `Phone: ${f.phone.trim()}`,
      `Service: ${f.service}`,
      f.message.trim() && `Project: ${f.message.trim()}`,
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <p className="eyebrow">Contact</p>
          <h2 className="title">Let&rsquo;s build <em>your brand</em></h2>
          <p className="lead">Tell us what you need. We reply fast.</p>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__info">
            <a className="info" href={`tel:${brand.phone}`}><span><Call /></span><div><small>Call or WhatsApp</small>{brand.phoneDisplay}</div></a>
            <a className="info" href={`mailto:${brand.email}`}><span><Mail /></span><div><small>Email</small>{brand.email}</div></a>
            <div className="info"><span><Pin /></span><div><small>Office</small>{brand.address}</div></div>
          </Reveal>

          <Reveal className="form-card" delay={0.1}>
            <form onSubmit={submit} noValidate>
              <label>
                <span>Your name</span>
                <input value={f.name} onChange={set('name')} placeholder="Full name" autoComplete="name" aria-invalid={!!err.name} />
                {err.name && <em role="alert">{err.name}</em>}
              </label>
              <label>
                <span>Phone number</span>
                <input value={f.phone} onChange={set('phone')} placeholder="+966 5X XXX XXXX" autoComplete="tel" inputMode="tel" aria-invalid={!!err.phone} />
                {err.phone && <em role="alert">{err.phone}</em>}
              </label>
              <label>
                <span>Service</span>
                <select value={f.service} onChange={set('service')}>
                  {formServices.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label>
                <span>About your project</span>
                <textarea rows="4" value={f.message} onChange={set('message')} placeholder="Tell us about your project"></textarea>
              </label>
              <button type="submit" className="btn btn--dark"><WhatsApp width="20" height="20" />Send on WhatsApp</button>
              <p className="form-note">Opens WhatsApp with your details filled in.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
