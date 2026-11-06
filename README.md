# Askexd Gadgets — Website

React + TypeScript + Vite website for **Askexd Gadgets**, Ikeja Computer Village, Lagos.

## Run it

```bash
npm install
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).

## Build for hosting

```bash
npm run build
```

Upload the `dist/` folder to Netlify, Vercel or any static host.

## Two ordering options

Set `orderMode` in `src/config/site.ts`:

- `'whatsapp'` — every button opens WhatsApp with the product pre-filled.
- `'checkout'` — cart + online payment (Paystack) with delivery options.

Preview both without changing code: open `http://localhost:5173/?demo=1` for a switcher,
or `?mode=checkout` / `?mode=whatsapp`.

To take real payments: put the Paystack public key in `site.payments.paystackPublicKey`
and verify each payment reference on a server with the secret key before releasing goods.

## Where to edit

| What | File |
| --- | --- |
| Phone, address, Instagram, hours, order mode, delivery fees, monthly challenge + history | `src/config/site.ts` |
| Products (name, price, specs, photos) | `src/data/products.ts` |
| Sold deals, swaps, FAQ | `src/data/deals.ts` |
| Product photos | `public/products/` |
| Colours, fonts, spacing | `src/index.css` (top of the file) |

## Structure

```
src/
  components/   Hero (slider), Challenge, Categories, Shop, ProductCard, Carousel,
                DeviceArt, QuickView, CartDrawer, Checkout, CleanDeals, HowToBuy,
                SwapRequest, WhyUs, Faq, Visit, Footer, DemoSwitch
  context/      StoreContext.tsx (order mode, cart, quick view)
  config/       site.ts (business details)
  data/         products.ts (catalogue)
  hooks/        useInView.ts (scroll reveal)
  utils/        whatsapp.ts (wa.me links, ₦ formatting), paystack.ts
```
