import { useEffect, useState, type CSSProperties } from 'react'
import { site } from '../config/site'
import { useStore } from '../context/StoreContext'
import { products, type Product } from '../data/products'
import { formatNaira, whatsappLink } from '../utils/whatsapp'
import { DeviceArt } from './DeviceArt'
import { WhatsAppIcon } from './icons'

interface Feature {
  product: Product
  kicker: string
}

const pick = (id: string) => products.find((p) => p.id === id)!

const featured: Feature[] = [
  { product: pick('mbp-14-m5-max'), kicker: 'Just landed · Open box' },
  { product: pick('gaming-ultra9-rtx5070'), kicker: 'For gamers & creators' },
  { product: pick('iphone-17-pro-max'), kicker: 'The latest iPhone' },
  { product: pick('ipad-pro-m4-13'), kicker: 'Recently delivered to Benin' },
]

const promises = [
  { t: 'Shop with confidence', d: 'Condition, specs and battery health stated upfront.' },
  { t: 'Swap & upgrade', d: 'Trade in your old device and top up the difference.' },
  { t: 'Pick up or delivery', d: 'Collect in Ikeja or get it delivered nationwide.' },
]

const DURATION = 6000

export function Hero() {
  const { openQuickView } = useStore()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % featured.length), DURATION)
    return () => window.clearTimeout(id)
  }, [index, paused])

  const current = featured[index]

  return (
    <section className="hero" id="top" style={{ '--accent': current.product.art.accent } as CSSProperties}>
      <div className="hero__aurora" />
      <div className="hero__grid-lines" />
      <div className="hero__grain" />

      <div className="container hero__grid">
        {/* ---------- Brand introduction ---------- */}
        <div className="hero__copy">
          <span className="pill">
            <i className="pill__dot" /> Ikeja Computer Village · Open 24/7
          </span>

          <h1 className="hero__title">
            Premium tech,
            <br />
            bought with <span className="hero__title-accent">peace of mind.</span>
          </h1>

          <p className="hero__lead">
            <strong>{site.name}</strong> is a registered gadget store in Lagos <span className="nowrap">(RC {site.rcNumber})</span>, trusted by{' '}
            {site.instagramFollowers} followers for clean MacBooks, gaming laptops, iPhones and iPads. No guesswork, no
            surprises. Just the right device at an honest price.
          </p>

          <ul className="hero__promises">
            {promises.map((p, i) => (
              <li key={p.t} style={{ '--i': i } as CSSProperties}>
                <span className="hero__tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                <span>
                  <strong>{p.t}</strong>
                  <small>{p.d}</small>
                </span>
              </li>
            ))}
          </ul>

          <div className="hero__cta">
            <a className="btn btn--lime btn--lg" href="#shop">
              Shop gadgets <span aria-hidden="true">→</span>
            </a>
            <a
              className="btn btn--ghost btn--lg"
              href={whatsappLink(`Hi ${site.name}, I'd like to know what you have in stock.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="btn__icon" /> Talk to us
            </a>
          </div>
        </div>

        {/* ---------- Featured deals showcase ---------- */}
        <div className="showcase" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="showcase__stage">
            <div className="showcase__halo" />
            <div className="showcase__ring" />
            {featured.map((f, i) => (
              <div key={f.product.id} className={`showcase__item ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
                {f.product.images?.[0] ? (
                  <div className="showcase__photo">
                    <img src={f.product.images[0]} alt={f.product.name} />
                  </div>
                ) : (
                  <div className="showcase__art">
                    <DeviceArt kind={f.product.art.kind} accent={f.product.art.accent} />
                  </div>
                )}
              </div>
            ))}
            <div className="showcase__floor" />

            <div className="float-card float-card--a">
              <small>{site.challenge.month.split(' ')[0]} challenge</small>
              <strong>
                {site.challenge.sold}/{site.challenge.goal} sold 🔥
              </strong>
            </div>
          </div>

          <div className="showcase__card">
            <div className="showcase__info" aria-live="polite">
              {featured.map((f, i) => (
                <div key={f.product.id} className={`showcase__text ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
                  <small>{f.kicker}</small>
                  <strong>{f.product.name}</strong>
                  <span>{formatNaira(f.product.price)}</span>
                </div>
              ))}
            </div>
            <button type="button" className="btn btn--navy btn--sm" onClick={() => openQuickView(current.product)}>
              View deal
            </button>
            <div className="showcase__bars" role="tablist" aria-label="Featured deals">
              {featured.map((f, i) => (
                <button
                  key={f.product.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={f.product.name}
                  className={`showcase__bar ${i === index ? 'is-active' : ''} ${i < index ? 'is-done' : ''} ${paused ? 'is-paused' : ''}`}
                  style={{ '--dur': `${DURATION}ms` } as CSSProperties}
                  onClick={() => setIndex(i)}
                >
                  <i />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container hero__stats">
        <div>
          <b>{site.instagramFollowers}</b>
          <span>Instagram followers</span>
        </div>
        <div>
          <b>{products.length}+</b>
          <span>Gadgets in store</span>
        </div>
        <div>
          <b>24/7</b>
          <span>Always open</span>
        </div>
        <div>
          <b>Nationwide</b>
          <span>Delivery or pick-up</span>
        </div>
      </div>
    </section>
  )
}
