/**
 * SeasonalDecorations component
 * 
 * Adds seasonal decorations (bats for Halloween, snowflakes for Christmas)
 * based on the current month, regardless of theme
 */

import { useEffect } from 'react'
import { shouldShowHalloweenDecorations, shouldShowChristmasDecorations } from '@/lib/theme/seasonal'

export function SeasonalDecorations() {
  useEffect(() => {
    const body = document.body

    // Remove any existing season data attributes
    body.removeAttribute('data-season')

    // Add season data attribute based on current month
    if (shouldShowHalloweenDecorations()) {
      body.setAttribute('data-season', 'halloween')
    } else if (shouldShowChristmasDecorations()) {
      body.setAttribute('data-season', 'christmas')
    }

    // Cleanup on unmount
    return () => {
      body.removeAttribute('data-season')
    }
  }, [])

  // This component doesn't render anything - it just sets the data attribute
  return null
}

