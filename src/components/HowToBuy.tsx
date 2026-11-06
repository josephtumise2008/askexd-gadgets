import { site } from '../config/site'
import { useStore } from '../context/StoreContext'
import { Reveal } from './Reveal'

const whatsappSteps = [
  { t: 'Pick your gadget', d: 'Browse the store and tap “Order on WhatsApp” on what you like.' },
  { t: 'Chat with us', d: 'The product and price are already typed in. Ask anything, confirm availability.' },
  { t: 'Pay & confirm', d: 'Pay by transfer, or at our office if you are picking up.' },
  { t: 'Pick up or receive', d: 'Collect at Computer Village or we deliver to your state.' },
]

const checkoutSteps = [
  { t: 'Add to cart', d: 'Pick one or more gadgets and add them to your cart.' },
  { t: 'Choose delivery', d: 'Office pick-up, Lagos delivery or nationwide, with the fee shown upfront.' },
  { t: 'Pay securely', d: 'Pay with card, transfer or USSD via Paystack. You get an instant receipt.' },
  {
    t: 'We deliver',
    d:
      site.delivery.handledBy === 'shop'
        ? 'Our team calls you and ships it out, or it is ready for pick-up.'
        : 'Our logistics partner calls you and ships it out.',
  },
]

export function HowToBuy() {
  const { mode } = useStore()
  const steps = mode === 'checkout' ? checkoutSteps : whatsappSteps

  return (
    <section className="section section--dark how" id="how">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="eyebrow">How to buy</p>
            <h2>{mode === 'checkout' ? 'Pay online in four steps.' : 'From chat to doorstep in four steps.'}</h2>
          </div>
          <p className="section__lede">
            {mode === 'checkout'
              ? 'Shop and pay directly on our website, any time of day.'
              : 'No forms, no stress. Just a WhatsApp chat with a real person.'}
          </p>
        </Reveal>
        <ol className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 90} className="step">
              <span className="step__num">0{i + 1}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
