import { useState } from 'react'
import { site } from '../config/site'
import { useStore } from '../context/StoreContext'
import { formatNaira, productEnquiry } from '../utils/whatsapp'
import { WhatsAppIcon } from './icons'
import { getSlides, SlideView } from './ProductVisual'

export function QuickView() {
  const { quickView: p, closeQuickView, mode, addToCart } = useStore()
  const [active, setActive] = useState(0)
  const [lastId, setLastId] = useState<string | null>(null)

  // Reset gallery when a different product opens.
  if (p && p.id !== lastId) {
    setLastId(p.id)
    setActive(0)
  }

  if (!p) return null
  const slides = getSlides(p)

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={closeQuickView}>
      <div className="modal__panel qv" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={closeQuickView} aria-label="Close">
          ×
        </button>

        <div className="qv__gallery">
          <div className="qv__main" key={active}>
            <SlideView product={p} slide={slides[active]} eager />
          </div>
          <div className="qv__thumbs">
            {slides.map((s, i) => (
              <button
                key={i}
                type="button"
                className={`qv__thumb ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
              >
                <SlideView product={p} slide={s} />
              </button>
            ))}
          </div>
        </div>

        <div className="qv__info">
          <p className="product__brand">
            {p.brand} · {p.condition}
          </p>
          <h2>{p.name}</h2>
          <div className="qv__price">
            {formatNaira(p.price)}
            {p.was && <s>{formatNaira(p.was)}</s>}
          </div>

          <dl className="qv__specs">
            <div>
              <dt>Brand</dt>
              <dd>{p.brand}</dd>
            </div>
            <div>
              <dt>Condition</dt>
              <dd>{p.condition}</dd>
            </div>
            <div className="qv__specs-wide">
              <dt>Configuration</dt>
              <dd>{p.specs.join(' · ')}</dd>
            </div>
          </dl>

          <ul className="qv__highlights">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <div className="qv__delivery">
            {site.delivery.options.map((o) => (
              <div key={o.id}>
                <strong>{o.label}</strong>
                <span>{o.fee ? formatNaira(o.fee) : 'Free'}</span>
              </div>
            ))}
          </div>

          <div className="qv__actions">
            {mode === 'checkout' && (
              <button
                type="button"
                className="btn btn--navy btn--lg btn--block"
                onClick={() => {
                  addToCart(p)
                  closeQuickView()
                }}
              >
                Add to cart · {formatNaira(p.price)}
              </button>
            )}
            <a
              className={`btn btn--wa btn--lg btn--block ${mode === 'checkout' ? 'btn--soft' : ''}`}
              href={productEnquiry(p)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="btn__icon" />
              {mode === 'checkout' ? 'Ask a question on WhatsApp' : 'Order on WhatsApp'}
            </a>
          </div>
          <p className="qv__swap">
            Got an old device? <a href="#swap" onClick={closeQuickView}>Swap it and top up →</a>
          </p>
        </div>
      </div>
    </div>
  )
}
