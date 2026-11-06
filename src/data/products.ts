/**
 * Product catalogue.
 *
 * NOTE: Prices marked `placeholder` are sample market prices for the demo.
 * Replace them with the shop's real prices before going live.
 *
 * To add a product photo: put it in /public/products and add its path to `images`.
 * Products without photos use a generated device illustration (`art`).
 */

export type Category = 'macbook' | 'laptop' | 'gaming' | 'phone' | 'tablet' | 'desktop' | 'accessory'

export type ArtKind =
  | 'macbook'
  | 'laptop'
  | 'gaming'
  | 'iphone'
  | 'android'
  | 'tablet'
  | 'desktop'
  | 'audio'
  | 'watch'
  | 'console'

export type Condition = 'Brand new' | 'Open box' | 'UK used' | 'US used'

export interface Product {
  id: string
  name: string
  brand: string
  category: Category
  condition: Condition
  price: number
  /** Crossed-out price, if on offer. */
  was?: number
  specs: string[]
  highlights: string[]
  art: { kind: ArtKind; accent: string }
  images?: string[]
  badge?: string
  featured?: boolean
  /** True when the price is a sample, not the shop's real price. */
  placeholder?: boolean
}

export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: 'macbook', label: 'MacBooks', blurb: 'Air & Pro, M1 to M5' },
  { id: 'laptop', label: 'Windows laptops', blurb: 'Dell, HP, Lenovo' },
  { id: 'gaming', label: 'Gaming', blurb: 'RTX power machines' },
  { id: 'phone', label: 'Phones', blurb: 'iPhone & Samsung' },
  { id: 'tablet', label: 'iPads', blurb: 'For work & school' },
  { id: 'desktop', label: 'Desktops', blurb: 'Mac mini & iMac' },
  { id: 'accessory', label: 'Accessories', blurb: 'Audio, watch, gaming' },
]

