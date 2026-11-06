import { useEffect, useState, type CSSProperties } from 'react'
import { site } from '../config/site'
import { useStore } from '../context/StoreContext'
import { whatsappLink } from '../utils/whatsapp'
import { WhatsAppIcon } from './icons'

const links = [
  { id: 'top', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'deals', label: 'Sold deals' },
  { id: 'swap', label: 'Swap' },
  { id: 'visit', label: 'Visit' },
]

export function Header() {
  const { mode, cartCount, setCartOpen } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [activeId, setActiveId] = useState('top')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      // Scroll-spy: the section that most recently passed under the header.
      let current = 'top'
      let best = -Infinity
      for (const l of links) {
        const el = document.getElementById(l.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= 120 && top > best) {
          best = top
          current = l.id
        }
      }
      setActiveId(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menu)
  }, [menu])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menu ? 'header--menu' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="header__logo" onClick={() => setMenu(false)} aria-label={`${site.name} home`}>
          <img src="/logo.png" alt={site.name} />
        </a>

        <nav aria-label="Main" className="header__nav">
          <ul className="header__links">
            {links.map((l, i) => (
              <li key={l.id} style={{ '--i': i } as CSSProperties}>
                <a
                  href={`#${l.id}`}
                  className={activeId === l.id ? 'is-active' : ''}
                  aria-current={activeId === l.id ? 'true' : undefined}
                  onClick={() => setMenu(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="header__menu-foot">
            <a
              className="btn btn--wa btn--lg btn--block"
              href={whatsappLink(`Hi ${site.name}, I saw your website and I'd like to make an enquiry.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="btn__icon" /> Chat on WhatsApp
            </a>
            <p>
              {site.hours} · {site.phoneDisplay}
            </p>
          </div>
        </nav>

        <div className="header__actions">
          {mode === 'checkout' && (
            <button type="button" className="cart-btn" onClick={() => setCartOpen(true)} aria-label={`Cart, ${cartCount} items`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
                <circle cx="10" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
              </svg>
              {cartCount > 0 && <span key={cartCount}>{cartCount}</span>}
            </button>
          )}
          <a
            className="btn btn--wa header__cta"
            href={whatsappLink(`Hi ${site.name}, I saw your website and I'd like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
          >
            <WhatsAppIcon className="btn__icon" />
            <span>Chat with us</span>
          </a>
          <button
            type="button"
            className="burger"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </div>
    </header>
  )
}
