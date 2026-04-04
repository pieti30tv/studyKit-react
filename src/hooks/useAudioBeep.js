import { useRef, useCallback } from 'react'

/**
 * AudioContext beep hook.
 * AudioContext is created lazily after user gesture (e.g. Start button click).
 * Plays a descending 880Hz → 440Hz tone over ~600ms.
 */
export function useAudioBeep() {
  const ctxRef = useRef(null)

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      } catch (err) {
        console.warn('[useAudioBeep] AudioContext not available:', err)
      }
    }
    return ctxRef.current
  }, [])

  const beep = useCallback(() => {
    const ctx = ensureContext()
    if (!ctx) return

    try {
      // Resume context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') ctx.resume()

      const oscillator = ctx.createOscillator()
      const gainNode   = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(880, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5)

      gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.6)
    } catch (err) {
      console.warn('[useAudioBeep] Beep failed:', err)
    }
  }, [ensureContext])

  /**
   * Call this after a user gesture (e.g. Start click) to warm up AudioContext.
   * Helps avoid "AudioContext was not allowed to start" warnings.
   */
  const warmUp = useCallback(() => {
    ensureContext()
  }, [ensureContext])

  return { beep, warmUp }
}