export const products: Product[] = [
  // ---------- MacBooks ----------
  {
    id: 'mbp-14-m5-max',
    name: 'MacBook Pro 14″ M5 Max',
    brand: 'Apple',
    category: 'macbook',
    condition: 'Open box',
    price: 4_200_000,
    specs: ['36GB RAM', '2TB SSD', 'Space Black'],
    highlights: ['Open box, premium condition', 'Liquid Retina XDR display', 'Serious power for pros'],
    art: { kind: 'macbook', accent: '#5b4bff' },
    images: ['/products/macbook-pro-m5-max.jpg'],
    badge: 'New arrival',
    featured: true,
  },
  {
    id: 'mbp-14-m4-pro',
    name: 'MacBook Pro 14″ M4 Pro',
    brand: 'Apple',
    category: 'macbook',
    condition: 'UK used',
    price: 3_100_000,
    specs: ['24GB RAM', '1TB SSD', 'Space Black'],
    highlights: ['Battery health 95%+', 'Nano-texture option', 'Thunderbolt 5'],
    art: { kind: 'macbook', accent: '#ff6a3d' },
    placeholder: true,
  },
  {
    id: 'mbp-14-m3-pro',
    name: 'MacBook Pro 14″ M3 Pro',
    brand: 'Apple',
    category: 'macbook',
    condition: 'UK used',
    price: 2_350_000,
    specs: ['18GB RAM', '512GB SSD', 'Space Black'],
    highlights: ['Up to 18hrs battery', 'ProMotion 120Hz', 'Clean, no dents'],
    art: { kind: 'macbook', accent: '#00b4d8' },
    placeholder: true,
  },
  {
    id: 'mbp-16-m2-pro',
    name: 'MacBook Pro 16″ M2 Pro',
    brand: 'Apple',
    category: 'macbook',
    condition: 'UK used',
    price: 2_100_000,
    specs: ['16GB RAM', '1TB SSD', 'Silver'],
    highlights: ['Big 16″ XDR screen', 'HDMI + SD card slot', 'Great for editors'],
    art: { kind: 'macbook', accent: '#e63973' },
    placeholder: true,
  },
  {
    id: 'mbp-14-m1-pro',
    name: 'MacBook Pro 14″ M1 Pro',
    brand: 'Apple',
    category: 'macbook',
    condition: 'UK used',
    price: 1_250_000,
    specs: ['16GB RAM', '512GB SSD', 'Space Grey'],
    highlights: ['Customer favourite', 'Battery health 90%+', 'Mini-LED display'],
    art: { kind: 'macbook', accent: '#8cc63f' },
    badge: 'Best seller',
  },
  {
    id: 'mba-15-m4',
    name: 'MacBook Air 15″ M4',
    brand: 'Apple',
    category: 'macbook',
    condition: 'Brand new',
    price: 1_750_000,
    specs: ['16GB RAM', '512GB SSD', 'Sky Blue'],
    highlights: ['Sealed in box', 'Apple warranty', 'Silent, fanless design'],
    art: { kind: 'macbook', accent: '#5aa9e6' },
    badge: 'Brand new',
    placeholder: true,
  },
  {
    id: 'mba-13-m3',
    name: 'MacBook Air 13″ M3',
    brand: 'Apple',
    category: 'macbook',
    condition: 'UK used',
    price: 1_350_000,
    specs: ['16GB RAM', '512GB SSD', 'Midnight'],
    highlights: ['Feather-light 1.24kg', 'All-day battery', 'Perfect for students'],
    art: { kind: 'macbook', accent: '#2f3e9e' },
    placeholder: true,
  },
  {
    id: 'mba-13-m2',
    name: 'MacBook Air 13″ M2',
    brand: 'Apple',
    category: 'macbook',
    condition: 'UK used',
    price: 850_000,
    specs: ['8GB RAM', '256GB SSD', 'Starlight'],
    highlights: ['MagSafe charging', '1080p camera', 'Battery health 88%+'],
    art: { kind: 'macbook', accent: '#d9a441' },
    placeholder: true,
  },
  {
    id: 'mba-13-m1',
    name: 'MacBook Air 13″ M1',
    brand: 'Apple',
    category: 'macbook',
    condition: 'UK used',
    price: 520_000,
    specs: ['8GB RAM', '256GB SSD', 'Gold'],
    highlights: ['Best value MacBook', 'Great for school & office', 'Clean deal'],
    art: { kind: 'macbook', accent: '#f2b8a2' },
    badge: 'Budget pick',
    placeholder: true,
  },

  // ---------- Windows laptops ----------
  {
    id: 'hp-spectre-x360-14',
    name: 'HP Spectre x360 14',
    brand: 'HP',
    category: 'laptop',
    condition: 'UK used',
    price: 1_150_000,
    specs: ['Core i7', '16GB RAM', '1TB SSD', '2.8K OLED'],
    highlights: ['360° flip touchscreen', 'Pen support', 'Premium gem-cut design'],
    art: { kind: 'laptop', accent: '#c58b4d' },
    placeholder: true,
  },
  {
    id: 'dell-xps-13',
    name: 'Dell XPS 13 9310',
    brand: 'Dell',
    category: 'laptop',
    condition: 'UK used',
    price: 850_000,
    specs: ['Core i7 11th Gen', '16GB RAM', '512GB SSD', 'Touch'],
    highlights: ['InfinityEdge display', 'Carbon fibre palm rest', 'Ultra-portable'],
    art: { kind: 'laptop', accent: '#3a86ff' },
    placeholder: true,
  },
  {
    id: 'thinkpad-x1-carbon-9',
    name: 'Lenovo ThinkPad X1 Carbon Gen 9',
    brand: 'Lenovo',
    category: 'laptop',
    condition: 'UK used',
    price: 720_000,
    specs: ['Core i7', '16GB RAM', '512GB SSD'],
    highlights: ['Legendary keyboard', 'Business-grade durability', 'Only 1.1kg'],
    art: { kind: 'laptop', accent: '#e63946' },
    placeholder: true,
  },
  {
    id: 'dell-latitude-7400-x360',
    name: 'Dell Latitude 7400 x360',
    brand: 'Dell',
    category: 'laptop',
    condition: 'UK used',
    price: 500_000,
    specs: ['Core i7', '16GB RAM', '512GB SSD', 'Touchscreen'],
    highlights: ['2-in-1 convertible', 'Backlit keyboard', 'Fingerprint reader'],
    art: { kind: 'laptop', accent: '#4361ee' },
  },
  {
    id: 'hp-elitebook-840-g6',
    name: 'HP EliteBook 840 G6',
    brand: 'HP',
    category: 'laptop',
    condition: 'UK used',
    price: 380_000,
    specs: ['Core i5 8th Gen', '16GB RAM', '256GB SSD'],
    highlights: ['Solid office workhorse', 'Aluminium body', 'Great battery'],
    art: { kind: 'laptop', accent: '#4cc9f0' },
    badge: 'Budget pick',
    placeholder: true,
  },

  // ---------- Gaming ----------
  {
    id: 'gaming-ultra9-rtx5070',
    name: 'Gaming Laptop · Core Ultra 9 275HX',
    brand: 'Gaming',
    category: 'gaming',
    condition: 'Brand new',
    price: 2_550_000,
    specs: ['RTX 5070 8GB', '32GB RAM', '1TB SSD', '16″ 2.5K OLED 165Hz'],
    highlights: ['Original charger included', 'OLED 165Hz panel', 'Next-gen RTX 50 series'],
    art: { kind: 'gaming', accent: '#00f5d4' },
    badge: 'Beast mode',
    featured: true,
  },
  {
    id: 'lenovo-legion-5-rtx4070',
    name: 'Lenovo Legion 5 Pro',
    brand: 'Lenovo',
    category: 'gaming',
    condition: 'UK used',
    price: 1_900_000,
    specs: ['Ryzen 7', 'RTX 4070', '32GB RAM', '1TB SSD'],
    highlights: ['16″ 240Hz display', 'Cool & quiet', 'RGB keyboard'],
    art: { kind: 'gaming', accent: '#ff006e' },
    placeholder: true,
  },
  {
    id: 'asus-rog-strix-g16',
    name: 'ASUS ROG Strix G16',
    brand: 'ASUS',
    category: 'gaming',
    condition: 'UK used',
    price: 1_650_000,
    specs: ['Core i7 13th Gen', 'RTX 4060', '16GB RAM', '1TB SSD'],
    highlights: ['165Hz display', 'Aura Sync RGB', 'MUX switch'],
    art: { kind: 'gaming', accent: '#f72585' },
    placeholder: true,
  },
  {
    id: 'gaming-i9-rtx3070',
    name: 'Gaming Laptop · Core i9 13th Gen',
    brand: 'Gaming',
    category: 'gaming',
    condition: 'UK used',
    price: 1_550_000,
    specs: ['RTX 3070', '32GB RAM', '1TB SSD'],
    highlights: ['Beast mode activated', 'Plays every AAA title', 'Ready for streaming'],
    art: { kind: 'gaming', accent: '#7209b7' },
  },
  {
    id: 'msi-katana-15',
    name: 'MSI Katana 15',
    brand: 'MSI',
    category: 'gaming',
    condition: 'UK used',
    price: 1_150_000,
    specs: ['Core i7 12th Gen', 'RTX 4050', '16GB RAM', '512GB SSD'],
    highlights: ['144Hz display', 'Red backlit keyboard', 'Entry-level beast'],
    art: { kind: 'gaming', accent: '#ef233c' },
    placeholder: true,
  },

  // ---------- Phones ----------
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'phone',
    condition: 'Brand new',
    price: 2_450_000,
    specs: ['256GB', 'Cosmic Orange', 'eSIM'],
    highlights: ['Sealed in box', '48MP Pro camera system', 'A19 Pro chip'],
    art: { kind: 'iphone', accent: '#ff7a1a' },
    badge: 'Latest',
    featured: true,
    placeholder: true,
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'phone',
    condition: 'UK used',
    price: 1_750_000,
    specs: ['256GB', 'Desert Titanium', 'Battery 95%'],
    highlights: ['Camera Control button', 'Titanium design', 'Face ID perfect'],
    art: { kind: 'iphone', accent: '#c8a27a' },
    placeholder: true,
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'phone',
    condition: 'UK used',
    price: 1_150_000,
    specs: ['256GB', 'Natural Titanium', 'Battery 90%'],
    highlights: ['Action button', 'USB-C', 'Clean, no scratches'],
    art: { kind: 'iphone', accent: '#a7a39a' },
    placeholder: true,
  },
  {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    category: 'phone',
    condition: 'UK used',
    price: 850_000,
    specs: ['256GB', 'Deep Purple', 'Battery 87%'],
    highlights: ['Dynamic Island', 'Always-on display', '48MP camera'],
    art: { kind: 'iphone', accent: '#6c4f8c' },
    placeholder: true,
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    brand: 'Apple',
    category: 'phone',
    condition: 'UK used',
    price: 430_000,
    specs: ['128GB', 'Midnight', 'Battery 85%'],
    highlights: ['Great everyday phone', 'Dual camera', 'Face ID perfect'],
    art: { kind: 'iphone', accent: '#1d2b53' },
  },
  {
    id: 'iphone-12-pro-max',
    name: 'iPhone 12 Pro Max',
    brand: 'Apple',
    category: 'phone',
    condition: 'UK used',
    price: 390_000,
    specs: ['256GB', 'Silver', 'Service battery'],
    highlights: ['Big 6.7″ display', 'LiDAR scanner', 'Value pick'],
    art: { kind: 'iphone', accent: '#bfc5cc' },
    images: ['/products/iphone-12-pro-max.jpg'],
    badge: 'Value',
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'phone',
    condition: 'UK used',
    price: 1_250_000,
    specs: ['256GB', 'Titanium Black', 'S Pen'],
    highlights: ['200MP camera', 'Galaxy AI', 'Built-in S Pen'],
    art: { kind: 'android', accent: '#5e60ce' },
    placeholder: true,
  },

  // ---------- Tablets ----------
  {
    id: 'ipad-pro-m4-13',
    name: 'iPad Pro 13″ M4 Cellular',
    brand: 'Apple',
    category: 'tablet',
    condition: 'UK used',
    price: 2_400_000,
    specs: ['256GB', 'Wi-Fi + Cellular', 'Tandem OLED'],
    highlights: ['Thinnest Apple device ever', 'Ultra Retina XDR', 'Works with Pencil Pro'],
    art: { kind: 'tablet', accent: '#7b2ff7' },
    featured: true,
  },
  {
    id: 'ipad-air-m2-11',
    name: 'iPad Air 11″ M2',
    brand: 'Apple',
    category: 'tablet',
    condition: 'UK used',
    price: 850_000,
    specs: ['128GB', 'Wi-Fi', 'Space Grey'],
    highlights: ['M2 power', 'Landscape camera', 'Pencil Pro support'],
    art: { kind: 'tablet', accent: '#4ea8de' },
    placeholder: true,
  },
  {
    id: 'ipad-10',
    name: 'iPad 10th Gen',
    brand: 'Apple',
    category: 'tablet',
    condition: 'UK used',
    price: 420_000,
    specs: ['64GB', 'Wi-Fi', 'Blue'],
    highlights: ['USB-C', 'Great for kids & school', 'All-day battery'],
    art: { kind: 'tablet', accent: '#48bfe3' },
    placeholder: true,
  },

  // ---------- Desktops ----------
  {
    id: 'mac-mini-monitor',
    name: 'Mac mini + Maxview Monitor',
    brand: 'Apple',
    category: 'desktop',
    condition: 'UK used',
    price: 1_300_000,
    specs: ['16GB RAM', '256GB SSD'],
    highlights: ['Free Maxview monitor included', 'Tiny but powerful', 'Ready to plug & work'],
    art: { kind: 'desktop', accent: '#8cc63f' },
    badge: 'Bundle deal',
  },
  {
    id: 'imac-24-m3',
    name: 'iMac 24″ M3',
    brand: 'Apple',
    category: 'desktop',
    condition: 'UK used',
    price: 1_600_000,
    specs: ['8GB RAM', '256GB SSD', 'Blue'],
    highlights: ['4.5K Retina display', 'All-in-one', 'Magic Keyboard included'],
    art: { kind: 'desktop', accent: '#3a86ff' },
    placeholder: true,
  },

  // ---------- Accessories ----------
  {
    id: 'nintendo-switch-oled',
    name: 'Nintendo Switch OLED',
    brand: 'Nintendo',
    category: 'accessory',
    condition: 'UK used',
    price: 550_000,
    specs: ['64GB', 'White Joy-Con', 'Dock included'],
    highlights: ['7″ OLED screen', 'Play anywhere', 'Clean condition'],
    art: { kind: 'console', accent: '#e60012' },
  },
  {
    id: 'apple-watch-s9',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    category: 'accessory',
    condition: 'UK used',
    price: 420_000,
    specs: ['45mm', 'GPS', 'Midnight'],
    highlights: ['Double-tap gesture', 'Always-on Retina', 'Health tracking'],
    art: { kind: 'watch', accent: '#ff375f' },
    placeholder: true,
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2',
    brand: 'Apple',
    category: 'accessory',
    condition: 'Brand new',
    price: 250_000,
    specs: ['USB-C case', 'ANC', 'Adaptive Audio'],
    highlights: ['Sealed in box', 'Active noise cancellation', 'Hearing health features'],
    art: { kind: 'audio', accent: '#9aa5b1' },
    placeholder: true,
  },
]

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort()
