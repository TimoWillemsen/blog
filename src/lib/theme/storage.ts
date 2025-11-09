/**
 * Theme storage utilities for localStorage persistence
 * 
 * Handles saving and loading theme preferences with graceful error handling
 */

import type { Theme } from './types'

const STORAGE_KEY = 'blog-theme'

/**
 * Valid theme identifiers
 */
const VALID_THEMES: readonly Theme[] = ['light', 'dark', 'christmas', 'halloween'] as const

/**
 * Check if localStorage is available
 * 
 * @returns true if localStorage is accessible, false otherwise
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = '__theme_storage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Validate if a value is a valid theme identifier
 * 
 * @param value - Value to validate
 * @returns true if value is a valid theme, false otherwise
 */
export function isValidTheme(value: unknown): value is Theme {
  return typeof value === 'string' && VALID_THEMES.includes(value as Theme)
}

/**
 * Save theme preference to localStorage
 * 
 * @param theme - Theme identifier to save
 * @throws Does not throw - errors are logged and ignored
 */
export function saveTheme(theme: Theme): void {
  if (!isStorageAvailable()) {
    console.warn('localStorage is not available, theme preference will not persist')
    return
  }

  if (!isValidTheme(theme)) {
    console.warn(`Invalid theme "${theme}" cannot be saved`)
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch (error) {
    // Handle quota exceeded or other storage errors
    console.warn('Failed to save theme preference to localStorage:', error)
    // Theme still applies for current session, just won't persist
  }
}

/**
 * Load theme preference from localStorage
 * 
 * @returns Theme identifier if found and valid, null otherwise
 */
export function loadTheme(): Theme | null {
  if (!isStorageAvailable()) {
    return null
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) {
      return null
    }

    if (isValidTheme(stored)) {
      return stored
    }

    // Invalid theme stored - log warning and return null
    console.warn(`Invalid theme "${stored}" found in localStorage, ignoring`)
    return null
  } catch (error) {
    console.warn('Failed to load theme preference from localStorage:', error)
    return null
  }
}

