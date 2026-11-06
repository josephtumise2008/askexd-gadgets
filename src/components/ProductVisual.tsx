import type { CSSProperties } from 'react'
import type { Product } from '../data/products'
import { formatNaira } from '../utils/whatsapp'
import { DeviceArt } from './DeviceArt'

export type Slide = { type: 'image'; src: string } | { type: 'art'; view: 'primary' | 'alt' } | { type: 'poster' }

/** Every product gets 3+ slides: its photos (if any), two illustrated angles, and a spec poster. */
export function getSlides(p: Product): Slide[] {
  const photos: Slide[] = (p.images ?? []).map((src) => ({ type: 'image', src }))
  return [...photos, { type: 'art', view: 'primary' }, { type: 'art', view: 'alt' }, { type: 'poster' }]
}

interface SlideViewProps {
  product: Product
  slide: Slide
  eager?: boolean
}

export function SlideView({ product, slide, eager }: SlideViewProps) {
  const { art } = product
  const bg = { '--accent': art.accent } as CSSProperties

  if (slide.type === 'image') {
    return (
      <div className="slide slide--photo" style={bg}>
        <img src={slide.src} alt={product.name} loading={eager ? 'eager' : 'lazy'} draggable={false} />
      </div>
    )
  }

  if (slide.type === 'art') {
    return (
      <div className={`slide slide--art ${slide.view === 'alt' ? 'slide--art-alt' : ''}`} style={bg}>
        <DeviceArt kind={art.kind} accent={art.accent} view={slide.view} />
      </div>
    )
  }

  return (
    <div className="slide slide--poster" style={bg}>
      <span className="poster__brand">{product.brand}</span>
      <strong className="poster__name">{product.name}</strong>
      <ul className="poster__specs">
        {product.specs.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <span className="poster__price">{formatNaira(product.price)}</span>
    </div>
  )
}
