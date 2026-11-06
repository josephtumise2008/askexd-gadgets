import { useEffect, useRef, useState } from 'react'

const R = 26
const C = 2 * Math.PI * R

/** Floating "Back to top" button with a ring that fills as you scroll. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  const ring = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      setShow(window.scrollY > 600)
      ring.current?.style.setProperty('stroke-dashoffset', String(C * (1 - p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      className={`to-top ${show ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <span className="to-top__label">Back to top</span>
      <span className="to-top__orb">
        <svg className="to-top__ring" viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="30" cy="30" r={R} className="to-top__track" />
          <circle ref={ring} cx="30" cy="30" r={R} className="to-top__fill" strokeDasharray={C} strokeDashoffset={C} />
        </svg>
        <svg className="to-top__arrow" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
    </button>
  )
}
