import { BackToTop } from './components/BackToTop'
import { CartDrawer } from './components/CartDrawer'
import { Categories } from './components/Categories'
import { Challenge } from './components/Challenge'
import { Checkout } from './components/Checkout'
import { CleanDeals } from './components/CleanDeals'
import { DemoSwitch } from './components/DemoSwitch'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowToBuy } from './components/HowToBuy'
import { QuickView } from './components/QuickView'
import { ScrollProgress } from './components/ScrollProgress'
import { Shop } from './components/Shop'
import { SwapRequest } from './components/SwapRequest'
import { Visit } from './components/Visit'
import { WhyUs } from './components/WhyUs'
import { StoreProvider } from './context/StoreContext'

export default function App() {
  return (
    <StoreProvider>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Challenge />
        <Categories />
        <Shop />
        <CleanDeals />
        <HowToBuy />
        <SwapRequest />
        <WhyUs />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <QuickView />
      <CartDrawer />
      <Checkout />
      <BackToTop />
      <DemoSwitch />
    </StoreProvider>
  )
}
