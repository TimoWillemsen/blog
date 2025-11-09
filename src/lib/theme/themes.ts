/**
 * Theme color definitions and utilities
 * 
 * Defines color palettes for all themes and provides utilities
 * to apply themes to the document
 */

import type { Theme, ThemeColors } from './types'

/**
 * Light theme color palette
 * Base theme with warm, light colors
 */
const lightTheme: ThemeColors = {
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

/**
 * Dark theme color palette
 * Inverted light theme with dark backgrounds and light text
 */
const darkTheme: ThemeColors = {
  background: '#1a1a1a',
  surface: '#2d2d2d',
  text: {
    primary: '#faf9f7',
    secondary: '#8b8b8b',
  },
  accent: '#d4a574',
  border: '#3d3d3d',
  header: {
    background: '#1a1a1a',
    text: '#faf9f7',
    border: '#3d3d3d',
  },
  code: {
    background: '#2d2d2d',
    text: '#faf9f7',
    inline: {
      background: '#3d3d3d',
      text: '#d4a574',
    },
  },
  tag: {
    background: '#3d3d3d',
    text: '#d4a574',
    hover: '#4d4d4d',
  },
  hover: {
    background: '#2d2d2d',
    border: '#4d4d4d',
  },
}

/**
 * All theme definitions
 */
const themes: Record<Theme, ThemeColors> = {
  light: lightTheme,
  dark: darkTheme,
}

/**
 * Get color palette for a specific theme
 * 
 * @param theme - Theme identifier
 * @returns Theme color palette
 * @throws Error if theme is not found
 */
export function getThemeColors(theme: Theme): ThemeColors {
  const themeColors = themes[theme]
  if (!themeColors) {
    throw new Error(`Theme "${theme}" not found`)
  }
  return themeColors
}

/**
 * Get all theme definitions
 * 
 * @returns Record of all themes with their color palettes
 */
export function getAllThemes(): Record<Theme, ThemeColors> {
  return themes
}

/**
 * Apply theme to document by setting data-theme attribute
 * 
 * @param theme - Theme identifier to apply
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') {
    // SSR environment - skip
    return
  }

  const root = document.documentElement
  root.setAttribute('data-theme', theme)
}

