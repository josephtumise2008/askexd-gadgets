import { useState, type FormEvent } from 'react'
import { site } from '../config/site'
import { swapDeals } from '../data/deals'
import { categories, products } from '../data/products'
import { formatNaira, whatsappLink } from '../utils/whatsapp'
import { Reveal } from './Reveal'
import { Select } from './Select'

const groupLabel = (c: string) => categories.find((x) => x.id === c)?.label ?? c
const productOptions = categories.flatMap((c) =>
  products
    .filter((p) => p.category === c.id)
    .map((p) => ({ value: p.name, label: p.name, hint: formatNaira(p.price), group: groupLabel(p.category) })),
)
const conditionOptions = ['Like new', 'Good', 'Fair (scratches)', 'Faulty (screen, battery, etc.)'].map((c) => ({
  value: c,
  label: c,
}))

export function SwapRequest() {
  const [form, setForm] = useState({ device: '', condition: 'Good', wants: products[0].name })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const msg = `Hi ${site.name}, I want to swap.\n\nMy device: ${form.device}\nCondition: ${form.condition}\nI want: ${form.wants}\n\nI'll send photos now.`
    window.open(whatsappLink(msg), '_blank', 'noopener')
  }

  return (
    <section className="section" id="swap">
      <div className="container swap">
        <Reveal className="swap__copy">
          <p className="eyebrow">Swap & upgrade</p>
          <h2>Bring your old device. Top up. Leave with better.</h2>
          <p>Tell us what you have and what you want. We value it fairly and you pay only the difference.</p>
          <ul className="swap__proof">
            {swapDeals.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="swap__card" delay={100}>
          <form onSubmit={submit}>
            <label className="field">
              <span>Your current device</span>
              <input
                required
                placeholder="e.g. MacBook Pro 2019, 16GB / 512GB"
                value={form.device}
                onChange={(e) => setForm((f) => ({ ...f, device: e.target.value }))}
              />
            </label>
            <div className="field">
              <span>Condition</span>
              <Select
                label="Condition"
                value={form.condition}
                onChange={(v) => setForm((f) => ({ ...f, condition: v }))}
                options={conditionOptions}
              />
            </div>
            <div className="field">
              <span>What you want</span>
              <Select
                label="What you want"
                value={form.wants}
                onChange={(v) => setForm((f) => ({ ...f, wants: v }))}
                options={productOptions}
                searchable
              />
            </div>
            <button type="submit" className="btn btn--wa btn--lg btn--block">
              Get my swap value on WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
