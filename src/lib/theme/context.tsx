/**
 * Theme context and provider
 * 
 * Provides theme state management and persistence for the application
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Theme } from './types'
import { loadTheme, saveTheme, isValidTheme } from './storage'
import { applyTheme } from './themes'

/**
 * Theme context value interface
 */
export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

/**
 * Theme context
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * ThemeProvider component props
 */
interface ThemeProviderProps {
  children: ReactNode
}

/**
 * Default theme (light)
 */
const DEFAULT_THEME: Theme = 'light'

/**
 * ThemeProvider component
 * 
 * Manages theme state, persistence, and availability
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme immediately (before React render) to prevent flash
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to load theme synchronously on first render
    if (typeof document !== 'undefined') {
      const storedTheme = loadTheme()
      if (storedTheme && isValidTheme(storedTheme)) {
        applyTheme(storedTheme)
        return storedTheme
      }
    }
    // Default theme
    if (typeof document !== 'undefined') {
      applyTheme(DEFAULT_THEME)
    }
    return DEFAULT_THEME
  })

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const storedTheme = loadTheme()
    
    if (storedTheme && isValidTheme(storedTheme)) {
      // Only update if different from current state
      setThemeState((currentTheme) => {
        if (currentTheme !== storedTheme) {
          applyTheme(storedTheme)
          return storedTheme
        }
        return currentTheme
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  /**
   * Set theme and persist to localStorage
   */
  const setTheme = (newTheme: Theme) => {
    if (!isValidTheme(newTheme)) {
      console.warn(`Invalid theme "${newTheme}" cannot be set`)
      return
    }

    setThemeState(newTheme)
    applyTheme(newTheme)
    saveTheme(newTheme)
  }

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * useTheme hook
 * 
 * Provides access to theme context
 * 
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

