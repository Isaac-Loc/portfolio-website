import { site } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import EmptyPage from './pages/EmptyPage.jsx'
import useRoute from './hooks/useRoute.js'

// Routes are hash-based ("#/experience"). Only Home has content so far; the others are empty pages to fill in.
const PAGES = {
  '/experience': 'Experience',
  '/projects': 'Projects',
  '/skills': 'Skills',
  '/contact': 'Contact',
}

export default function App() {
  const route = useRoute()
  const title = PAGES[route]
  return (
    <>
      <Header name={site.firstName} resume={site.resume} route={route} />
      {title ? <EmptyPage title={title} /> : <Hero site={site} />}
    </>
  )
}
