// Scroll to a home-page section (or the top). From another route (e.g. #/contact) it goes home first.
export function goToSection(id, route) {
  const scroll = () => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  if (route === '/') scroll()
  else { window.location.hash = '/'; setTimeout(scroll, 60) }
}

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'skills', label: 'Skills' },
]
