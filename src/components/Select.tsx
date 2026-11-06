import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'

export interface SelectOption {
  value: string
  label: string
  /** Optional small text on the right, e.g. a price. */
  hint?: string
  group?: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  label: string
  /** Show a search box inside the menu (for long lists). */
  searchable?: boolean
  className?: string
}

/** Premium dropdown: animated menu, grouping, search, keyboard support, bottom sheet on phones. */
export function Select({ value, onChange, options, label, searchable = false, className = '' }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const listId = useId()

  const current = options.find((o) => o.value === value)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? options.filter((o) => `${o.label} ${o.group ?? ''}`.toLowerCase().includes(q)) : options
  }, [options, query])

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // Focus search and highlight current option when opening.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(Math.max(0, options.findIndex((o) => o.value === value)))
    if (searchable && window.matchMedia('(min-width: 601px)').matches) {
      requestAnimationFrame(() => search.current?.focus())
    }
  }, [open, options, value, searchable])

  // Keep the highlighted option in view.
  useEffect(() => {
    if (!open) return
    root.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const choose = (v: string) => {
    onChange(v)
    setOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault()
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'Escape') {
      e.stopPropagation()
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const o = filtered[active]
      if (o) choose(o.value)
    }
  }

  let lastGroup: string | undefined

  return (
    <div ref={root} className={`select ${open ? 'is-open' : ''} ${className}`} onKeyDown={onKeyDown}>
      <button
        type="button"
        className="select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="select__value">{current?.label ?? label}</span>
        <svg className="select__chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className="select__scrim" onClick={() => setOpen(false)} aria-hidden="true" />

      <div className="select__menu" role="presentation">
        <div className="select__sheet-head">
          <strong>{label}</strong>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close">
            ×
          </button>
        </div>
        {searchable && (
          <div className="select__search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              ref={search}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActive(0)
              }}
              placeholder="Type to search…"
              aria-label={`Search ${label}`}
            />
          </div>
        )}
        <ul id={listId} role="listbox" aria-label={label} className="select__list">
          {filtered.length === 0 && <li className="select__empty">No match</li>}
          {filtered.map((o, i) => {
            const header = o.group && o.group !== lastGroup ? o.group : null
            lastGroup = o.group
            return (
              <li key={o.value} role="none">
                {header && <span className="select__group">{header}</span>}
                <button
                  type="button"
                  role="option"
                  aria-selected={o.value === value}
                  data-index={i}
                  className={`select__option ${i === active ? 'is-active' : ''} ${o.value === value ? 'is-selected' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(o.value)}
                >
                  <span>{o.label}</span>
                  {o.hint && <small>{o.hint}</small>}
                  {o.value === value && (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
