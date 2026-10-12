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
    // Paragraphs shown in the About section. **bold** works.
    paragraphs: [
      "I'm a **Computer Science** student at the University at Buffalo with a minor in Math, driven by building reliable solutions to real-world problems. My focus is **full-stack web development** and **embedded systems**, and I'm always open to learning something new.",
    ],
  },
  photos: {
    me: '/images/me.webp',
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
    image: '/images/ezesports.webp', // screenshot of the public ezesports.org home page (shown in a window frame on the card)
    imageAlt: 'The ezesports.org home page: New York City High School Esports League',
    summary: 'Currently spearheading the migration of [ezesports.org](https://ezesports.org) to a more modern stack with **Next.js**. Overseeing the initiative to normalize all player, staff and match data into **Supabase**.',
    stats: [
      { n: '100%', l: 'server-side validated' },
      { n: '5', l: 'security headers' },
      { n: '∼70%', l: 'smaller form' },
    ],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'React'],
  },
  {
    id: 'freelance',
    role: 'Freelance Web Developer',
    org: 'Self-employed',
    orgUrl: 'https://isaac-loc.dev', // this site is the live example
    place: 'Remote',
    dates: 'Sept 2026 – Present',
    art: 'web',
    shape: 'jag',
    image: null,
    summary: 'Building fast, low-maintenance **personal and static websites** for clients, from design and content to hosting and a custom domain. This portfolio is a live example: **React** and **Vite**, deployed on **Azure Static Web Apps** with automatic builds from **GitHub**.',
    stats: [],
    tech: ['React', 'Vite', 'HTML/CSS', 'Azure Static Web Apps', 'GitHub Actions'],
  },
  {
    id: 'ub-embedded',
    role: 'Embedded Software Engineer',
    org: 'University at Buffalo',
    place: 'Buffalo, NY',
    dates: 'Aug 2025 – Dec 2025',
    art: 'ledwall',
    shape: 'jag',
    image: '/images/led-wall.webp', // the full team photo with the LED wall
    imageAlt: 'The team with the LED tile wall and the laptop running its control panel',
    summary: 'Embedded development in **C++** on ESP32s, from firmware to the network commands that drive an LED tile array. A **Flask** API connects it all to the web frontend.',
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
    recent: false,
    inProgress: true, // listed under the IN PROGRESS tab, with a COMING SOON badge of the Project Archive (and under 2026)
    date: 'Fall 2026 – Spring 2027', // CSE 450 (design) then CSE 453 (build), a two-semester project
    title: 'Automated Locker',
    art: 'locker',
    shape: 'jag',
    image: null,
    url: null,
    summary: 'A two-semester **hardware/software** capstone for a real client, a high school special education teacher. The goal is a locker that students with special needs can open easily, without a combination lock.',
    stats: [],
    tech: ['Hardware/Software Integration', 'Assistive Technology'],
  },
  {
    id: 'vending-controller',
    recent: false,
    inProgress: true, // listed under the IN PROGRESS tab, with a COMING SOON badge of the Project Archive (and under 2026)
    date: 'Fall 2026', // CSE 493 (Intro to VLSI) group project, proposed October 2026
    title: 'Vending Machine Controller',
    art: 'vending',
    shape: 'jag',
    image: null,
    url: null,
    summary: 'A vending machine controller that accepts coin inputs, tracks the total, dispenses the product once paid, and returns change. It is modeled with **transistor and gate logic** and tested in simulation.',
    stats: [],
    tech: ['VLSI', 'Gate logic', 'Transistor-level design', 'Simulation'],
  },
  {
    id: 'medalert',
    recent: false,
    inProgress: true, // listed under the IN PROGRESS tab, with a COMING SOON badge of the Project Archive (and under 2026)
    date: 'Fall 2026', // CSE 321 semester project, due Nov 2026
    title: 'MedAlert',
    art: 'pill',
    shape: 'jag',
    image: null,
    url: null,
    summary: 'A two-stage medication reminder on an **ESP32** running **FreeRTOS**. It beeps and lights an LED at dose time, and if nobody confirms within 10 minutes it sends a missed-dose alert to a caregiver over **Wi-Fi**.',
    stats: [
      { n: '4', l: 'RTOS tasks' },
      { n: '10 min', l: 'miss timeout' },
    ],
    tech: ['C++', 'ESP32', 'FreeRTOS', 'PlatformIO'],
  },
  {
    id: 'pm-tool',
    recent: true, // shown on the main page; every project (recent or not) is in the Project Archive tab
    date: 'August 2026', // shown under the title on the card and in the Project Archive
    title: 'Project Management Tool',
    art: 'kanban',
    shape: 'burst8',
    image: '/images/project-tracker.jpg', // the project page; click it on the card for a bigger view. Shows member names (no emails): see SPEC.md
    imageAlt: 'A project page with its goal, latest status report, linked Google Drive folder and members',
    url: 'https://github.com/Theta-Tau-Mu-Gamma/Theta-Tau-Scrum',
    summary: 'Full-stack development using **React** and **PHP/Slim**, from schema design to the API. A shared Kanban workspace for the whole chapter, with **Google Drive** built in.',
    stats: [
      { n: '20+', l: 'members' },
      { n: '68', l: 'API endpoints' },
      { n: '6', l: 'Kanban stages' },
    ],
    tech: ['React', 'PHP/Slim', 'MySQL'],
  },
  {
    id: 'bidit',
    recent: false,
    date: 'March 2026', // shown under the title on the card and in the Project Archive
    title: 'Bidit Auction Marketplace',
    art: 'auction',
    shape: 'jag',
    image: '/images/bidit.webp', // the marketplace browse page (sample listings, no personal data); click it for a bigger view
    imageAlt: 'The Bidit marketplace home page: category and condition filters, a price range, and a grid of listings with prices',
    url: null,
    summary: 'A peer-to-peer marketplace built with **React**, **PHP** and **MySQL**. Handling listings, auctions and **real-time bidding** end to end.',
    stats: [
      { n: '2', l: 'listing types' },
      { n: 'live', l: 'bid updates' },
    ],
    tech: ['React', 'PHP', 'MySQL'],
  },
  {
    id: 'burger-flipper',
    recent: false,
    date: 'February 2025', // the repo was created Feb 2025 (last pushed Aug 2025)
    title: 'Autonomous Burger Flipping System',
    art: 'burger',
    shape: 'jag',
    image: '/images/burger-flipper.jpg', // the machine only, cropped from a crowded event photo (people cropped out)
    imageAlt: 'The burger flipping machine on its tripod: a wooden base with the spatula rails, motors, and wiring underneath',
    url: 'https://github.com/Isaac-Loc/Autonomous-Burger-Flipping-System',
    summary: 'Arduino firmware in **C++** for a robotic grill assistant. **DC motors** slide a spatula and temperature probe across the grill, laser sensors locate the patty, and a **servo** flips it.',
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
    { name: 'Git', icon: 'git' }, { name: 'GitHub', icon: 'github' }, { name: 'Docker', icon: 'docker' }, { name: 'Linux', icon: 'linux' }, { name: 'SSH' },
    { name: 'Microsoft Azure (Static Web Apps)', icon: 'microsoftazure' }, { name: 'CI/CD (GitHub Actions)', icon: 'githubactions' },
    { name: 'Vite', icon: 'vite' }, { name: 'Node.js', icon: 'nodedotjs' }, { name: 'Vercel', icon: 'vercel' },
    { name: 'Vitest', icon: 'vitest' }, { name: 'CMake', icon: 'cmake' }, { name: 'PlatformIO', icon: 'platformio' },
    { name: 'ESP32', icon: 'espressif' }, { name: 'HUB75' }, { name: 'REST APIs' }, { name: 'OAuth 2.0' }, { name: 'DNS/HTTPS' },
    { name: 'Agile/Scrum' }, { name: 'Claude Code', icon: 'claude' }, { name: 'AI-Assisted Development' },
  ] },
]
