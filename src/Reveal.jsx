import { useInView } from './hooks'

// Fades a block up when it scrolls into view.
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, seen] = useInView()
  return (
    <Tag ref={ref} className={`rv ${seen ? 'in' : ''} ${className}`} style={{ '--d': `${delay}s` }} {...rest}>
      {children}
    </Tag>
  )
}

export default Reveal
