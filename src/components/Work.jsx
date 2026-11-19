import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './Work.css'
import { projects, designs, websites, digitalMarketing, digitalMarketingPlatforms } from '../data/site'
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

// project galleries: every image inside a sub-folder of src/assets (e.g. src/assets/project_obhur/), sorted by file name so page-0001, page-0002 ... stay in order.
// A project picks its folder with `folder: 'project_obhur'` in data/site.js; without that, the first folder whose name contains a word of the project's id / title is used.
const galleries = {}
Object.entries(import.meta.glob('../assets/*/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .forEach(([k, v]) => {
    const folder = k.split('/').slice(-2, -1)[0]
    if (folder === 'work' || folder === 'team') return // thumbnails / team photos, not galleries
    ;(galleries[folder] ||= []).push(v)
  })
const galleryFor = (p) => {
  if (!p) return undefined
  if (p.folder) return galleries[p.folder]
  const words = `${p.id} ${p.title}`.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2)
  const hit = Object.keys(galleries).find((f) => words.some((w) => f.toLowerCase().includes(w)))
  return hit ? galleries[hit] : undefined
}

const categories = ['All',...Array.from(new Set(projects.map((p) => p.category)))]

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

// slideshow shown in the lightbox: slides auto-advance, arrows / dots / keyboard move manually, pauses on hover
function Gallery({ images, title }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = images.length
  const go = useCallback((d) => setI((x) => (x + d + n) % n), [n])

  useEffect(() => {
    if (paused || n < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const t = setInterval(() => setI((x) => (x + 1) % n), 2000)
    return () => clearInterval(t)
  }, [paused, n, i]) // `i` restarts the timer after a manual move

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <div className="gal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label={`${title} images`}>
      <div className="gal__view">
        <div className="gal__track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {images.map((src, k) => (
            <div key={src} className="gal__slide" aria-hidden={k !== i}>
              <img src={src} alt={`${title} ${k + 1} of ${n}`} loading={Math.abs(k - i) < 2 ? 'eager' : 'lazy'} draggable="false" />
            </div>
          ))}
        </div>
      </div>
      {n > 1 && (
        <>
          <button className="wk__arrow gal__arrow gal__arrow--prev" onClick={() => go(-1)} aria-label="Previous image"><Arrow dir="left" /></button>
          <button className="wk__arrow gal__arrow gal__arrow--next" onClick={() => go(1)} aria-label="Next image"><Arrow dir="right" /></button>
          <div className="gal__count">{i + 1} / {n}</div>
        </>
      )}
    </div>
  )
}

export default function Work() {
  const [cat, setCat] = useState('All')
  const [marketingPlatform, setMarketingPlatform] = useState(null)
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

        <Reveal className="dm">
          <p className="eyebrow">Our work</p>
          <TypedHeading text="DIGITAL MARKETING CAMPAIGN LINKS" accent="MARKETING" />
          <div className="dm__folders" aria-label="Campaign platforms">
            {digitalMarketingPlatforms.map((platform) => {
              const count = digitalMarketing.filter((campaign) => campaign.platform === platform.id).length
              return (
                <button
                  key={platform.id}
                  className={`dm__folder ${marketingPlatform === platform.id ? 'is-on' : ''}`}
                  type="button"
                  aria-pressed={marketingPlatform === platform.id}
                  onClick={() => setMarketingPlatform((current) => current === platform.id ? null : platform.id)}
                >
                  <span className="dm__folder-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2h7.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
                      <path d="M3 9h18" />
                    </svg>
                  </span>
                  <span className="dm__folder-info">
                    <b>{platform.title}</b>
                    <small>{count ? `${count} campaign${count === 1 ? '' : 's'}` : 'No links yet'}</small>
                  </span>
                  <span className={`dm__folder-toggle ${marketingPlatform === platform.id ? 'is-on' : ''}`} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>
              )
            })}
          </div>
          {marketingPlatform && (
            <div className="dm__content" aria-live="polite">
              {digitalMarketing.some((campaign) => campaign.platform === marketingPlatform) ? (
                <div className="dm__grid">
                  {digitalMarketing.filter((campaign) => campaign.platform === marketingPlatform).map((campaign) => (
                    <a
                      key={campaign.id}
                      className="dm__card"
                      href={campaign.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${campaign.title} digital marketing campaign`}
                    >
                      <span className={`dm__brand dm__brand--${campaign.platform}`} aria-hidden="true">
                        {campaign.platform === 'facebook' ? (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.7-4.5 4.7V10H6.7v3h2.9v8h3.9z" />
                          </svg>
                        ) : campaign.platform === 'linkedin' ? (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM8.34 18H5.67V9.33h2.67V18ZM7 8.15a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1ZM18.33 18h-2.66v-4.22c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2V18h-2.67V9.33h2.56v1.18h.04c.36-.68 1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.1V18Z" />
                          </svg>
                        ) : (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3" y="3" width="18" height="18" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
                          </svg>
                        )}
                      </span>
                      <span className="dm__info">
                        <small>{campaign.category}</small>
                        <b>{campaign.title}</b>
                      </span>
                      <span className="dm__go" aria-hidden="true"><Arrow dir="right" /></span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="dm__empty">Campaign links for this platform will appear here.</p>
              )}
            </div>
          )}
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
          <figure className={galleryFor(open)?.length > 1 ? 'is-gallery' : ''} onClick={(e) => e.stopPropagation()}>
            {videoFor(open) ? (
              <video src={videoFor(open)} poster={img(open.image)} controls autoPlay loop playsInline />
            ) : galleryFor(open)?.length > 1 ? (
              <Gallery key={open.id} images={galleryFor(open)} title={open.title} />
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