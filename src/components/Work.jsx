import { useEffect, useMemo, useState } from 'react'
import './Work.css'
import { projects } from '../data/site'
import { Reveal } from '../Reveal'
import { Close } from './Icons'

// project images: everything in src/assets/work plus loose images in src/assets, keyed by file name without extension
const found = {
  ...import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }),
  ...import.meta.glob('../assets/work/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }),
}
const files = Object.fromEntries(Object.entries(found).map(([k, v]) => [k.split('/').pop().replace(/\.[^.]+$/, ''), v]))
const img = (name) => files[name]

// project videos: loose .mp4 files in src/assets. Uses src/assets/<name>.mp4, or any mp4 whose file name contains the first word of the project name.
const videoFiles = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/*.mp4', { eager: true, query: '?url', import: 'default' }))
    .map(([k, v]) => [k.split('/').pop().replace(/\.mp4$/, ''), v]),
)
const videoFor = (p) => {
  if (!p.video) return undefined
  if (videoFiles[p.video]) return videoFiles[p.video]
  const key = p.video.split('-')[0].toLowerCase()
  return Object.entries(videoFiles).find(([k]) => k.toLowerCase().includes(key))?.[1]
}

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

const Arrow = ({ dir }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
)

export default function Work() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const list = useMemo(() => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)), [cat])

  const [idx, setIdx] = useState(0)
  const [touchX, setTouchX] = useState(null)
  const count = list.length
  const go = (d) => setIdx((i) => (i + d + count) % count)
  const pick = (c) => { setCat(c); setIdx(0) }

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

        {categories.length > 2 && (
        <div className="work__filters" role="tablist" aria-label="Filter projects">
          {categories.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'is-on' : ''} onClick={() => pick(c)}>{c}</button>
          ))}
        </div>
        )}

        <div
          className="slider"
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1) }}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return
            const dx = e.changedTouches[0].clientX - touchX
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            setTouchX(null)
          }}
        >
          <div className="slider__view">
            <div className="slider__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {list.map((p, i) => (
                <div className="slide" key={p.id} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`} aria-hidden={i !== idx || undefined}>
                  <span className="slide__bg" style={{ backgroundImage: `url(${img(p.image)})` }} aria-hidden="true"></span>
                  <button className="slide__img" onClick={() => setOpen(p)} aria-label={`View ${p.title}`} tabIndex={i === idx ? 0 : -1}>
                    {videoFor(p) ? (
                      <video src={videoFor(p)} poster={img(p.image)} autoPlay muted loop playsInline preload="auto" aria-label={p.title} />
                    ) : (
                      <img src={img(p.image)} alt={p.title} draggable="false" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {count > 1 && (
            <>
              <button className="slider__arrow slider__arrow--prev" onClick={() => go(-1)} aria-label="Previous project"><Arrow dir="left" /></button>
              <button className="slider__arrow slider__arrow--next" onClick={() => go(1)} aria-label="Next project"><Arrow dir="right" /></button>
            </>
          )}
        </div>

        {list[idx] && (
          <div className="slider__info" aria-live="polite">
            <div>
              <small>{list[idx].category}</small>
              <b>{list[idx].title}</b>
            </div>
            {count > 1 && <span className="slider__count">{String(idx + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>}
          </div>
        )}

        {count > 1 && <div className="slider__dots">
          {list.map((p, i) => (
            <button key={p.id} className={i === idx ? 'is-on' : ''} onClick={() => setIdx(i)} aria-label={`Go to ${p.title}`}></button>
          ))}
        </div>}
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <button className="lightbox__x" aria-label="Close" onClick={() => setOpen(null)}><Close /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            {videoFor(open) ? (
              <video src={videoFor(open)} poster={img(open.image)} controls autoPlay loop playsInline />
            ) : (
              <img src={img(open.image)} alt={open.title} />
            )}
            <figcaption><small>{open.category}</small>{open.title}</figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}