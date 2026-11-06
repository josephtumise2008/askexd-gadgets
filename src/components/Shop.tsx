import { useMemo, useState } from 'react'
import { useStore } from '../context/StoreContext'
import { brands, categories, products } from '../data/products'
import { whatsappLink } from '../utils/whatsapp'
import { ProductCard } from './ProductCard'
import { Select } from './Select'
import { Reveal } from './Reveal'

type Sort = 'featured' | 'low' | 'high'
const PAGE = 12

export function Shop() {
  const { categoryFilter, setCategoryFilter } = useStore()
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('all')
  const [sort, setSort] = useState<Sort>('featured')
  const [limit, setLimit] = useState(PAGE)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = products.filter(
      (p) =>
        (categoryFilter === 'all' || p.category === categoryFilter) &&
        (brand === 'all' || p.brand === brand) &&
        (!q || `${p.name} ${p.brand} ${p.specs.join(' ')}`.toLowerCase().includes(q)),
    )
    if (sort === 'low') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'high') return [...list].sort((a, b) => b.price - a.price)
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  }, [query, brand, sort, categoryFilter])

  const reset = () => {
    setQuery('')
    setBrand('all')
    setCategoryFilter('all')
    setSort('featured')
  }

  return (
    <section className="section" id="shop">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="eyebrow">The store · {products.length} gadgets</p>
            <h2>Shop the latest gadgets</h2>
          </div>
          <p className="section__lede">
            Laptops, phones, iPads and accessories. Every price is clear, every condition stated.
          </p>
        </Reveal>

        <div className="toolbar">
          <div className="toolbar__search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="Search MacBook, RTX, iPhone 16…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setLimit(PAGE)
              }}
              aria-label="Search products"
            />
          </div>
          <Select
            label="Brand"
            value={brand}
            onChange={setBrand}
            options={[{ value: 'all', label: 'All brands' }, ...brands.map((b) => ({ value: b, label: b }))]}
          />
          <Select
            label="Sort by"
            value={sort}
            onChange={(v) => setSort(v as Sort)}
            options={[
              { value: 'featured', label: 'Featured first' },
              { value: 'low', label: 'Price: low to high' },
              { value: 'high', label: 'Price: high to low' },
            ]}
          />
        </div>

        <div className="chips" role="tablist" aria-label="Filter by category">
          <button
            role="tab"
            aria-selected={categoryFilter === 'all'}
            className={`chip ${categoryFilter === 'all' ? 'chip--active' : ''}`}
            onClick={() => setCategoryFilter('all')}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={categoryFilter === c.id}
              className={`chip ${categoryFilter === c.id ? 'chip--active' : ''}`}
              onClick={() => {
                setCategoryFilter(c.id)
                setLimit(PAGE)
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="empty">
            <h3>No gadget matches that yet.</h3>
            <p>We get new stock every day. Tell us what you want and we'll source it.</p>
            <div className="empty__cta">
              <a
                className="btn btn--wa"
                href={whatsappLink(`Hi Askexd Gadgets, I'm looking for: ${query || 'a gadget'}. Do you have it?`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Request it on WhatsApp
              </a>
              <button type="button" className="btn btn--outline" onClick={reset}>
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {visible.slice(0, limit).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
            {visible.length > limit && (
              <div className="more">
                <button type="button" className="btn btn--outline" onClick={() => setLimit((l) => l + PAGE)}>
                  Show more gadgets ({visible.length - limit} left)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
