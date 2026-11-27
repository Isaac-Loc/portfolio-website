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
  location: 'NYC / Buffalo, NY', // shown in the footer
  city: 'New York', // small caps under the hero's script wordmark (like the city line on the hoodie reference)
  // caption on the hero's tee-print portrait: a small line over a big date (expected graduation, from the resume)
  print: { kicker: 'Computer Science · University at Buffalo', date: '05.2027' },
  // the ticker band under the hero
  marquee: ['Full Stack Development', 'Embedded Systems', 'React & Next.js', 'C++ & ESP32', 'New York', 'Buffalo'],
  tagline: 'Software engineer from embedded firmware to full stack.',
  roles: ['Software Engineer', 'Full Stack Developer', 'Embedded Developer', 'Computer Science, University at Buffalo'], // cycled (fade) under the hero wordmark
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
    summary: "Building and maintaining the website and onboarding workflow for a New York City high school esports league. Helping schools get their teams signed up, with public standings and schedules for the whole league.",
    stats: [
      { n: '135+', l: 'students onboarded' },
      { n: '955', l: 'players' },
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
    summary: "Launching websites for clients and keeping them fast and reliable. Handling everything from the domain to the hosting, with this portfolio as the live example.",
    stats: [],
    tech: ['React', 'Vite', 'HTML/CSS', 'Azure', 'GitHub Actions'],
  },
  {
    id: 'ub-locker',
    role: 'Embedded Software Engineer Intern',
    org: 'University at Buffalo | CSE 450/453',
    place: 'Buffalo, NY',
    dates: 'Aug 2026 – Present', // two-semester capstone: CSE 450 design (Fall 2026), CSE 453 build (Spring 2027)
    art: 'locker',
    shape: 'jag',
    image: null,
    summary: "Designing a locker that students with special needs can open without a combination lock. Working with a real client through a two-semester capstone.",
    stats: [],
    tech: ['Hardware/Software Integration', 'Assistive Technology'],
  },
  {
    id: 'ub-embedded',
    repo: 'https://github.com/UB-CSE/LED-Video-Wall',
    role: 'Embedded Software Engineer Intern',
    org: 'University at Buffalo | CSE 302',
    place: 'Buffalo, NY',
    dates: 'Aug 2025 – Dec 2025',
    art: 'ledwall',
    shape: 'jag',
    image: '/images/led-wall.webp', // the full team photo with the LED wall
    imageAlt: 'The team with the LED tile wall and the laptop running its control panel',
    summary: "Helped build the UB LED Video Wall, a wall of LED panels controlled live from a web page. Made new text and images appear smoothly while it plays.",
    stats: [],
    tech: ['C++', 'ESP-IDF', 'Python', 'Flask'],
  },
]

// shape: 'burst' | 'burst8' | 'jag' | 'polaroid'
export const projects = [
  {
    id: 'alu-4bit',
    category: 'embedded', // which Projects tab it is under: 'fullstack' or 'embedded'
    inProgress: true, // shows a COMING SOON badge next to the title in the Projects list
    date: 'Fall 2026', // CSE 493 (Intro to VLSI) group project
    title: '4-bit ALU',
    art: 'chip',
    shape: 'jag',
    image: null,
    url: null,
    summary: "Modeling a four-bit arithmetic logic unit for a VLSI course. Working in a group to design it and test it in simulation.",
    stats: [],
    tech: ['VLSI', 'Digital logic', 'Gate logic', 'Transistor-level design', 'Simulation'],
  },
  {
    id: 'medalert',
    category: 'embedded', // which Projects tab it is under: 'fullstack' or 'embedded'
    inProgress: true, // shows a COMING SOON badge next to the title in the Projects list
    date: 'Fall 2026', // CSE 321 semester project, due Nov 2026
    title: 'MedAlert',
    art: 'pill',
    shape: 'jag',
    image: '/images/medalert.webp', // the ESP32 breadboard prototype (portrait photo)
    imagePortrait: true, // tall photo: the preview shows it uncropped at 3:4
    imageAlt: 'The MedAlert prototype: an ESP32 on a breadboard wired to an LED, a buzzer and a push button',
    url: 'https://github.com/Isaac-Loc/Med-Alert', // CSE 321 team project (with Jian Xi Lu)
    summary: "Making a medication reminder that alerts a caregiver when a dose is missed. Combining a light, a buzzer and a button to prompt each dose on schedule.",
    stats: [],
    tech: ['C++', 'ESP32', 'FreeRTOS', 'PlatformIO'],
  },
  {
    id: 'storybookjam',
    category: 'fullstack', // which Projects tab it is under: 'fullstack' or 'embedded'
    date: 'November 2026', // repo created Nov 24, 2026
    title: 'StorybookJam',
    art: 'story',
    shape: 'jag',
    imageAlt: 'The StorybookJam landing page: the headline "Make a story. Make it weird.", Start playing and See a sample buttons, and an illustration of a ghost-haunted fax machine printing a story',
    image: '/images/storybookjam.webp', // the live site's landing page (public), captured 2026-11-27
    url: 'https://github.com/Isaac-Loc/StorybookJam',
    liveUrl: 'https://storybookjam.app.space', // optional: shows a Visit live site link next to View on GitHub
    summary: "Created a multiplayer storytelling game that turns friends' answers into an illustrated story. Kept each player's part of the story hidden until the end and added narration and safety checks.",
    stats: [],
    tech: ['TypeScript', 'DeepSpace', 'Claude API', 'fal', 'ElevenLabs'],
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
    liveUrl: 'https://ubthetatau.com/PMTool/',
    summary: "Shipped a project tracker for the chapter, used by 20+ members. Gave teams a shared place to organize their tasks and files.",
    stats: [
      { n: '20+', l: 'members' },
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
    summary: "Developed an online marketplace for auctions and listings with a team. Handled checkout and messaging between buyers and sellers.",
    stats: [],
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
    summary: "Made a machine that finds and flips a burger on its own. Combined motors, sensors and a flipper to handle the whole cook.",
    stats: [],
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
  banner: 'THETA TAU', // text scrolled on the LED-wall recreation in the Leadership section (letters T H E A U and space are drawn)
  repo: 'https://github.com/Isaac-Loc/OT-LED-Wall',
  org: 'Theta Tau – Engineering Fraternity',
  dates: 'May 2025 – Present',
  art: 'calendar',
  shape: 'burst8',
  image: null,
  summary: "Leading the build of a display for the fraternity's recruiting table. Increasing tabling attraction by 25% at recruitment events.",
  stats: [
    { n: '40+', l: 'attendees per event' },
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
