import { useState } from 'react'
import { faqs } from '../data/deals'
import { Reveal } from './Reveal'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section section--white" id="faq">
      <div className="container faq">
        <Reveal className="faq__intro">
          <p className="eyebrow">Questions</p>
          <h2>Before you buy.</h2>
          <p>Still unsure? Send us a message. We reply any time, day or night.</p>
        </Reveal>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60} className={`faq__item ${open === i ? 'is-open' : ''}`}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <span aria-hidden="true">+</span>
              </button>
              <div className="faq__answer">
                <p>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
