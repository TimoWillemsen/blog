/**
 * Seasonal decoration utilities
 * 
 * Determines which seasonal decorations should appear based on the current date
 */

/**
 * Get current month (0-indexed: 0=January, 11=December)
 * 
 * @returns Current month as number (0-11)
 */
export function getCurrentMonth(): number {
  return new Date().getMonth()
}

/**
 * Check if Halloween decorations should be shown (October)
 * 
 * @returns true if it's October (month 9)
 */
export function shouldShowHalloweenDecorations(): boolean {
  return getCurrentMonth() === 9 // October
}

/**
 * Check if Christmas decorations should be shown (December)
 * 
 * @returns true if it's December (month 11)
 */
export function shouldShowChristmasDecorations(): boolean {
  return getCurrentMonth() === 11 // December
}

