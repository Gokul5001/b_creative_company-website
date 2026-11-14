import './About.css'
import { founder, team, offices } from '../data/site'
import { Reveal } from '../Reveal'
import { Call, Mail, Pin } from './Icons'
import founderPhoto from '../assets/Professional Passport Portrait.png'
import muhammadPhoto from '../assets/Muhammad.jpeg'
import himraPhoto from '../assets/Himra.jpeg'
import nabeelaPhoto from '../assets/Nabeela.jpeg'
import meerabPhoto from '../assets/MeerabSaleem.png'
import palwashaPhoto from '../assets/Palwasha Khan.jpeg'
import zubariaPhoto from '../assets/Zubaria.png'

// Team photos kept directly in src/assets, matched to the member ids in data/site.js.
const memberPhotos = { 'bilal-mustafa': muhammadPhoto, himra: himraPhoto, nabeela: nabeelaPhoto, meerab: meerabPhoto, palwasha: palwashaPhoto, zubaria: zubariaPhoto }

// Drop a photo in src/assets/team named after the member id (e.g. palwasha.jpg) and it is used automatically.
const photos = import.meta.glob('../assets/team/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
const photoFor = (id) => Object.entries(photos).find(([k]) => k.split('/').pop().split('.')[0] === id)?.[1]
const initials = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('')

function Avatar({ id, name, size = 'md', photo }) {
  const src = photo || photoFor(id)
  return (
    <span className={`avatar avatar--${size}`}>
      {src ? <img src={src} alt={name} /> : <span aria-hidden="true">{initials(name)}</span>}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <p className="eyebrow">About us</p>
          <h2 className="title">A team that merges <em>creativity</em> with technology</h2>
        </Reveal>

        <Reveal className="founder">
          <div className="founder__who">
            <Avatar id={founder.id} name={founder.name} size="lg" photo={founderPhoto} />
            <h3>{founder.name}</h3>
            <p>{founder.role}</p>
          </div>
          <div className="founder__bio">
            <span className="founder__rule" aria-hidden="true"></span>
            <p>{founder.bio}</p>
          </div>
        </Reveal>

        <Reveal className="sec-head sec-head--center team__head">
          <p className="eyebrow">Our team</p>
          <h3 className="title title--sm">The people behind your brand</h3>
        </Reveal>

        <div className="team">
          {team.map((m, i) => (
            <Reveal as="article" className="member" key={m.id} delay={(i % 2) * 0.1}>
              <Avatar id={m.id} name={m.name} photo={memberPhotos[m.id]} />
              <div className="member__body">
                <h4>{m.name}</h4>
                <p className="member__role">{m.role}</p>
                <ul>
                  {m.phone && <li><Call width="17" height="17" /><a href={`tel:${m.phone.replace(/\s/g, '')}`}>{m.phone}</a></li>}
                  <li><Mail width="17" height="17" /><a href={`mailto:${m.email}`}>{m.email}</a></li>
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="offices">
          {offices.map((o) => (
            <div key={o}><Pin width="22" height="22" /><span>{o}</span></div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}