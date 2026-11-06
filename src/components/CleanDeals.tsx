import { site } from '../config/site'
import { soldDeals } from '../data/deals'
import { formatNaira } from '../utils/whatsapp'
import { Reveal } from './Reveal'

export function CleanDeals() {
  // Doubled so the marquee loops seamlessly.
  const loop = [...soldDeals, ...soldDeals]

  return (
    <section className="section deals" id="deals">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="eyebrow">Recently sold</p>
            <h2>Clean deals only</h2>
          </div>
          <a
            className="deals__ig"
            href={`https://instagram.com/${site.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            See every deal on Instagram →
          </a>
        </Reveal>
      </div>

      <div className="marquee" aria-label="Recently sold gadgets">
        <ul className="marquee__track">
          {loop.map((d, i) => (
            <li key={i} className="deal" aria-hidden={i >= soldDeals.length}>
              <span className="deal__sold">Sold</span>
              <strong>{d.item}</strong>
              <span className="deal__price">{formatNaira(d.price)}</span>
              {d.note && <span className="deal__note">{d.note}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="container deals__grid">
        <Reveal className="story">
          <p className="eyebrow">After-sales</p>
          <blockquote>
            “A customer returned today with an issue on a laptop bought in April, and we exchanged it
            immediately.”
          </blockquote>
          <p className="story__tag">Peace of mind na the goal.</p>
        </Reveal>

        <Reveal className="swaps" delay={80}>
          <p className="eyebrow">Real customers</p>
          <h3>Watch real buyers pick up their gadgets.</h3>
          <p className="swaps__text">
            Every deal on this page was recorded live in our office. See the videos and customer reviews on our
            Instagram highlights.
          </p>
          <a
            className="btn btn--navy"
            href={`https://instagram.com/${site.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Instagram
          </a>
        </Reveal>

        <Reveal className="cities" delay={160}>
          <p className="eyebrow">Delivered across Nigeria</p>
          <h3>Customers buy from everywhere.</h3>
          <ul>
            {site.deliveryCities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="cities__foot">Askexd Gadgets · Everywhere good</p>
        </Reveal>
      </div>
    </section>
  )
}
