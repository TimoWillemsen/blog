/**
 * AboutPage entity - represents the about page content loaded from markdown file
 */
export interface AboutPage {
  title: string
  content: string
  rawContent?: string
  metadata?: Record<string, unknown>
}

