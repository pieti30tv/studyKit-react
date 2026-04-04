import { useState, useEffect, useRef } from 'react'
import Card from '../ui/Card'
import { INSPIRATION_QUOTES, INSPIRATION_WELLNESS } from '../../utils/constants'

// Shuffle arrays once on module load
function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

// Build a flat rotation: quote, water, quote, move, quote, water, ...
function buildRotation() {
  const quotes   = shuffled(INSPIRATION_QUOTES)
  const wellness = shuffled(INSPIRATION_WELLNESS)
  const items    = []
  let qi = 0, wi = 0
  const total = quotes.length + wellness.length
  for (let i = 0; i < total; i++) {
    if (i % 3 === 1 || i % 3 === 2) {
      // every 3rd or 4th item → wellness
      if (wi < wellness.length) {
        items.push({ kind: 'wellness', ...wellness[wi++] })
        continue
      }
    }
    if (qi < quotes.length) {
      items.push({ kind: 'quote', ...quotes[qi++] })
    }
  }
  return items
}

const ROTATION = buildRotation()
const INTERVAL_MS = 10 * 60 * 1000 // 10 minutes

export default function InspirationCard() {
  const [index,   setIndex]   = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)

  const advance = () => {
    setVisible(false)
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % ROTATION.length)
      setVisible(true)
    }, 500) // match CSS opacity transition duration
  }

  useEffect(() => {
    timerRef.current = setInterval(advance, INTERVAL_MS)
    return () => clearInterval(timerRef.current)
  }, [])

  const item = ROTATION[index]

  return (
    <Card className="p-6 flex flex-col justify-center min-h-[160px]">
      <div
        className="inspiration-fade"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {item.kind === 'quote' ? (
          <>
            <p
              className="text-apple-heading leading-relaxed"
              style={{ fontSize: '18px', fontStyle: 'italic' }}
            >
              &ldquo;{item.text}&rdquo;
            </p>
            {item.author && (
              <p className="text-apple-secondary mt-3" style={{ fontSize: '14px' }}>
                — {item.author}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl mb-2">{item.emoji}</p>
            <p
              className="text-apple-heading leading-relaxed"
              style={{ fontSize: '16px' }}
            >
              {item.text}
            </p>
          </>
        )}
      </div>
    </Card>
  )
}
