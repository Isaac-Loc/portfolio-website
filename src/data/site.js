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
  resume: '/Isaac_Loc_Resume.pdf', // file lives in /public; opened in a new tab from the nav
  githubUser: 'Isaac-Loc', // drives the commit grid in the hero
  linkedin: 'https://www.linkedin.com/in/isaac-loc',
  location: 'NYC / Buffalo, NY', // shown under the hero portrait as "Based in ..."
  tagline: 'Software engineer from embedded firmware to full stack.',
  roles: ['Software Engineer', 'Full Stack Developer', 'Embedded Developer', 'Computer Science @\nUniversity at Buffalo'], // typed under the hero title
  about: {
    // The About box in the hero: one plain paragraph, then short label/value rows.
    paragraphs: [
      "I'm a Computer Science student at the University at Buffalo with a minor in Math. My focus is full-stack web development and embedded systems, and I'm always open to learning new areas of software and engineering.",
    ],
    facts: [
      { label: 'Studying', value: 'B.S. Computer Science, minor in Math, University at Buffalo (expected May 2027)' },
      { label: 'Focus', value: 'Full-stack web development and embedded systems' },
    ],
  },
  photos: {
    me: '/images/me.webp',
  },
}

export const experience = [
  {
    id: 'ezesports',
    repo: 'https://github.com/EZ-Esports/website', // public repo, shown as a View on GitHub link
    role: 'Full Stack Software Engineer',
    org: 'EZEsports',
    orgUrl: 'https://ezesports.org',
    place: 'Remote',
    dates: 'Sept 2026 – Present',
    art: 'shield',
    shape: 'burst',
    image: '/images/ezesports.webp', // screenshot of the public ezesports.org home page (shown in a window frame on the card)
    imageAlt: 'The ezesports.org home page: New York City High School Esports League',
    summary: "Full-stack development on the EZ Esports website ([ezesports.org](https://ezesports.org)) using Next.js, TypeScript and Supabase (PostgreSQL). Built PDF resume uploads with server-side validation, moved application data to a versioned JSONB schema, added site-wide security headers, and shipped the school manager portal's guided tour, season roster lock and student handbook page.",
    stats: [
      { n: '100%', l: 'server-side validated' },
      { n: '5', l: 'security headers' },
      { n: '∼70%', l: 'smaller form' },
    ],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'React'],
  },
  {
    id: 'freelance',
    repo: 'https://github.com/Isaac-Loc/portfolio-website',
    role: 'Freelance Software Engineer',
    org: 'Self-employed',
    orgUrl: 'https://isaac-loc.dev', // this site is the live example
    place: 'Remote',
    dates: 'Sept 2026 – Present',
    art: 'web',
    shape: 'jag',
    image: null,
    summary: "Design and development of personal and static websites for clients, including hosting and custom domains. This portfolio is a live reference: a React and Vite site on Azure Static Web Apps, deployed through GitHub Actions on a custom domain with managed HTTPS.",
    stats: [],
    tech: ['React', 'Vite', 'HTML/CSS', 'Azure', 'GitHub Actions'],
  },
  {
    id: 'ub-embedded',
    repo: 'https://github.com/UB-CSE/LED-Video-Wall',
    role: 'Embedded Software Engineer',
    org: 'University at Buffalo',
    place: 'Buffalo, NY',
    dates: 'Aug 2025 – Dec 2025',
    art: 'ledwall',
    shape: 'jag',
    image: '/images/led-wall.webp', // the full team photo with the LED wall
    imageAlt: 'The team with the LED tile wall and the laptop running its control panel',
    summary: "Contributed to the UB LED Video Wall, a modular wall of WS2812B LED matrices driven by ESP32 microcontrollers. Developed C++ server features for text rendering, image scaling and real-time layer movement from the web interface, wrote the Python class that wraps the wall's commands for the Flask API, and updated the microcontroller client's host connection.",
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
    id: 'automated-locker',
    category: 'embedded', // which Projects tab it is under: 'fullstack' or 'embedded'
    inProgress: true, // shows a COMING SOON badge next to the title in the Projects list
    date: 'Fall 2026 – Spring 2027', // CSE 450 (design) then CSE 453 (build), a two-semester project
    title: 'Automated Locker',
    art: 'locker',
    shape: 'jag',
    image: null,
    url: null,
    summary: "Two-semester capstone building a locker that students with special needs can open without a combination lock. Developed for a real client, a high school special education teacher.",
    stats: [],
    tech: ['Hardware/Software Integration', 'Assistive Technology'],
  },
  {
    id: 'vending-controller',
    category: 'embedded', // which Projects tab it is under: 'fullstack' or 'embedded'
    inProgress: true, // shows a COMING SOON badge next to the title in the Projects list
    date: 'Fall 2026', // CSE 493 (Intro to VLSI) group project, proposed October 2026
    title: 'Vending Machine Controller',
    art: 'vending',
    shape: 'jag',
    image: null,
    url: null,
    summary: "Vending machine controller that accepts coin inputs, tracks the running total, dispenses the product once paid and returns change. Modeled with transistor and gate logic and verified in simulation.",
    stats: [],
    tech: ['VLSI', 'Gate logic', 'Transistor-level design', 'Simulation'],
  },
  {
    id: 'medalert',
    category: 'embedded', // which Projects tab it is under: 'fullstack' or 'embedded'
    inProgress: true, // shows a COMING SOON badge next to the title in the Projects list
    date: 'Fall 2026', // CSE 321 semester project, due Nov 2026
    title: 'MedAlert',
    art: 'pill',
    shape: 'jag',
    image: null,
    url: null,
    summary: "Two-stage medication reminder on an ESP32 running FreeRTOS. A beep and an LED signal each dose, and if nobody confirms within 10 minutes a missed-dose alert is sent to a caregiver over Wi-Fi.",
    stats: [
      { n: '4', l: 'RTOS tasks' },
      { n: '10 min', l: 'miss timeout' },
    ],
    tech: ['C++', 'ESP32', 'FreeRTOS', 'PlatformIO'],
  },
  {
    id: 'pm-tool',
    category: 'fullstack', // which Projects tab it is under: 'fullstack' or 'embedded'
    date: 'August 2026', // first item of the caption line under the preview picture
    title: 'Project Management Tool',
    art: 'kanban',
    shape: 'burst8',
    image: '/images/project-tracker.jpg', // the project page; click it on the card for a bigger view. Shows member names (no emails): see SPEC.md
    imageAlt: 'A project page with its goal, latest status report, linked Google Drive folder and members',
    url: 'https://github.com/Theta-Tau-Mu-Gamma/Theta-Tau-Scrum',
    summary: "Project tracker for the Theta Tau chapter with scrum boards, task delegation, time tracking and Google Drive integration. React and Vite front end, PHP/Slim API and MySQL database, with Google Sign-In for authentication.",
    stats: [
      { n: '20+', l: 'members' },
      { n: '68', l: 'API endpoints' },
      { n: '6', l: 'Kanban stages' },
    ],
    tech: ['React', 'Vite', 'PHP/Slim', 'MySQL', 'Google Drive API'],
  },
  {
    id: 'bidit',
    category: 'fullstack', // which Projects tab it is under: 'fullstack' or 'embedded'
    date: 'March 2026', // first item of the caption line under the preview picture
    title: 'Bidit Auction Marketplace',
    art: 'auction',
    shape: 'jag',
    image: '/images/bidit.webp', // the marketplace browse page (sample listings, no personal data); click it for a bigger view
    imageAlt: 'The Bidit marketplace home page: category and condition filters, a price range, and a grid of listings with prices',
    url: null,
    summary: "Peer-to-peer marketplace with live auctions and buy-it-now listings, built by a team of five in React, PHP and MySQL. Implemented the accepted-bid checkout with a 24-hour exclusive purchase window, order cancellation with seller approval, listing price adjustments and the seller messaging interface.",
    stats: [
      { n: '2', l: 'listing types' },
      { n: 'live', l: 'bid updates' },
    ],
    tech: ['React', 'PHP', 'MySQL'],
  },
  {
    id: 'burger-flipper',
    category: 'embedded', // which Projects tab it is under: 'fullstack' or 'embedded'
    date: 'February 2025', // the repo was created Feb 2025 (last pushed Aug 2025)
    title: 'Autonomous Burger Flipping System',
    art: 'burger',
    shape: 'jag',
    image: '/images/burger-flipper.jpg', // the machine only, cropped from a crowded event photo (people cropped out)
    imageAlt: 'The burger flipping machine on its tripod: a wooden base with the spatula rails, motors, and wiring underneath',
    url: 'https://github.com/Isaac-Loc/Autonomous-Burger-Flipping-System',
    summary: "Arduino Mega firmware in C++ for an automated grill assistant. Two DC motors move a spatula and temperature probe across the grill, laser sensors locate the patty, and a servo flips it.",
    stats: [
      { n: '2', l: 'DC motors' },
      { n: '1', l: 'servo flipper' },
      { n: '1', l: 'temp probe' },
    ],
    tech: ['C++', 'Arduino', 'Arduino Mega'],
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
  repo: 'https://github.com/Isaac-Loc/OT-LED-Wall',
  org: 'Theta Tau – Engineering Fraternity',
  dates: 'May 2025 – Present',
  art: 'calendar',
  shape: 'burst8',
  image: null,
  summary: "Plans chapter events and built the chapter's tabling LED wall: an ESP32-S3 driving four chained 64x64 HUB75 panels as a 256x64 display, programmed in C++ with PlatformIO.",
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
    { name: 'Git', icon: 'git' }, { name: 'GitHub', icon: 'github' }, { name: 'Docker', icon: 'docker' }, { name: 'Linux', icon: 'linux' }, { name: 'SSH' },
    { name: 'Microsoft Azure (Static Web Apps)', icon: 'microsoftazure' }, { name: 'CI/CD (GitHub Actions)', icon: 'githubactions' },
    { name: 'Vite', icon: 'vite' }, { name: 'Node.js', icon: 'nodedotjs' }, { name: 'Vercel', icon: 'vercel' },
    { name: 'Vitest', icon: 'vitest' }, { name: 'CMake', icon: 'cmake' }, { name: 'PlatformIO', icon: 'platformio' },
    { name: 'ESP32', icon: 'espressif' }, { name: 'HUB75' }, { name: 'REST APIs' }, { name: 'OAuth 2.0' }, { name: 'DNS/HTTPS' },
    { name: 'Agile/Scrum' }, { name: 'Claude Code', icon: 'claude' }, { name: 'AI-Assisted Development' },
  ] },
]
