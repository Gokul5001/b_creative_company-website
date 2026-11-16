// All website copy and contact details live here, so edits never touch the components.

export const brand = {
  name: 'B-Creative',
  full: 'B-Creative Network Agency',
  phone: '+966597630124',
  phoneDisplay: '+966 59 763 0124',
  whatsapp: '966597630124',
  email: 'bcreativenetworkagency@gmail.com',
  address: 'Hayee Shatee 1, Cornich, Jeddah, Saudi Arabia',
}

export const socials = [
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61573301126208' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/bcreative.sa' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/b-creative-network-agency-137a86445/' },
]

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'approach', label: 'Approach' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'why', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { n: 50, suffix: '+', label: 'Projects delivered' },
  { n: 30, suffix: '+', label: 'Happy clients' },
  { n: 6, suffix: ' yrs', label: 'Serving Saudi Arabia & Pakistan' },
]

export const clients = ['Albaik', 'Hyundai', 'NADEC', "L'Oréal Paris Hair Serum", 'Abeer Medical Group', 'Arura Gold', 'Dental Care Clinic', 'Creative Solution']

export const services = [
  {
    id: 'graphic',
    title: 'Brand & Graphic Design',
    text: 'Distinctive visual identities and marketing creatives that communicate your brand with clarity and consistency.',
    points: ['Logo and brand identity systems', 'Social media and campaign creatives', 'Packaging and print collateral'],
  },
  {
    id: 'web',
    title: 'Website Development',
    text: 'High-performing, responsive websites engineered to present your business credibly and convert visitors into clients.',
    points: ['Corporate and business websites', 'Landing pages and online stores', 'Fast, SEO-ready, mobile-first builds'],
  },
  {
    id: 'app',
    title: 'Application Development',
    text: 'Custom mobile and web applications built around your operations and the needs of your customers.',
    points: ['Mobile and web applications', 'Dashboards and internal tools', 'Maintenance and post-launch support'],
  },
  {
    id: 'video',
    title: 'Video Editing & Production',
    text: 'Polished promotional videos, reels and brand films that tell your story and hold your audience\'s attention.',
    points: ['Promotional and corporate videos', 'Social media reels and short-form content', 'Motion graphics and post-production'],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    text: 'Data-informed social media strategy and campaigns that grow your audience and deliver measurable results.',
    points: ['Social media strategy and management', 'Content and campaign planning', 'Performance reporting and optimisation'],
  },
]

// `video` is matched against the file names in src/assets (case-insensitive, any part of the name), so the long exported file names can stay as they are.
// `image` is optional: a still picture shown before the video is played. Without it the first frame of the video is used.
export const projects = [
  {
    id: 'markhor-drink',
    title: 'Markhor Stimulant Drink',
    category: 'Food & Beverage',
    image: 'markhor-drink',
    video: 'power heroes choose',
  },
  {
    id: 'markhor-refresh',
    title: 'Markhor Stimulant Drink: Refreshing Your Day',
    category: 'Food & Beverage',
    video: 'refreshing your feed',
  },
  {
    id: 'natures-finest',
    title: 'Nature\'s Finest: A New Standard of Wellness',
    category: 'Food & Beverage',
    video: 'a new standard of wellness',
  },
  {
    id: 'saif-sky-rise',
    title: 'Saif Group of Companies: Saif Sky Rise',
    category: 'Real Estate',
    image: 'saif-sky-rise',
    video: 'saif sky rise',
  },
]

export const websites = [
  { id: 'saif-group', title: 'Saif Group', category: 'Real Estate', url: 'https://thesaifgroup.com/', image: 'web-saif-group', hue: '#1d3557' },
  { id: 'markhor-drinks', title: 'Markhor Drinks', category: 'Food & Beverage', url: 'https://markhordrinks.com', image: 'web-markhor-drinks', hue: '#0f5132' },
  { id: 'oxford-academy', title: 'Oxford Academy', category: 'Education', url: 'https://oxfordacademy.edu.sa/en', image: 'web-oxford-academy', hue: '#4a1d6b' },
  { id: 'deal', title: 'Deal', category: 'Real Estate', url: 'https://deal.com.sa/', image: 'web-deal', hue: '#9a3412' },
]

export const founder = {
  id: 'bilal',
  name: 'Muhammad Bilal',
  role: 'Founder & CEO',
  bio: 'Muhammad Bilal is the Founder and CEO of B-Creative, an advertising and IT agency based in Jeddah, KSA. With a vision to merge creativity with technology, he leads a team that delivers branding, digital marketing, website development and IT solutions. Under his leadership, B-Creative helps businesses grow through smart design and reliable tech.',
}

export const team = [
  { id: 'bilal-mustafa', name: 'Muhammad Bilal Mustafa', role: 'Application Developer', email: 'itx.bmustafa@gmail.com' },
  { id: 'palwasha', name: 'Palwasha Khan', role: 'Website Developer', email: 'palwashasheikh229@gmail.com' },
  { id: 'zubaria', name: 'Zubaria Khalid', role: 'Graphic Designer', email: 'zubariadesign@gmail.com' },
  { id: 'gokul', name: 'Gokul Kannan', role: 'Website Developer', email: 'gokulkannankh@gmail.com' },
  { id: 'tania', name: 'Tania Tanveer', role: 'Website Developer & Project Collaborator', email: 'taniatanveer658@gmail.com' },
  { id: 'himra', name: 'Himra Imran', role: 'Graphic Designer', email: 'himraimran2000@gmail.com' },
  { id: 'nabeela', name: 'Nabeela Jawad', role: 'Social Media Manager', email: 'nabilajawad333@gmail.com' },
  { id: 'meerab', name: 'Meerab Saleem', role: 'Graphic Designer', email: 'meerabdesigner6@gmail.com' },
]

export const offices = ['Saudi Arabia', 'Pakistan']

export const approach = [
  { title: 'Discovery', text: 'We begin by studying your business, objectives and target audience to build a clear foundation for the engagement.' },
  { title: 'Strategy', text: 'We develop a focused, results-oriented plan aligned with your goals, market and budget.' },
  { title: 'Execution', text: 'Our specialists carry out the plan with creativity, technical precision and attention to detail.' },
  { title: 'Review & Refinement', text: 'We present the work for your feedback and refine it until it meets the agreed quality standards.' },
  { title: 'Delivery & Support', text: 'We deliver on schedule and provide ongoing support to sustain your growth after launch.' },
]
export const benefits = [
  { title: 'Presence in Two Markets', text: 'Established understanding of the business landscape in both Saudi Arabia and Pakistan.' },
  { title: 'Quality at Competitive Value', text: 'Premium-standard work delivered at competitive, transparent pricing.' },
  { title: 'Timely, Transparent Delivery', text: 'Clear communication at every stage and reliable adherence to agreed timelines.' },
  { title: 'Focus on Business Growth', text: 'Our work is measured by its contribution to your growth, not by tasks completed.' },
  { title: 'Long-Term Partnership', text: 'We aim to be a dependable strategic partner as your business evolves.' },
]

export const achievements = [
  {
    year: '2026',
    lead: 'Graphic design services for',
    names: ['Albaik', 'Abeer Medical Group', "L'Oréal Paris Hair Serum"],
  },
  {
    year: '2025',
    lead: 'Graphic design services for',
    names: ['Arura Gold', 'Dental Care Clinic'],
    tail: 'and collaboration work in Creative Solution with NADEC and Hyundai.',
  },
]

export const formServices = ['Branding', 'Graphic Designing', 'Website Development', 'Application Development', 'Video Editing', 'Digital Marketing']