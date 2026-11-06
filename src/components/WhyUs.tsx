import type { ComponentType, SVGProps } from 'react'
import { CheckCircleIcon, ClockIcon, PinIcon, ShieldIcon, SwapIcon, TruckIcon } from './icons'
import { Reveal } from './Reveal'

interface Reason {
  title: string
  text: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

const reasons: Reason[] = [
  {
    title: 'Clean deals only',
    text: 'Specs, battery health and condition stated upfront. No surprises after you pay.',
    Icon: CheckCircleIcon,
  },
  {
    title: 'Peace of mind',
    text: 'If something goes wrong after you buy, talk to us. We sort it out, fast.',
    Icon: ShieldIcon,
  },
  {
    title: 'Swap & upgrade',
    text: 'Trade in your current laptop or phone, add a top-up, and walk away with something better.',
    Icon: SwapIcon,
  },
  {
    title: 'Nationwide delivery',
    text: 'From Ibadan to Gombe to Benin, we get your gadget to you wherever you are.',
    Icon: TruckIcon,
  },
  {
    title: 'Open 24 hours',
    text: "Message us any time. We're always available to attend to you.",
    Icon: ClockIcon,
  },
  {
    title: 'Pick-up in Ikeja',
    text: 'Prefer to see it first? Check your device in person at Computer Village.',
    Icon: PinIcon,
  },
]

export function WhyUs() {
  return (
    <section className="section section--white" id="why">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="eyebrow">Why Askexd · Home of Peace</p>
            <h2>Discover the difference with us</h2>
          </div>
        </Reveal>
        <div className="why-grid">
          {reasons.map(({ title, text, Icon }, i) => (
            <Reveal key={title} className="why-card" delay={(i % 3) * 80}>
              <span className="why-card__icon">
                <Icon />
              </span>
              <h4>{title}</h4>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
