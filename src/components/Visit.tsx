import { site } from '../config/site'
import { whatsappLink } from '../utils/whatsapp'
import { Reveal } from './Reveal'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`

export function Visit() {
  return (
    <section className="section" id="visit">
      <div className="container">
        <Reveal className="visit">
          <div className="visit__copy">
            <p className="eyebrow">Visit or order</p>
            <h2>Come see it before you buy it.</h2>
            <p>
              Walk into our shop in Computer Village or send us a message. We'll help you pick the right
              device for your work, school or business.
            </p>
            <div className="visit__cta">
              <a className="btn btn--wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
              <a className="btn btn--ghost" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
            </div>
          </div>
          <dl className="visit__info">
            <div>
              <dt>Address</dt>
              <dd>{site.address}</dd>
            </div>
            <div>
              <dt>Phone / WhatsApp</dt>
              <dd>
                <a href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer">
                  @{site.instagram}
                </a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{site.hours}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
