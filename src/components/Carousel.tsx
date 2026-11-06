import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

interface CarouselProps {
  count: number
  renderSlide: (index: number, active: boolean) => ReactNode
  /** Autoplay interval in ms. 0 disables autoplay. */
  interval?: number
  /** Only autoplay while hovered (product cards). */
  autoplayOnHover?: boolean
  className?: string
  showArrows?: boolean
  label: string
  onIndexChange?: (i: number) => void
}

/** Lightweight swipeable carousel with dots, arrows and optional autoplay. */
export function Carousel({
  count,
  renderSlide,
  interval = 0,
  autoplayOnHover = false,
  className = '',
  showArrows = true,
  label,
  onIndexChange,
}: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const startX = useRef<number | null>(null)

  const go = useCallback(
    (i: number) => {
      const next = (i + count) % count
      setIndex(next)
      onIndexChange?.(next)
    },
    [count, onIndexChange],
  )

  const playing = interval > 0 && (autoplayOnHover ? hover : !hover)
  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => go(index + 1), interval)
    return () => window.clearInterval(id)
  }, [playing, interval, index, go])

  return (
    <div
      className={`carousel ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return
        const dx = e.clientX - startX.current
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
        startX.current = null
      }}
    >
      <div className="carousel__track">
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className={`carousel__slide ${i === index ? 'is-active' : ''}`}
            aria-hidden={i !== index}
          >
            {renderSlide(i, i === index)}
          </div>
        ))}
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev"
            aria-label="Previous slide"
            onClick={(e) => {
              e.stopPropagation()
              go(index - 1)
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            aria-label="Next slide"
            onClick={(e) => {
              e.stopPropagation()
              go(index + 1)
            }}
          >
            ›
          </button>
        </>
      )}

      {count > 1 && (
        <div className="carousel__dots">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`carousel__dot ${i === index ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                go(i)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
