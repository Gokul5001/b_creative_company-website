import { useEffect, useMemo, useState } from 'react'
import './Work.css'
import { projects } from '../data/site'
import { Reveal } from '../Reveal'
import { Close } from './Icons'

// every webp in src/assets/work, keyed by file name without extension
const files = import.meta.glob('../assets/work/*.webp', { eager: true, query: '?url', import: 'default' })
const img = (name) => files[`../assets/work/${name}.webp`]

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

export default function Work() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const list = useMemo(() => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)), [cat])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <section id="work" className="section work">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Our work</p>
          <h2 className="title">Projects we are <em>proud of</em></h2>
        </Reveal>

        <div className="work__filters" role="tablist" aria-label="Filter projects">
          {categories.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'is-on' : ''} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div className="work__grid">
          {list.map((p) => (
            <button key={p.id} className="card" onClick={() => setOpen(p)} aria-label={`View ${p.title}`}>
              <img src={img(p.image)} alt={p.title} loading="lazy" />
              <span className="card__shade" aria-hidden="true"></span>
              <span className="card__meta">
                <small>{p.category}</small>
                <b>{p.title}</b>
              </span>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <button className="lightbox__x" aria-label="Close" onClick={() => setOpen(null)}><Close /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={img(open.image)} alt={open.title} />
            <figcaption><small>{open.category}</small>{open.title}</figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
