import { site } from '../config/site'
import type { Product } from '../data/products'

/** Builds a wa.me link that opens a chat with the shop, optionally with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function productEnquiry(p: Product): string {
  return whatsappLink(
    `Hi ${site.name}, I'm interested in the ${p.name} (${p.specs.join(', ')}) at ${formatNaira(p.price)}. Is it still available?`,
  )
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}
