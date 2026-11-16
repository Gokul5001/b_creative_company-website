import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './Work.css'
import { projects, designs, websites } from '../data/site'
import { Reveal } from '../Reveal'
import { useInView } from '../hooks'
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
  const key = p.video.toLowerCase()
  return Object.entries(videoFiles).find(([name]) => name.toLowerCase().includes(key))?.[1]
}

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

const Arrow = ({ dir }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
)

// heading that types itself out the first time it scrolls into view (text is reserved up front so layout never jumps)
function TypedHeading({ text, accent, as: Tag = 'h2', className = '' }) {
  const cut = text.indexOf(accent) // everything from here on is orange
  const [ref, seen] = useInView()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(text.length); return undefined }
    let i = 0
    let t
    const tick = () => { i += 1; setN(i); if (i < text.length) t = setTimeout(tick, 45) }
    t = setTimeout(tick, 250)
    return () => clearTimeout(t)
  }, [seen, text])
  return (
    <Tag ref={ref} className={`wk__typed ${className}`} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, Math.min(n, cut))}
        {n > cut && <em>{text.slice(cut, n)}</em>}
        {n < text.length && <i className="wk__caret" />}
      </span>
      <span className="wk__ghost" aria-hidden="true">{text}</span>
    </Tag>
  )
}

const host = (u) => new URL(u).hostname.replace(/^www\./, '')

const Play = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
)

function VideoMedia({ title, src, poster, playing, onPlay, onStop, onMeta }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (playing) {
      v.muted = false
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [playing])
  return (
    <>
      <video ref={ref} src={`${src}#t=0.1`} poster={poster} preload="metadata" playsInline controls={playing} onEnded={onStop} onLoadedMetadata={(e) => onMeta(e.currentTarget.videoWidth / e.currentTarget.videoHeight)} aria-label={title} />
      {!playing && (
        <button className="wk__playbtn" onClick={onPlay} aria-label={`Play ${title}`}>
          <Play size={26} />
        </button>
      )}
    </>
  )
}

export default function Work() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const [playing, setPlaying] = useState(null)
  const [ratios, setRatios] = useState({}) // real width / height of each video, read from the file
  const list = useMemo(() => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)), [cat])

  // horizontal row: arrows only appear when there is more to scroll to
  const rowRef = useRef(null)
  const [edge, setEdge] = useState({ left: false, right: false })
  const measure = useCallback(() => {
    const el = rowRef.current
    if (!el) return
    setEdge({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 })
  }, [])
  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure, list, ratios])
  const slide = (dir) => {
    const el = rowRef.current
    const card = el?.querySelector('.wk__card')
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' })
  }

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
        <p className="eyebrow">Our work</p>
        <TypedHeading text="AI VIDEO EDITING & FILMMAKING PROJECTS" accent="FILMMAKING" />

        {projects.length > 4 && categories.length > 2 && (
          <div className="work__filters" role="tablist" aria-label="Filter projects">
            {categories.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'is-on' : ''} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        )}

        <div className="wk" role="region" aria-label="Projects">
          <div className="wk__frame">
            <div className="wk__row" ref={rowRef} onScroll={measure}>
              {list.map((p) => {
                const video = videoFor(p)
                const ratio = ratios[p.id] || 9 / 16
                const wide = ratio > 1
                return (
                  <div key={p.id} className="wk__card">
                    <div
                      className={`wk__media ${playing === p.id ? 'is-playing' : ''}`}
                      style={{ '--ar': ratio, '--k': wide ? 0.62 : 1, '--wk': wide ? 1.45 : 1 }}
                    >
                      {video ? (
                        <VideoMedia
                          title={p.title}
                          src={video}
                          poster={img(p.image)}
                          playing={playing === p.id}
                          onPlay={() => setPlaying(p.id)}
                          onStop={() => setPlaying(null)}
                          onMeta={(r) => r && setRatios((m) => (m[p.id] === r ? m : { ...m, [p.id]: r }))}
                        />
                      ) : (
                        <button className="wk__imgbtn" onClick={() => setOpen(p)} aria-label={`View ${p.title}`}>
                          <img src={img(p.image)} alt={p.title} loading="lazy" draggable="false" />
                          <span className="wk__play"><Play />View project</span>
                        </button>
                      )}
                    </div>
                    <span className="wk__meta">
                      <small>{p.category}</small>
                      <b>{p.title}</b>
                    </span>
                  </div>
                )
              })}
            </div>

            {edge.left && <button className="wk__arrow wk__arrow--prev" onClick={() => slide(-1)} aria-label="Scroll to previous projects"><Arrow dir="left" /></button>}
            {edge.right && <button className="wk__arrow wk__arrow--next" onClick={() => slide(1)} aria-label="Scroll to next projects"><Arrow dir="right" /></button>}
          </div>
        </div>

        <Reveal className="gd">
          <p className="eyebrow">Our work</p>
          <TypedHeading text="GRAPHIC DESIGN PROJECTS" accent="DESIGN" />
          <div className="gd__frame">
            <div className="gd__grid">
              {designs.map((d) => (
                <div key={d.id} className="gd__card">
                  <button className="gd__media" onClick={() => setOpen(d)} aria-label={`View ${d.title}`}>
                    <img src={img(d.image)} alt={d.title} loading="lazy" draggable="false" />
                    <span className="wk__play"><Play />View design</span>
                  </button>
                  <span className="wk__meta"><small>{d.category}</small><b>{d.title}</b></span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="web">
          <p className="eyebrow">Our work</p>
          <TypedHeading text="WEBSITE DEVELOPMENT PROJECTS" accent="DEVELOPMENT" />
          <div className="web__grid">
            {websites.map((w) => (
              <a key={w.id} className="web__card" href={w.url} target="_blank" rel="noopener noreferrer" style={{ '--hue': w.hue }} aria-label={`Visit ${w.title} website`}>
                <div className="web__shot">
                  <div className="web__bar"><i /><i /><i /><span>{host(w.url)}</span></div>
                  <div className="web__view">
                    {img(w.image) ? <img src={img(w.image)} alt={`${w.title} website`} loading="lazy" draggable="false" /> : (
                      <div className="web__ph"><b>{w.title}</b><small>{host(w.url)}</small></div>
                    )}
                  </div>
                </div>
                <div className="web__info">
                  <span><small>{w.category}</small><b>{w.title}</b></span>
                  <span className="web__go" aria-hidden="true"><Arrow dir="right" /></span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
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