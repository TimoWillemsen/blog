/**
 * ThemeSelector component
 * 
 * Simple toggle button for switching between light and dark themes
 */

import { useTheme } from '@/lib/theme/context'

/**
 * ThemeSelector component props
 */
interface ThemeSelectorProps {
  className?: string
  'aria-label'?: string
  style?: React.CSSProperties
}

/**
 * ThemeSelector component
 * 
 * Toggle button that switches between light and dark themes
 */
export function ThemeSelector({ className, 'aria-label': ariaLabel, style }: ThemeSelectorProps) {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={ariaLabel || `Toggle theme (currently ${theme})`}
      className={`inline-flex items-center justify-center p-2 rounded transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className || ''}`}
      style={{
        ...style,
        '--tw-ring-color': 'var(--color-accent)',
      } as React.CSSProperties & { '--tw-ring-color': string }}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  )
}

