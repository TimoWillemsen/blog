/**
 * Theme system type definitions
 * 
 * Defines the core types for the theme system including theme identifiers,
 * color palettes, and related interfaces.
 */

/**
 * Theme identifier - one of the available themes
 */
export type Theme = 'light' | 'dark'

/**
 * Text color definitions
 */
export interface TextColors {
  primary: string
  secondary: string
}

/**
 * Header color definitions
 */
export interface HeaderColors {
  background: string
  text: string
  border: string
}

/**
 * Code block color definitions
 */
export interface CodeColors {
  background: string
  text: string
  inline: {
    background: string
    text: string
  }
}

/**
 * Tag component color definitions
 */
export interface TagColors {
  background: string
  text: string
  hover: string
}

/**
 * Hover state color definitions
 */
export interface HoverColors {
  background: string
  border: string
}

/**
 * Complete color palette for a theme
 * 
 * Defines all color tokens used throughout the application
 */
export interface ThemeColors {
  background: string
  surface: string
  text: TextColors
  accent: string
  border: string
  header: HeaderColors
  code: CodeColors
  tag: TagColors
  hover: HoverColors
}

/**
 * Theme configuration with metadata
 */
export interface ThemeConfig {
  id: Theme
  name: string
  colors: ThemeColors
  isSeasonal: boolean
  availableMonths?: number[]
}

