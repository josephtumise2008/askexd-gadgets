import type { CSSProperties } from 'react'
import { productCount, useStore } from '../context/StoreContext'
import { categories, products, type Category } from '../data/products'
import { DeviceArt } from './DeviceArt'
import { Reveal } from './Reveal'

const brandsLine = ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'MSI', 'Samsung', 'Nintendo']

function sampleFor(c: Category) {
  return products.find((p) => p.category === c)!
}

export function Categories() {
  const { setCategoryFilter } = useStore()

  const choose = (c: Category) => {
    setCategoryFilter(c)
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="section categories" id="categories">
      <div className="brand-strip" aria-label="Brands we sell">
        <div className="brand-strip__track">
          {[...brandsLine, ...brandsLine, ...brandsLine].map((b, i) => (
            <span key={i} aria-hidden={i >= brandsLine.length}>
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="eyebrow">Shop by category</p>
            <h2>Whatever you need, we have it.</h2>
          </div>
        </Reveal>

        <div className="cat-grid">
          {categories.map((c, i) => {
            const sample = sampleFor(c.id)
            return (
              <Reveal key={c.id} delay={(i % 4) * 70} className={`cat-wrap ${i === 0 ? 'cat-wrap--wide' : ''}`}>
                <button
                  type="button"
                  className="cat"
                  style={{ '--accent': sample.art.accent } as CSSProperties}
                  onClick={() => choose(c.id)}
                >
                  <span className="cat__text">
                    <strong>{c.label}</strong>
                    <small>{c.blurb}</small>
                    <em>{productCount(c.id)} items →</em>
                  </span>
                  <DeviceArt kind={sample.art.kind} accent={sample.art.accent} className="cat__art" />
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
