import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a17 17 0 0 1-1.7-.6 13.3 13.3 0 0 1-5.1-4.5c-.4-.5-1.2-1.7-1.2-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.3.7-.2l2 1c.3.1.5.2.6.3.1.2.1.8-.1 1.4z" />
    </svg>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" {...props}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

export function SwapIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" {...props}>
      <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" {...props}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export function LaptopIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true" {...props}>
      <rect x="10" y="6" width="44" height="30" rx="3" />
      <path d="M4 42h56" />
    </svg>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true" {...props}>
      <rect x="10" y="4" width="28" height="56" rx="6" />
      <path d="M20 52h8" />
    </svg>
  )
}

export function DesktopIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 56" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true" {...props}>
      <rect x="6" y="4" width="52" height="34" rx="3" />
      <path d="M24 52h16M32 38v14" />
    </svg>
  )
}

export function TruckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" {...props}>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true" {...props}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
