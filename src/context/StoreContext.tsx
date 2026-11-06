import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { site, type OrderMode } from '../config/site'
import { products, type Category, type Product } from '../data/products'

export interface CartLine {
  product: Product
  qty: number
}

interface StoreValue {
  mode: OrderMode
  setMode: (m: OrderMode) => void
  demo: boolean

  cart: CartLine[]
  cartCount: number
  cartTotal: number
  addToCart: (p: Product) => void
  setQty: (id: string, qty: number) => void
  clearCart: () => void

  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  checkoutOpen: boolean
  setCheckoutOpen: (open: boolean) => void

  quickView: Product | null
  openQuickView: (p: Product) => void
  closeQuickView: () => void

  categoryFilter: Category | 'all'
  setCategoryFilter: (c: Category | 'all') => void
}

const StoreContext = createContext<StoreValue | null>(null)

function readInitialMode(): OrderMode {
  const q = new URLSearchParams(window.location.search).get('mode')
  return q === 'checkout' || q === 'whatsapp' ? q : site.orderMode
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<OrderMode>(readInitialMode)
  const [demo] = useState(() => new URLSearchParams(window.location.search).has('demo'))
  const [cart, setCart] = useState<CartLine[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all')

  const addToCart = useCallback((p: Product) => {
    setCart((lines) => {
      const found = lines.find((l) => l.product.id === p.id)
      if (found) return lines.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l))
      return [...lines, { product: p, qty: 1 }]
    })
    setCartOpen(true)
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setCart((lines) =>
      qty <= 0 ? lines.filter((l) => l.product.id !== id) : lines.map((l) => (l.product.id === id ? { ...l, qty } : l)),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  // Lock page scroll while any overlay is open.
  const overlayOpen = cartOpen || checkoutOpen || quickView !== null
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : ''
  }, [overlayOpen])

  // Close overlays with Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setQuickView(null)
      setCartOpen(false)
      setCheckoutOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo<StoreValue>(
    () => ({
      mode,
      setMode,
      demo,
      cart,
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      cartTotal: cart.reduce((n, l) => n + l.qty * l.product.price, 0),
      addToCart,
      setQty,
      clearCart,
      cartOpen,
      setCartOpen,
      checkoutOpen,
      setCheckoutOpen,
      quickView,
      openQuickView: setQuickView,
      closeQuickView: () => setQuickView(null),
      categoryFilter,
      setCategoryFilter,
    }),
    [mode, demo, cart, addToCart, setQty, clearCart, cartOpen, checkoutOpen, quickView, categoryFilter],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}

export const productCount = (c: Category) => products.filter((p) => p.category === c).length
