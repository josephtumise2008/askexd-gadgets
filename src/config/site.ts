/**
 * Business details and site behaviour for Askexd Gadgets.
 * Change values here and the whole site follows.
 */

export type OrderMode = 'whatsapp' | 'checkout'

export interface DeliveryOption {
  id: string
  label: string
  detail: string
  fee: number
}

export interface ChallengeMonth {
  month: string
  sold: number
  goal: number
}

export const site = {
  name: 'Askexd Gadgets',
  tagline: 'Tech is an investment, not an expense.',
  slogan: '…Discover the difference with us',
  whatsapp: '2349021445489',
  phoneDisplay: '+234 902 144 5489',
  instagram: 'askexdgadgets',
  instagramFollowers: '11.5K+',
  address: '9 Simbiat Abiola Way, Medical Road, Ikeja Computer Village, Lagos',
  hours: 'Open 24 hours, every day',
  rcNumber: '3412881',
  categories: 'Laptops · Phones · Accessories',
  deliveryCities: ['Ibadan', 'Gombe', 'Benin', 'Ogbomosho', 'Epe', 'Awoyaya', 'Lagos'],

  /**
   * How customers order.
   * - 'whatsapp': every button opens a WhatsApp chat with the product pre-filled.
   * - 'checkout': customers add to cart and pay on the website (Paystack).
   * Preview either one with ?mode=whatsapp or ?mode=checkout, or ?demo=1 for a switcher.
   */
  orderMode: 'whatsapp' as OrderMode,

  payments: {
    /** Paystack public key. Leave the placeholder to run checkout in demo mode (no real charge). */
    paystackPublicKey: 'pk_test_REPLACE_WITH_YOUR_KEY',
    /** Shown as the receiving account during checkout. */
    merchantLabel: 'Askexd Gadgets',
  },

  delivery: {
    /** Who handles delivery for website orders: the shop itself, or a logistics partner. */
    handledBy: 'shop' as 'shop' | 'partner',
    options: [
      { id: 'pickup', label: 'Office pick-up', detail: 'Computer Village, Ikeja · same day', fee: 0 },
      { id: 'lagos', label: 'Lagos delivery', detail: 'Within Lagos · 24 hours', fee: 5_000 },
      { id: 'nationwide', label: 'Nationwide delivery', detail: 'Any state in Nigeria · 2–4 days', fee: 15_000 },
    ] as DeliveryOption[],
  },

  /** The current monthly challenge. Update `sold` as laptops go out. */
  challenge: { month: 'November 2026', sold: 27, goal: 100 } as ChallengeMonth,

  /** Past challenges, newest first. Replace with the real numbers. */
  challengeHistory: [{ month: 'October 2026', sold: 100, goal: 100 }] as ChallengeMonth[],
}
