// Text-built monogram. To use the official logo file instead, put it in src/assets/logo.svg
// and swap the <span className="logo__mark"> for an <img>.
export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <span className="logo__mark" aria-hidden="true">B</span>
      <span className="logo__word">Creative</span>
    </span>
  )
}
