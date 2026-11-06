import { site } from '../config/site'
import { whatsappLink } from '../utils/whatsapp'
import { WhatsAppIcon } from './icons'

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container footer__inner">
          <img src="/logo.png" alt={site.name} />
          <p>
            <em>{site.slogan}</em> · RC {site.rcNumber} · © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
      <a
        className="fab"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Askexd Gadgets on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </>
  )
}
