export interface SoldDeal {
  item: string
  price: number
  note?: string
}

/** Recent sold deals, taken from the shop's Instagram posts. */
export const soldDeals: SoldDeal[] = [
  { item: '16″ MacBook Pro · 32-core GPU', price: 4_850_000 },
  { item: 'iPad Pro M4 13″ Cellular', price: 2_400_000, note: 'Benin delivery' },
  { item: 'MacBook', price: 1_850_000, note: 'All the way from Gombe' },
  { item: '14″ · 32GB RAM · 1TB SSD', price: 1_680_000, note: 'Clean deals only' },
  { item: 'MacBook Pro M1 Pro · 16GB / 512GB', price: 1_250_000, note: 'All the way from Ibadan' },
  { item: 'Core i9 · 15″', price: 650_000, note: 'Office pick-up' },
  { item: 'Nintendo Switch OLED', price: 550_000 },
  { item: 'Core i7 · 15″', price: 530_000 },
  { item: 'Dell Latitude 7400 x360 · Touchscreen', price: 500_000 },
  { item: 'Core i7 · 16GB / 512GB', price: 500_000, note: 'Ogbomosho delivery' },
  { item: 'iPhone 13', price: 430_000 },
]

/** Swap deals: customer's old device + top-up. */
export const swapDeals: string[] = [
  'Swapped into an iPad 10th Gen + ₦1,500,000 top-up',
  'Swapped into an iPhone 16 + ₦1,250,000 top-up',
  'MacBook 2020 with broken screen swapped for an upgrade',
]

export const faqs: { q: string; a: string }[] = [
  {
    q: 'Are your gadgets original?',
    a: 'Yes. Every device is checked before it goes on sale, and we state the condition, battery health and specs upfront.',
  },
  {
    q: 'Can I swap my old laptop or phone?',
    a: 'Yes. Send us photos and details of your device on WhatsApp, we value it, and you top up the difference for your new gadget.',
  },
  {
    q: 'Do you deliver outside Lagos?',
    a: 'Yes, we deliver nationwide. Customers have bought from Ibadan, Gombe, Benin, Ogbomosho and more. You can also pick up at our Computer Village office.',
  },
  {
    q: 'What happens if something goes wrong after I buy?',
    a: 'Talk to us. Peace of mind is the goal, and we sort out genuine issues quickly, including exchanges.',
  },
  {
    q: 'How do I pay?',
    a: 'Order on WhatsApp and pay by transfer, or pay securely online at checkout when online payment is on. Pick-up customers can also pay at the office.',
  },
]
