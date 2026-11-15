const base = { width: 28, height: 28, viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const Pen = (p) => (
  <svg {...base} {...p}><path d="M6 26l3-9L22 4l6 6-13 13z" /><path d="M19 7l6 6M6 26l7-2" /><circle cx="12" cy="20" r="1.6" /></svg>
)
export const Globe = (p) => (
  <svg {...base} {...p}><circle cx="16" cy="16" r="12" /><path d="M4 16h24M16 4c4 3.5 6 7.5 6 12s-2 8.5-6 12c-4-3.5-6-7.5-6-12s2-8.5 6-12z" /></svg>
)
export const Phone = (p) => (
  <svg {...base} {...p}><rect x="9" y="3" width="14" height="26" rx="3" /><path d="M14 25h4" /></svg>
)
export const Video = (p) => (
  <svg {...base} {...p}><rect x="4" y="6" width="24" height="20" rx="3" /><path d="M13 12l7 4-7 4z" /><path d="M4 11h3M4 16h3M4 21h3M25 11h3M25 16h3M25 21h3" /></svg>
)
export const Share = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="16" r="3.5" /><circle cx="23" cy="8" r="3.5" /><circle cx="23" cy="24" r="3.5" /><path d="M12 14.5l8-5M12 17.5l8 5" /></svg>
)
export const Call = (p) => (
  <svg {...base} {...p}><path d="M8 4h5l2 7-3 2a16 16 0 0 0 7 7l2-3 7 2v5a3 3 0 0 1-3 3A22 22 0 0 1 5 7a3 3 0 0 1 3-3z" /></svg>
)
export const Mail = (p) => (
  <svg {...base} {...p}><rect x="3" y="7" width="26" height="19" rx="3" /><path d="M4 9l12 9 12-9" /></svg>
)
export const Pin = (p) => (
  <svg {...base} {...p}><path d="M16 29s9-8.2 9-15a9 9 0 0 0-18 0c0 6.8 9 15 9 15z" /><circle cx="16" cy="14" r="3.5" /></svg>
)
export const Check = (p) => (
  <svg {...base} {...p}><path d="M7 17l6 6 12-13" /></svg>
)
export const Arrow = (p) => (
  <svg {...base} width="18" height="18" {...p}><path d="M7 25L25 7M11 7h14v14" /></svg>
)
export const WhatsApp = (p) => (
  <svg {...base} {...p}><path d="M16 4a12 12 0 0 0-10.3 18.1L4 28l6.1-1.6A12 12 0 1 0 16 4z" /><path d="M12 11c-.5 3.8 3.7 8.5 8 8.5l1.7-2.4-3.2-1.6-1.4 1c-1.7-.8-2.6-1.8-3.2-3.2l1.1-1.3z" fill="currentColor" stroke="none" /></svg>
)
export const Close = (p) => (
  <svg {...base} {...p}><path d="M7 7l18 18M25 7L7 25" /></svg>
)

const fill = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true }
export const Facebook = (p) => (
  <svg {...fill} {...p}><path d="M13.5 21v-7.5h2.5l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.2v3h2.5V21z" /></svg>
)
export const Instagram = (p) => (
  <svg {...fill} fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
)
export const LinkedIn = (p) => (
  <svg {...fill} {...p}><path d="M6.5 9h-3v11h3zM5 4a1.8 1.8 0 100 3.6A1.8 1.8 0 005 4zM20.5 20v-6.2c0-3-1.6-4.4-3.8-4.4-1.7 0-2.5.9-3 1.6V9h-3v11h3v-6c0-1.6.8-2.5 2-2.5s1.8.9 1.8 2.5V20z" /></svg>
)