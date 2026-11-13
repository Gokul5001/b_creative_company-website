import './WhatsAppFab.css'
import { brand } from '../data/site'
import { WhatsApp } from './Icons'

export default function WhatsAppFab() {
  return (
    <a className="fab" href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent('Hello B-Creative, I would like to know more about your services.')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <WhatsApp width="30" height="30" />
    </a>
  )
}
