import { site } from '../config/site'

interface PaystackTransaction {
  reference: string
}

interface PaystackPopInstance {
  newTransaction(options: {
    key: string
    email: string
    amount: number
    currency?: string
    metadata?: Record<string, unknown>
    onSuccess: (t: PaystackTransaction) => void
    onCancel: () => void
  }): void
}

declare global {
  interface Window {
    PaystackPop?: new () => PaystackPopInstance
  }
}

const SCRIPT = 'https://js.paystack.co/v2/inline.js'

export const paystackIsDemo = () => site.payments.paystackPublicKey.includes('REPLACE')

function loadScript(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SCRIPT
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Could not load Paystack'))
    document.head.appendChild(s)
  })
}

interface PayOptions {
  email: string
  amountNaira: number
  metadata: Record<string, unknown>
}

/**
 * Opens Paystack checkout. Resolves with the payment reference, or null if cancelled.
 * In demo mode (placeholder key) it simulates a successful payment.
 *
 * Important: before going live, verify every reference on a server with your
 * Paystack secret key. Never trust the browser alone for payment confirmation.
 */
export async function payWithPaystack({ email, amountNaira, metadata }: PayOptions): Promise<string | null> {
  if (paystackIsDemo()) {
    await new Promise((r) => setTimeout(r, 1400))
    return `DEMO-${Date.now().toString(36).toUpperCase()}`
  }

  await loadScript()
  const Pop = window.PaystackPop
  if (!Pop) throw new Error('Paystack unavailable')

  return new Promise((resolve) => {
    new Pop().newTransaction({
      key: site.payments.paystackPublicKey,
      email,
      amount: Math.round(amountNaira * 100),
      currency: 'NGN',
      metadata,
      onSuccess: (t) => resolve(t.reference),
      onCancel: () => resolve(null),
    })
  })
}
