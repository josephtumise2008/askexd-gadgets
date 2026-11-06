import { useEffect, useState } from 'react'
import { site } from '../config/site'
import { useInView } from '../hooks/useInView'
import { whatsappLink } from '../utils/whatsapp'

function daysLeftInMonth() {
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  return Math.max(0, end.getDate() - now.getDate())
}

export function Challenge() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35)
  const [count, setCount] = useState(0)
  const { month, sold, goal } = site.challenge
  const monthName = month.split(' ')[0]
  const pct = Math.min(100, (sold / goal) * 100)

  useEffect(() => {
    if (!inView) return
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setCount(n)
      if (n >= sold) window.clearInterval(id)
    }, 40)
    return () => window.clearInterval(id)
  }, [inView, sold])

  // Ring geometry
  const R = 70
  const C = 2 * Math.PI * R

  return (
    <section className="challenge" id="challenge">
      <div className="container">
        <div ref={ref} className={`challenge__card reveal ${inView ? 'is-in' : ''}`}>
          <div className="challenge__ring">
            <svg viewBox="0 0 180 180" aria-hidden="true">
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#8cc63f" />
                  <stop offset="1" stopColor="#5b4bff" />
                </linearGradient>
              </defs>
              <circle cx="90" cy="90" r={R} className="ring-track" />
              <circle
                cx="90"
                cy="90"
                r={R}
                className="ring-fill"
                stroke="url(#ring-grad)"
                strokeDasharray={C}
                strokeDashoffset={inView ? C * (1 - pct / 100) : C}
              />
            </svg>
            <div className="challenge__count">
              <b>{count}</b>
              <span>of {goal}</span>
            </div>
          </div>

          <div className="challenge__body">
            <p className="eyebrow">The {monthName} challenge · live</p>
            <h3>
              {goal} laptops in {monthName}. <span className="text-lime">We no dey stop!</span>
            </h3>
            <p>
              Every laptop sold this month moves the ring. {goal - sold} to go, {daysLeftInMonth()} days left. Grab
              yours and be part of the story.
            </p>
            <a
              className="btn btn--wa"
              href={whatsappLink(
                `Hi ${site.name}, I want to be part of the ${monthName} ${goal} laptops challenge. What laptops do you have?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Be number {sold + 1}
            </a>
          </div>

          <div className="challenge__history">
            <p className="challenge__history-title">Past challenges</p>
            {site.challengeHistory.map((h) => {
              const done = h.sold >= h.goal
              return (
                <div key={h.month} className="history">
                  <div className="history__top">
                    <strong>{h.month}</strong>
                    <span className={`history__tag ${done ? 'is-done' : ''}`}>{done ? 'Completed ✓' : 'Closed'}</span>
                  </div>
                  <div className="history__bar">
                    <i style={{ width: `${Math.min(100, (h.sold / h.goal) * 100)}%` }} />
                  </div>
                  <small>
                    {h.sold} / {h.goal} laptops sold
                  </small>
                </div>
              )
            })}
            <div className="history history--now">
              <div className="history__top">
                <strong>{month}</strong>
                <span className="history__tag history__tag--live">In progress</span>
              </div>
              <div className="history__bar">
                <i style={{ width: inView ? `${pct}%` : 0 }} />
              </div>
              <small>
                {sold} / {goal} laptops sold
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
