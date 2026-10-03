import { useEffect } from 'react'
import { particles, wiggle, reduced } from '../utils/fx.js'

// Everything on the hero poster is a playful object: it pops on hover (CSS) and reacts when clicked or tapped
// (sparkles, hearts, notes, wiggles). There is deliberately no dragging.
const SELECTOR = '.sparkle, .art-sticker, .sticker-text, .main-cut, .main-img, .burst, .stamp, .a1, .sc1'
function speedUp(el) {
  el.classList.add('fast')
  setTimeout(() => el.classList.remove('fast'), 2500)
}

function react(el, stage, x, y) {
  if (el.classList.contains('art-sticker')) {
    switch (el.dataset.sticker) {
      case 'heart':
        wiggle(el)
        particles(stage, x, y, 'heart', 9, { rise: true, size: 2.4 })
        break
      case 'cassette':
      case 'vinyl':
        wiggle(el)
        speedUp(el)
        particles(stage, x, y, 'note', 7, { rise: true, size: 2.4 })
        break
      case 'flower':
        if (!reduced()) {
          el.animate(
            [{ rotate: '0deg', scale: 1 }, { rotate: '200deg', scale: 1.4 }, { rotate: '360deg', scale: 1 }],
            { duration: 900, easing: 'cubic-bezier(.3,1.4,.5,1)' },
          )
        }
        particles(stage, x, y, 'sparkle', 9)
        break
      default:
        wiggle(el)
        particles(stage, x, y, 'sparkle', 9)
    }
  } else if (el.classList.contains('stamp')) {
    if (!reduced()) el.animate([{ rotate: '0deg' }, { rotate: '360deg' }], { duration: 900, easing: 'cubic-bezier(.3,1,.4,1)' })
    particles(stage, x, y, 'sparkle', 8, { size: 1.8 })
  } else if (el.classList.contains('sparkle')) {
    if (!reduced()) {
      el.animate(
        [{ scale: 1, rotate: '0deg' }, { scale: 1.8, rotate: '180deg' }, { scale: 1, rotate: '360deg' }],
        { duration: 700, easing: 'ease-out' },
      )
    }
    particles(stage, x, y, 'sparkle', 10, { spread: 90, size: 1.8 })
  } else {
    const title = el.classList.contains('sticker-text')
    wiggle(el)
    particles(stage, x, y, 'sparkle', title ? 10 : 8, { size: title ? 2 : 1.8 })
  }
}

export default function useHeroInteractions(stageRef) {
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    stage.querySelectorAll(SELECTOR).forEach((el) => el.classList.add('ix'))

    const onClick = (e) => {
      const el = e.target.closest(SELECTOR)
      if (el && stage.contains(el)) react(el, stage, e.clientX, e.clientY)
    }

    stage.addEventListener('click', onClick)
    return () => stage.removeEventListener('click', onClick)
  }, [stageRef])
}
