/**
 * Unit tests for seasonal theme availability logic
 */

import { describe, it, expect, afterEach } from 'vitest'
import { mockDate, restoreDate } from './setup'
import { getAvailableThemes, isThemeAvailable, getCurrentMonth } from '@/lib/theme/seasonal'
import type { Theme } from '@/lib/theme/types'

describe('Seasonal Theme Utilities', () => {
  afterEach(() => {
    restoreDate()
  })

  describe('getCurrentMonth', () => {
    it('should return current month as 0-indexed number', () => {
      // January (month 0)
      mockDate(2025, 0, 15)
      expect(getCurrentMonth()).toBe(0)

      // October (month 9)
      mockDate(2025, 9, 15)
      expect(getCurrentMonth()).toBe(9)

      // December (month 11)
      mockDate(2025, 11, 15)
      expect(getCurrentMonth()).toBe(11)
    })
  })

  describe('getAvailableThemes', () => {
    it('should always include light and dark themes', () => {
      mockDate(2025, 5, 15) // June - no seasonal themes
      const themes = getAvailableThemes()
      expect(themes).toContain('light')
      expect(themes).toContain('dark')
      expect(themes.length).toBe(2)
    })

    it('should include Halloween theme in October', () => {
      mockDate(2025, 9, 15) // October 15, 2025
      const themes = getAvailableThemes()
      expect(themes).toContain('light')
      expect(themes).toContain('dark')
      expect(themes).toContain('halloween')
      expect(themes.length).toBe(3)
    })

    it('should include Christmas theme in December', () => {
      mockDate(2025, 11, 15) // December 15, 2025
      const themes = getAvailableThemes()
      expect(themes).toContain('light')
      expect(themes).toContain('dark')
      expect(themes).toContain('christmas')
      expect(themes.length).toBe(3)
    })

    it('should exclude Halloween theme outside October', () => {
      mockDate(2025, 8, 15) // September 15, 2025
      const themes = getAvailableThemes()
      expect(themes).not.toContain('halloween')
      expect(themes.length).toBe(2)
    })

    it('should exclude Christmas theme outside December', () => {
      mockDate(2025, 0, 15) // January 15, 2025
      const themes = getAvailableThemes()
      expect(themes).not.toContain('christmas')
      expect(themes.length).toBe(2)
    })

    it('should handle month boundaries correctly', () => {
      // October 1st
      mockDate(2025, 9, 1)
      expect(getAvailableThemes()).toContain('halloween')

      // October 31st
      mockDate(2025, 9, 31)
      expect(getAvailableThemes()).toContain('halloween')

      // November 1st
      mockDate(2025, 10, 1)
      expect(getAvailableThemes()).not.toContain('halloween')
      expect(getAvailableThemes()).not.toContain('christmas')

      // December 1st
      mockDate(2025, 11, 1)
      expect(getAvailableThemes()).toContain('christmas')

      // December 31st
      mockDate(2025, 11, 31)
      expect(getAvailableThemes()).toContain('christmas')

      // January 1st
      mockDate(2026, 0, 1)
      expect(getAvailableThemes()).not.toContain('christmas')
      expect(getAvailableThemes()).not.toContain('halloween')
    })
  })

  describe('isThemeAvailable', () => {
    it('should return true for light theme (always available)', () => {
      mockDate(2025, 5, 15) // June
      expect(isThemeAvailable('light')).toBe(true)
    })

    it('should return true for dark theme (always available)', () => {
      mockDate(2025, 5, 15) // June
      expect(isThemeAvailable('dark')).toBe(true)
    })

    it('should return true for Halloween theme in October', () => {
      mockDate(2025, 9, 15) // October
      expect(isThemeAvailable('halloween')).toBe(true)
    })

    it('should return false for Halloween theme outside October', () => {
      mockDate(2025, 8, 15) // September
      expect(isThemeAvailable('halloween')).toBe(false)
      
      mockDate(2025, 10, 15) // November
      expect(isThemeAvailable('halloween')).toBe(false)
    })

    it('should return true for Christmas theme in December', () => {
      mockDate(2025, 11, 15) // December
      expect(isThemeAvailable('christmas')).toBe(true)
    })

    it('should return false for Christmas theme outside December', () => {
      mockDate(2025, 0, 15) // January
      expect(isThemeAvailable('christmas')).toBe(false)
      
      mockDate(2025, 10, 15) // November
      expect(isThemeAvailable('christmas')).toBe(false)
    })
  })
})

