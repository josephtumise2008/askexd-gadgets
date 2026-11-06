import { useState, type FormEvent } from 'react'
import { site } from '../config/site'
import { useStore } from '../context/StoreContext'
import { paystackIsDemo, payWithPaystack } from '../utils/paystack'
import { formatNaira, whatsappLink } from '../utils/whatsapp'

type Stage = 'form' | 'paying' | 'done'

export function Checkout() {
  const { checkoutOpen, setCheckoutOpen, cart, cartTotal, clearCart } = useStore()
  const [stage, setStage] = useState<Stage>('form')
  const [deliveryId, setDeliveryId] = useState(site.delivery.options[0].id)
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', state: '' })
  const [reference, setReference] = useState('')
  const [error, setError] = useState('')

  if (!checkoutOpen) return null

  const delivery = site.delivery.options.find((o) => o.id === deliveryId)!
  const total = cartTotal + delivery.fee
  const needsAddress = delivery.id !== 'pickup'
  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const close = () => {
    setCheckoutOpen(false)
    if (stage === 'done') {
      setStage('form')
      clearCart()
    }
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setStage('paying')
    try {
      const ref = await payWithPaystack({
        email: form.email,
        amountNaira: total,
        metadata: {
          customer: form.name,
          phone: form.phone,
          delivery: delivery.label,
          address: needsAddress ? `${form.address}, ${form.state}` : 'Pick-up',
          items: cart.map((l) => `${l.qty} × ${l.product.name}`).join('; '),
        },
      })
      if (!ref) {
        setStage('form')
        return
      }
      setReference(ref)
      setStage('done')
    } catch {
      setError('Payment could not start. Please try again or order on WhatsApp.')
      setStage('form')
    }
  }

  const orderSummary = cart.map((l) => `• ${l.qty} × ${l.product.name} (${formatNaira(l.product.price)})`).join('\n')
  const confirmMsg = `Hi ${site.name}, I just paid on your website.\n\nRef: ${reference}\n${orderSummary}\nDelivery: ${delivery.label}${
    needsAddress ? ` — ${form.address}, ${form.state}` : ''
  }\nTotal: ${formatNaira(total)}\nName: ${form.name} · ${form.phone}`

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Checkout" onClick={close}>
      <div className="modal__panel checkout" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={close} aria-label="Close">
          ×
        </button>

        {stage === 'done' ? (
          <div className="checkout__done">
            <div className="checkout__tick">✓</div>
            <h2>Payment received!</h2>
            <p>
              Thank you, {form.name.split(' ')[0] || 'friend'}. Your order reference is <b>{reference}</b>.{' '}
              {delivery.id === 'pickup'
                ? 'Your gadget will be ready for pick-up at our Computer Village office.'
                : site.delivery.handledBy === 'shop'
                  ? 'Our team will call you to arrange delivery.'
                  : 'Our logistics partner will call you to arrange delivery.'}
            </p>
            <a className="btn btn--wa btn--lg" href={whatsappLink(confirmMsg)} target="_blank" rel="noopener noreferrer">
              Send receipt on WhatsApp
            </a>
            {paystackIsDemo() && <p className="checkout__demo">Demo mode: no real money was charged.</p>}
          </div>
        ) : (
          <form className="checkout__grid" onSubmit={submit}>
            <div className="checkout__form">
              <p className="eyebrow">Secure checkout</p>
              <h2>Where should we send it?</h2>

              <div className="field-row">
                <label className="field">
                  <span>Full name</span>
                  <input required value={form.name} onChange={update('name')} autoComplete="name" />
                </label>
                <label className="field">
                  <span>Phone (WhatsApp)</span>
                  <input required type="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" placeholder="080…" />
                </label>
              </div>
              <label className="field">
                <span>Email (for your receipt)</span>
                <input required type="email" value={form.email} onChange={update('email')} autoComplete="email" />
              </label>

              <fieldset className="delivery">
                <legend>Delivery</legend>
                {site.delivery.options.map((o) => (
                  <label key={o.id} className={`delivery__opt ${o.id === deliveryId ? 'is-on' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      value={o.id}
                      checked={o.id === deliveryId}
                      onChange={() => setDeliveryId(o.id)}
                    />
                    <span>
                      <strong>{o.label}</strong>
                      <small>{o.detail}</small>
                    </span>
                    <b>{o.fee ? formatNaira(o.fee) : 'Free'}</b>
                  </label>
                ))}
              </fieldset>

              {needsAddress && (
                <div className="field-row">
                  <label className="field field--grow">
                    <span>Delivery address</span>
                    <input required value={form.address} onChange={update('address')} autoComplete="street-address" />
                  </label>
                  <label className="field">
                    <span>State</span>
                    <input required value={form.state} onChange={update('state')} autoComplete="address-level1" />
                  </label>
                </div>
              )}
              <p className="checkout__note">
                {site.delivery.handledBy === 'shop'
                  ? `Deliveries are handled directly by ${site.name}.`
                  : 'Deliveries are handled by our trusted logistics partner.'}
              </p>
            </div>

            <aside className="checkout__summary">
              <h3>Order summary</h3>
              <ul>
                {cart.map((l) => (
                  <li key={l.product.id}>
                    <span>
                      {l.qty} × {l.product.name}
                    </span>
                    <b>{formatNaira(l.product.price * l.qty)}</b>
                  </li>
                ))}
                <li>
                  <span>{delivery.label}</span>
                  <b>{delivery.fee ? formatNaira(delivery.fee) : 'Free'}</b>
                </li>
              </ul>
              <div className="checkout__total">
                <span>Total</span>
                <b>{formatNaira(total)}</b>
              </div>
              {error && <p className="checkout__error">{error}</p>}
              <button type="submit" className="btn btn--lime btn--lg btn--block" disabled={stage === 'paying' || cart.length === 0}>
                {stage === 'paying' ? 'Opening secure payment…' : `Pay ${formatNaira(total)}`}
              </button>
              <p className="checkout__secure">🔒 Payments secured by Paystack · Card, transfer & USSD</p>
              {paystackIsDemo() && <p className="checkout__demo">Demo mode: no real charge will be made.</p>}
            </aside>
          </form>
        )}
      </div>
    </div>
  )
}
