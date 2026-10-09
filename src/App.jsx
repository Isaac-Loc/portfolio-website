import { site } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'

// The page is being rebuilt from the ground up: header + hero only. Add new sections below the hero.
export default function App() {
  return (
    <>
      <Header name={site.firstName} resume={site.resume} />
      <Hero site={site} />
    </>
  )
}
