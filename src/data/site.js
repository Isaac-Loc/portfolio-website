// All editable content lives here. Source of truth: Isaac_Loc_Resume.pdf. Only resume content is shown on the site.
// Keep text SHORT (the design favours graphics). **double asterisks** make text bold.
// `art` picks a built-in illustration (ledwall | shield | kanban | auction | calendar | cap).
// Set `image` (files go in /public/images) to use a real picture instead of the illustration.
export const site = {
  name: 'Isaac Loc',
  firstName: 'Isaac',
  year: '2026',
  email: 'locisaac1223@gmail.com',
  github: 'https://github.com/Isaac-Loc',
  githubUser: 'Isaac-Loc', // drives the commit grid in the hero
  linkedin: 'https://www.linkedin.com/in/isaac-loc',
  about: {
    // Shown under the hero title. Keep it to 2-3 short sentences (phones show the first two). **bold** works.
    sentences: [
      "I'm a senior **Computer Science** major at the University at Buffalo.",
      "I love developing **software and systems** that make tricky things and problems easier.",
    ],
  },
  heroStickers: ['flower', 'heart', 'cassette', 'constellation', 'vinyl'], // artistic stickers (see Stickers.jsx)
  heroPhotos: {
    main: '/images/me.jpg', // big jagged frame in the centre; any photo works (cropped to fit)
    upper: '/images/cat.jpg', // upper starburst: the cat
    lower: '/images/car.jpg', // lower starburst: the car (licence plate blurred in the file)
  },
}

export const experience = [
  {
    id: 'ezesports',
    role: 'Full Stack Software Engineer',
    org: 'EZEsports',
    orgUrl: 'https://ezesports.org',
    place: 'Remote',
    dates: 'Sept 2026 – Present',
    art: 'shield',
    shape: 'burst',
    image: null,
    summary: 'Secure resume uploads, on-request data erasure and site-wide security headers for a **Next.js + Supabase** app.',
    stats: [
      { n: '100%', l: 'server-side validated' },
      { n: '5', l: 'security headers' },
      { n: '∼70%', l: 'smaller form' },
    ],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'React'],
  },
  {
    id: 'ub-embedded',
    role: 'Embedded Software Engineer',
    org: 'University at Buffalo',
    place: 'Buffalo, NY',
    dates: 'Aug 2025 – Dec 2025',
    art: 'ledwall',
    shape: 'jag',
    image: null,
    summary: '**C++ firmware** that keeps video playing in sync across an LED tile array, with a **Flask** API for the web frontend.',
    stats: [
      { n: '50+', l: 'LED tiles' },
      { n: '4', l: 'ESP32s' },
      { n: '10+', l: 'commands' },
    ],
    tech: ['C++', 'ESP-IDF', 'Python', 'Flask'],
  },
]

// shape: 'burst' | 'burst8' | 'jag' | 'polaroid'
export const projects = [
  {
    id: 'pm-tool',
    title: 'Project Management Tool',
    art: 'kanban',
    shape: 'burst8',
    image: null,
    url: 'https://github.com/Theta-Tau-Mu-Gamma/Theta-Tau-Scrum',
    summary: 'Kanban board with a dependency graph and **Google Drive** file access, used by teams across the chapter.',
    stats: [
      { n: '20+', l: 'members' },
      { n: '68', l: 'API endpoints' },
      { n: '6', l: 'Kanban stages' },
    ],
    tech: ['React', 'PHP/Slim', 'MySQL'],
  },
  {
    id: 'bidit',
    title: 'Bidit Auction Marketplace',
    art: 'auction',
    shape: 'jag',
    image: null,
    url: null,
    summary: 'Peer-to-peer marketplace with live auctions, buy-it-now, and **real-time bid updates**.',
    stats: [
      { n: '2', l: 'listing types' },
      { n: 'live', l: 'bid updates' },
    ],
    tech: ['React', 'PHP', 'MySQL'],
  },
]

export const education = {
  school: 'University at Buffalo',
  place: 'Buffalo, NY',
  degree: 'B.S. Computer Science, Minor in Math',
  dates: 'Expected May 2027',
  art: 'cap',
  shape: 'burst',
  image: null,
  coursework: [
    'Algorithms and Complexity',
    'Data Structures and Algorithms',
    'Systems Programming',
    'Software Engineering',
  ],
}

export const leadership = {
  role: 'Brotherhood Outreach & Software Lead',
  org: 'Theta Tau – Engineering Fraternity',
  dates: 'May 2025 – Present',
  art: 'calendar',
  shape: 'burst8',
  image: null,
  summary: 'Plan chapter events and built an **LED wall** with C++ and ESP32s to draw people to our tabling.',
  stats: [
    { n: '15+', l: 'events' },
    { n: '40+', l: 'per event' },
    { n: '25%', l: 'more tabling attraction' },
  ],
  tech: ['C++', 'PlatformIO', 'ESP32', 'HUB75'],
}

// icon = Simple Icons slug (https://simpleicons.org); omit for a plain tile
export const skills = [
  { label: 'Languages', items: [
    { name: 'C/C++', icon: 'cplusplus' }, { name: 'Python', icon: 'python' }, { name: 'TypeScript', icon: 'typescript' },
    { name: 'JavaScript', icon: 'javascript' }, { name: 'PHP', icon: 'php' }, { name: 'SQL' },
    { name: 'HTML/CSS', icon: 'html5' }, { name: 'Java', icon: 'openjdk' }, { name: 'ARM Assembly', icon: 'arm' },
  ] },
  { label: 'Frameworks & Libraries', items: [
    { name: 'React', icon: 'react' }, { name: 'Next.js', icon: 'nextdotjs' }, { name: 'Tailwind CSS', icon: 'tailwindcss' },
    { name: 'React Aria' }, { name: 'Drizzle ORM', icon: 'drizzle' }, { name: 'PHP/Slim' },
    { name: 'Flask', icon: 'flask' }, { name: 'ESP-IDF', icon: 'espressif' },
  ] },
  { label: 'Databases', items: [
    { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'MySQL', icon: 'mysql' }, { name: 'Supabase', icon: 'supabase' },
  ] },
  { label: 'Tools & Platforms', items: [
    { name: 'Git', icon: 'git' }, { name: 'Linux', icon: 'linux' }, { name: 'SSH' }, { name: 'Vercel', icon: 'vercel' },
    { name: 'Vitest', icon: 'vitest' }, { name: 'CMake', icon: 'cmake' }, { name: 'PlatformIO', icon: 'platformio' },
    { name: 'ESP32', icon: 'espressif' }, { name: 'HUB75' }, { name: 'REST APIs' }, { name: 'OAuth 2.0' },
    { name: 'Agile/Scrum' }, { name: 'Claude Code', icon: 'claude' }, { name: 'AI-Assisted Development' },
  ] },
]
