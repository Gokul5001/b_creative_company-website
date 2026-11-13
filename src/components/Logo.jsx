import logoFull from '../assets/logo.png'
import logoFullLight from '../assets/logo-light.png'
import markDark from '../assets/logo-mark.png'
import markLight from '../assets/logo-mark-light.png'

// variant="mark"  -> B monogram + "Creative" wordmark (compact, for the header)
// variant="full"  -> complete logo lockup (footer, hero, anywhere large)
// light           -> white version for dark backgrounds
export default function Logo({ light = false, variant = 'mark', className = '' }) {
  if (variant === 'full') {
    return (
      <img
        className={`logo-full ${className}`}
        src={light ? logoFullLight : logoFull}
        alt="B-Creative"
        width="700" height="721"
        loading="lazy" decoding="async"
      />
    )
  }
  return (
    <span className={`logo ${light ? 'logo--light' : ''} ${className}`}>
      <img className="logo__mark" src={light ? markLight : markDark} alt="" aria-hidden="true" />
      <span className="logo__word">Creative</span>
    </span>
  )
}