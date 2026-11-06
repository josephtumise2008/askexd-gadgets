import { useId, type ReactNode } from 'react'
import type { ArtKind } from '../data/products'

interface DeviceArtProps {
  kind: ArtKind
  accent: string
  /** 'primary' is the hero view; 'alt' shows another angle (front of a phone, a close-up of a laptop). */
  view?: 'primary' | 'alt'
  className?: string
}

/**
 * Generated device illustrations, so every product looks premium even before
 * the shop uploads a real photo.
 */
export function DeviceArt({ kind, accent, view = 'primary', className = '' }: DeviceArtProps) {
  const uid = useId().replace(/:/g, '')
  const wall = `wall-${uid}`
  const metal = `metal-${uid}`
  const glow = `glow-${uid}`
  const shine = `shine-${uid}`

  const defs = (
    <defs>
      <linearGradient id={wall} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={accent} />
        <stop offset="0.55" stopColor="#241c6b" />
        <stop offset="1" stopColor="#0f0c2e" />
      </linearGradient>
      <linearGradient id={metal} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4f5f8" />
        <stop offset="1" stopColor="#b9bdc8" />
      </linearGradient>
      <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor={accent} stopOpacity="0.55" />
        <stop offset="1" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={shine} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
        <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  )

  const wallpaper = (x: number, y: number, w: number, h: number, r = 6) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={`url(#${wall})`} />
      <path
        d={`M${x} ${y + h * 0.72} C ${x + w * 0.3} ${y + h * 0.45}, ${x + w * 0.6} ${y + h * 0.95}, ${x + w} ${y + h * 0.55} L ${x + w} ${y + h} L ${x} ${y + h} Z`}
        fill={accent}
        opacity="0.45"
      />
      <circle cx={x + w * 0.72} cy={y + h * 0.3} r={Math.min(w, h) * 0.22} fill={accent} opacity="0.35" />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={`url(#${shine})`} />
    </g>
  )

  const glowBlob = <ellipse cx="200" cy="215" rx="170" ry="150" fill={`url(#${glow})`} />

  let body: ReactNode
  switch (kind) {
    case 'macbook':
    case 'laptop':
    case 'gaming': {
      const base = kind === 'macbook' ? `url(#${metal})` : kind === 'gaming' ? '#16161d' : '#2b2d36'
      body = (
        <g>
          <rect x="60" y="76" width="280" height="184" rx="13" fill={kind === 'macbook' ? '#c9cdd8' : '#2b2d36'} />
          <rect x="62" y="78" width="276" height="180" rx="12" fill="#0b0b10" />
          {wallpaper(72, 88, 256, 160)}
          {kind === 'macbook' && <rect x="186" y="88" width="28" height="7" rx="3" fill="#0b0b10" />}
          {kind === 'gaming' && (
            <g stroke={accent} strokeWidth="2" opacity="0.8" fill="none">
              <path d="M90 230 L150 170 L190 200 L250 130 L310 160" />
              <path d="M90 240 L140 205 L200 225 L260 180 L310 195" opacity="0.5" />
            </g>
          )}
          <path d="M30 262 H370 L356 282 H44 Z" fill={base} />
          <path d="M30 262 H370 L368 265 H32 Z" fill="#fff" opacity={kind === 'macbook' ? 0.6 : 0.08} />
          <rect x="170" y="262" width="60" height="6" rx="3" fill="#000" opacity="0.18" />
          {kind === 'gaming' && (
            <>
              <rect x="70" y="276" width="260" height="3" rx="1.5" fill={accent} />
              <path d="M44 282 H356 L350 288 H50 Z" fill="#0b0b10" />
            </>
          )}
        </g>
      )
      break
    }
    case 'iphone':
    case 'android': {
      if (view === 'alt') {
        body = (
          <g>
            <rect x="128" y="48" width="144" height="304" rx="30" fill="#0b0b10" />
            {wallpaper(136, 56, 128, 288, 24)}
            {kind === 'iphone' ? (
              <rect x="176" y="66" width="48" height="14" rx="7" fill="#0b0b10" />
            ) : (
              <circle cx="200" cy="72" r="5" fill="#0b0b10" />
            )}
            <text x="200" y="140" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily="system-ui" opacity="0.85">
              Friday 6 November
            </text>
            <text x="200" y="186" textAnchor="middle" fill="#fff" fontSize="44" fontWeight="700" fontFamily="system-ui">
              9:41
            </text>
            <rect x="148" y="310" width="104" height="24" rx="12" fill="#fff" opacity="0.18" />
          </g>
        )
      } else {
        body = (
          <g>
            <rect x="124" y="110" width="6" height="34" rx="3" fill={accent} />
            <rect x="124" y="156" width="6" height="34" rx="3" fill={accent} />
            <rect x="270" y="130" width="6" height="52" rx="3" fill={accent} />
            <rect x="128" y="48" width="144" height="304" rx="30" fill={accent} />
            <rect x="128" y="48" width="144" height="304" rx="30" fill="#000" opacity="0.22" />
            <rect x="132" y="52" width="136" height="296" rx="27" fill={accent} />
            <rect x="132" y="52" width="136" height="296" rx="27" fill={`url(#${shine})`} />
            <rect x="133" y="53" width="134" height="294" rx="26" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
            {kind === 'iphone' ? (
              <g>
                <rect x="142" y="62" width="74" height="74" rx="20" fill="#000" opacity="0.22" />
                {[
                  [162, 82],
                  [196, 100],
                  [162, 118],
                ].map(([cx, cy]) => (
                  <g key={`${cx}-${cy}`}>
                    <circle cx={cx} cy={cy} r="14" fill="#15151c" />
                    <circle cx={cx} cy={cy} r="8" fill="#26263a" />
                    <circle cx={cx - 3} cy={cy - 3} r="2.5" fill="#fff" opacity="0.6" />
                  </g>
                ))}
                <circle cx="198" cy="72" r="4" fill="#f5f5f5" opacity="0.8" />
              </g>
            ) : (
              <g>
                {[80, 116, 152].map((cy) => (
                  <g key={cy}>
                    <circle cx="160" cy={cy} r="14" fill="#15151c" />
                    <circle cx="160" cy={cy} r="7" fill="#26263a" />
                  </g>
                ))}
              </g>
            )}
          </g>
        )
      }
      break
    }
    case 'tablet':
      body = (
        <g>
          <rect x="88" y="54" width="224" height="300" rx="22" fill="#0b0b10" />
          {wallpaper(98, 64, 204, 280, 14)}
          <rect x="190" y="56" width="20" height="4" rx="2" fill="#26263a" />
        </g>
      )
      break
    case 'desktop':
      body = (
        <g>
          <rect x="60" y="66" width="280" height="180" rx="12" fill="#0b0b10" />
          {wallpaper(70, 76, 260, 160)}
          <path d="M180 246 H220 L230 290 H170 Z" fill={`url(#${metal})`} />
          <rect x="140" y="290" width="120" height="8" rx="4" fill={`url(#${metal})`} />
          <rect x="268" y="296" width="78" height="28" rx="8" fill={`url(#${metal})`} />
          <circle cx="334" cy="310" r="2.5" fill={accent} />
        </g>
      )
      break
    case 'audio':
      body = (
        <g>
          <ellipse cx="200" cy="318" rx="110" ry="14" fill="#0f0c2e" opacity="0.14" />
          {/* lid */}
          <path d="M118 150 Q118 96 200 96 Q282 96 282 150 L282 168 L118 168 Z" fill={`url(#${metal})`} stroke="#c9cdd8" strokeWidth="2" />
          {/* case body */}
          <rect x="118" y="168" width="164" height="140" rx="46" fill="#fbfbfd" stroke="#c9cdd8" strokeWidth="2" />
          <rect x="118" y="168" width="164" height="140" rx="46" fill={`url(#${shine})`} />
          <line x1="120" y1="170" x2="280" y2="170" stroke="#aeb3c0" strokeWidth="2" />
          <circle cx="200" cy="232" r="5" fill={accent} />
          <circle cx="200" cy="232" r="11" fill={accent} opacity="0.18" />
          {/* buds */}
          {[
            { x: 150, flip: 1 },
            { x: 250, flip: -1 },
          ].map(({ x, flip }) => (
            <g key={x} transform={`translate(${x} 128) scale(${flip} 1)`}>
              <ellipse cx="0" cy="0" rx="22" ry="20" fill="#ffffff" stroke="#c9cdd8" strokeWidth="2" />
              <rect x="-7" y="10" width="14" height="52" rx="7" fill="#ffffff" stroke="#c9cdd8" strokeWidth="2" />
              <ellipse cx="-6" cy="-3" rx="8" ry="6" fill="#2b2d36" opacity="0.85" />
              <circle cx="0" cy="56" r="3" fill="#aeb3c0" />
            </g>
          ))}
        </g>
      )
      break
    case 'watch':
      body = (
        <g>
          <path d="M166 40 H234 L228 128 H172 Z" fill={accent} />
          <path d="M172 276 H228 L234 362 H166 Z" fill={accent} />
          <path d="M166 40 H234 L228 128 H172 Z" fill="#000" opacity="0.12" />
          {[60, 80, 100].map((y) => (
            <line key={y} x1="176" x2="224" y1={y} y2={y} stroke="#000" strokeOpacity="0.12" strokeWidth="2" />
          ))}
          <rect x="124" y="112" width="152" height="176" rx="46" fill="#1b1b24" />
          <rect x="124" y="112" width="152" height="176" rx="46" fill={`url(#${shine})`} />
          <rect x="136" y="124" width="128" height="152" rx="36" fill="#000" />
          <circle cx="200" cy="200" r="46" fill="none" stroke="#26263a" strokeWidth="9" />
          <circle cx="200" cy="200" r="46" fill="none" stroke={accent} strokeWidth="9" strokeDasharray="210 300" strokeLinecap="round" transform="rotate(-90 200 200)" />
          <circle cx="200" cy="200" r="32" fill="none" stroke="#26263a" strokeWidth="8" />
          <circle cx="200" cy="200" r="32" fill="none" stroke="#8cc63f" strokeWidth="8" strokeDasharray="140 220" strokeLinecap="round" transform="rotate(-90 200 200)" />
          <circle cx="200" cy="200" r="19" fill="none" stroke="#26263a" strokeWidth="7" />
          <circle cx="200" cy="200" r="19" fill="none" stroke="#3ad6ff" strokeWidth="7" strokeDasharray="80 140" strokeLinecap="round" transform="rotate(-90 200 200)" />
          <rect x="274" y="160" width="12" height="30" rx="5" fill="#3a3a48" />
          <rect x="276" y="204" width="8" height="34" rx="4" fill="#3a3a48" />
        </g>
      )
      break
    case 'console':
      body = (
        <g>
          <rect x="60" y="130" width="60" height="150" rx="28" fill={accent} />
          <rect x="280" y="130" width="60" height="150" rx="28" fill="#00a2e8" />
          <rect x="116" y="130" width="168" height="150" rx="10" fill="#0b0b10" />
          {wallpaper(126, 140, 148, 130)}
          <circle cx="90" cy="175" r="12" fill="#0b0b10" />
          <circle cx="310" cy="235" r="12" fill="#0b0b10" />
        </g>
      )
      break
  }

  return (
    <svg
      viewBox="0 0 400 400"
      className={`device-art ${view === 'alt' && !['iphone', 'android'].includes(kind) ? 'device-art--alt' : ''} ${className}`}
      role="img"
      aria-hidden="true"
    >
      {defs}
      {glowBlob}
      {body}
    </svg>
  )
}
