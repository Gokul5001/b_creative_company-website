import { useEffect, useState } from 'react'
import './Header.css'
import Logo from './Logo'
import { nav } from '../data/site'
import { useActiveSection } from '../hooks'

const ids = nav.map((n) => n.id)

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="wrap header__in">
        <a href="#top" className="header__logo" aria-label="B-Creative home" onClick={close}><Logo /></a>

        <nav className="header__nav" aria-label="Main">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} onClick={close}>{n.label}</a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--dark header__cta" onClick={close}>Get a Quote</a>

        <button className="header__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <i></i><i></i>
        </button>
      </div>
    </header>
  )
}
