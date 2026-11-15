import './Footer.css'
import Logo from './Logo'
import { nav, brand, offices, socials } from '../data/site'
import { Facebook, Instagram, LinkedIn } from './Icons'

const socialIcons = { facebook: Facebook, instagram: Instagram, linkedin: LinkedIn }

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div className="footer__brand">
          <Logo light variant="full" className="footer__logo" />
          <p>Advertising and IT agency serving businesses in {offices.join(' and ')}.</p>
        </div>
        <nav aria-label="Footer">
          {nav.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </nav>
        <div className="footer__contact">
          <a href={`tel:${brand.phone}`}>{brand.phoneDisplay}</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <div className="footer__social">
            {socials.map((s) => {
              const Icon = socialIcons[s.id]
              return <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}><Icon /></a>
            })}
          </div>
        </div>
      </div>
      <div className="wrap footer__base">
        <p>&copy; {new Date().getFullYear()} B-Creative Network Agency. All rights reserved.</p>
        <a href="#top">Back to top &uarr;</a>
      </div>
    </footer>
  )
}