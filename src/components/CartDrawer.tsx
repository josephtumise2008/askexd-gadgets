import { useStore } from '../context/StoreContext'
import { formatNaira } from '../utils/whatsapp'
import { DeviceArt } from './DeviceArt'

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, cartTotal, setCheckoutOpen } = useStore()

  return (
    <div className={`drawer ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen}>
      <div className="drawer__scrim" onClick={() => setCartOpen(false)} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Your cart">
        <header className="drawer__head">
          <h3>Your cart</h3>
          <button type="button" className="modal__close modal__close--static" onClick={() => setCartOpen(false)} aria-label="Close cart">
            ×
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="drawer__empty">
            <p>Your cart is empty.</p>
            <a href="#shop" className="btn btn--navy" onClick={() => setCartOpen(false)}>
              Browse gadgets
            </a>
          </div>
        ) : (
          <>
            <ul className="drawer__lines">
              {cart.map(({ product: p, qty }) => (
                <li key={p.id} className="cart-line">
                  <div className="cart-line__img" style={{ background: `${p.art.accent}22` }}>
                    {p.images?.[0] ? <img src={p.images[0]} alt="" /> : <DeviceArt kind={p.art.kind} accent={p.art.accent} />}
                  </div>
                  <div className="cart-line__info">
                    <strong>{p.name}</strong>
                    <small>{p.specs.slice(0, 2).join(' · ')}</small>
                    <div className="qty">
                      <button type="button" onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => setQty(p.id, qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                  </div>
                  <b className="cart-line__price">{formatNaira(p.price * qty)}</b>
                </li>
              ))}
            </ul>
            <footer className="drawer__foot">
              <div className="drawer__total">
                <span>Subtotal</span>
                <b>{formatNaira(cartTotal)}</b>
              </div>
              <small>Delivery is calculated at checkout.</small>
              <button
                type="button"
                className="btn btn--lime btn--lg btn--block"
                onClick={() => {
                  setCartOpen(false)
                  setCheckoutOpen(true)
                }}
              >
                Checkout securely →
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
