/**
 * Unit tests for theme type definitions and validation
 */

import { describe, it, expect } from 'vitest'
import type { Theme, ThemeColors, TextColors, HeaderColors, CodeColors, TagColors, HoverColors } from '@/lib/theme/types'

describe('Theme Types', () => {
  describe('Theme type', () => {
    it('should accept valid theme identifiers', () => {
      const themes: Theme[] = ['light', 'dark', 'christmas', 'halloween']
      themes.forEach((theme) => {
        expect(typeof theme).toBe('string')
        expect(['light', 'dark', 'christmas', 'halloween']).toContain(theme)
      })
    })
  })

  describe('ThemeColors interface', () => {
    it('should require all color tokens', () => {
      const validColors: ThemeColors = {
        background: '#faf9f7',
        surface: '#ffffff',
        text: {
          primary: '#2d2d2d',
          secondary: '#6b6b6b',
        },
        accent: '#8b7355',
        border: '#e8e6e3',
        header: {
          background: '#faf9f7',
          text: '#2d2d2d',
          border: '#e8e6e3',
        },
        code: {
          background: '#2d2d2d',
          text: '#faf9f7',
          inline: {
            background: '#f5f3f0',
            text: '#8b7355',
          },
        },
        tag: {
          background: '#f5f3f0',
          text: '#8b7355',
          hover: '#e8e6e3',
        },
        hover: {
          background: '#f5f3f0',
          border: '#d4c4b0',
        },
      }

      expect(validColors.background).toBeDefined()
      expect(validColors.surface).toBeDefined()
      expect(validColors.text.primary).toBeDefined()
      expect(validColors.text.secondary).toBeDefined()
      expect(validColors.accent).toBeDefined()
      expect(validColors.border).toBeDefined()
      expect(validColors.header.background).toBeDefined()
      expect(validColors.header.text).toBeDefined()
      expect(validColors.header.border).toBeDefined()
      expect(validColors.code.background).toBeDefined()
      expect(validColors.code.text).toBeDefined()
      expect(validColors.code.inline.background).toBeDefined()
      expect(validColors.code.inline.text).toBeDefined()
      expect(validColors.tag.background).toBeDefined()
      expect(validColors.tag.text).toBeDefined()
      expect(validColors.tag.hover).toBeDefined()
      expect(validColors.hover.background).toBeDefined()
      expect(validColors.hover.border).toBeDefined()
    })

    it('should validate color format (hex strings)', () => {
      const hexColorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/
      
      const colors: ThemeColors = {
        background: '#faf9f7',
        surface: '#ffffff',
        text: {
          primary: '#2d2d2d',
          secondary: '#6b6b6b',
        },
        accent: '#8b7355',
        border: '#e8e6e3',
        header: {
          background: '#faf9f7',
          text: '#2d2d2d',
          border: '#e8e6e3',
        },
        code: {
          background: '#2d2d2d',
          text: '#faf9f7',
          inline: {
            background: '#f5f3f0',
            text: '#8b7355',
          },
        },
        tag: {
          background: '#f5f3f0',
          text: '#8b7355',
          hover: '#e8e6e3',
        },
        hover: {
          background: '#f5f3f0',
          border: '#d4c4b0',
        },
      }

      const allColorValues = [
        colors.background,
        colors.surface,
        colors.text.primary,
        colors.text.secondary,
        colors.accent,
        colors.border,
        colors.header.background,
        colors.header.text,
        colors.header.border,
        colors.code.background,
        colors.code.text,
        colors.code.inline.background,
        colors.code.inline.text,
        colors.tag.background,
        colors.tag.text,
        colors.tag.hover,
        colors.hover.background,
        colors.hover.border,
      ]

      allColorValues.forEach((color) => {
        expect(hexColorPattern.test(color)).toBe(true)
      })
    })
  })
})

