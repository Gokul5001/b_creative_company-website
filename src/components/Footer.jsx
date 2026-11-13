import './Footer.css'
import Logo from './Logo'
import { nav, brand, offices } from '../data/site'

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
        </div>
      </div>
      <div className="wrap footer__base">
        <p>&copy; {new Date().getFullYear()} B-Creative Network Agency. All rights reserved.</p>
        <a href="#top">Back to top &uarr;</a>
      </div>
    </footer>
  )
}