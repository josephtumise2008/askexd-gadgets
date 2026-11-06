import { useRef, type PointerEvent } from 'react'
import { useStore } from '../context/StoreContext'
import type { Product } from '../data/products'
import { formatNaira, productEnquiry } from '../utils/whatsapp'
import { Carousel } from './Carousel'
import { WhatsAppIcon } from './icons'
import { getSlides, SlideView } from './ProductVisual'
import { Reveal } from './Reveal'

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { mode, addToCart, openQuickView } = useStore()
  const cardRef = useRef<HTMLDivElement>(null)
  const slides = getSlides(product)
  const { name, brand, condition, specs, price, was, badge, highlights, featured } = product

  // Gentle 3D tilt + cursor spotlight, batched into one update per frame.
  const frame = useRef(0)
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el || e.pointerType !== 'mouse') return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      const x = (clientX - r.left) / r.width
      const y = (clientY - r.top) / r.height
      el.classList.add('is-tilting')
      el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
      el.style.setProperty('--rx', `${((0.5 - y) * 3).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${((x - 0.5) * 4).toFixed(2)}deg`)
    })
  }
  const onLeave = () => {
    const el = cardRef.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.classList.remove('is-tilting')
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Reveal className="product-wrap" delay={(index % 4) * 70}>
      <div
        ref={cardRef}
        className={`product ${featured ? 'product--featured' : ''}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="product__media">
          <Carousel
            label={`${name} images`}
            count={slides.length}
            interval={2600}
            autoplayOnHover
            showArrows={false}
            renderSlide={(i) => <SlideView product={product} slide={slides[i]} />}
          />
          {badge && <span className="badge">{badge}</span>}
          <span className="product__condition">{condition}</span>

          <div className="product__overlay">
            <ul>
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <button type="button" className="btn btn--glass btn--sm" onClick={() => openQuickView(product)}>
              Quick view
            </button>
          </div>
        </div>

        <div className="product__body">
          <p className="product__brand">
            {brand} <span className="product__cond-inline">· {condition}</span>
          </p>
          <h3>
            <button type="button" className="product__title" onClick={() => openQuickView(product)}>
              {name}
            </button>
          </h3>
          <ul className="product__specs">
            {specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="product__foot">
            <div className="product__price">
              {formatNaira(price)}
              {was && <s>{formatNaira(was)}</s>}
            </div>
          </div>

          {mode === 'checkout' ? (
            <div className="product__actions">
              <button type="button" className="btn btn--navy btn--block" onClick={() => addToCart(product)}>
                Add to cart
              </button>
              <a
                className="btn btn--wa btn--icon"
                href={productEnquiry(product)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about ${name} on WhatsApp`}
              >
                <WhatsAppIcon className="btn__icon" />
              </a>
            </div>
          ) : (
            <a className="btn btn--wa btn--block" href={productEnquiry(product)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="btn__icon" /> Order on WhatsApp
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}
