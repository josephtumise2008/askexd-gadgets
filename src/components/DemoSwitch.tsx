import { useStore } from '../context/StoreContext'

/** Floating switch to preview both ordering options. Shown only with ?demo=1 in the URL. */
export function DemoSwitch() {
  const { demo, mode, setMode } = useStore()
  if (!demo) return null

  return (
    <div className="demo-switch" role="group" aria-label="Preview ordering option">
      <span>Preview</span>
      <button type="button" className={mode === 'whatsapp' ? 'is-on' : ''} onClick={() => setMode('whatsapp')}>
        WhatsApp orders
      </button>
      <button type="button" className={mode === 'checkout' ? 'is-on' : ''} onClick={() => setMode('checkout')}>
        Online payment
      </button>
    </div>
  )
}
