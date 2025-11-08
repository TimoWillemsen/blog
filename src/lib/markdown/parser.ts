import { parseFrontmatter } from './frontmatter'
import { renderMarkdown } from './renderer'
import { sanitizeHtml } from './sanitizer'
import type { MarkdownFile } from './types'

/**
 * MarkdownParser service interface
 */
export interface MarkdownParser {
  parseFile(content: string): {
    frontmatter: Record<string, unknown>
    body: string
  }
  parseFrontmatter(content: string): Record<string, unknown>
  parseMarkdown(markdown: string): string
}

/**
 * Parse markdown file content
 */
export function parseFile(content: string): {
  frontmatter: Record<string, unknown>
  body: string
} {
  return parseFrontmatter(content)
}

/**
 * Parse frontmatter only
 */
export function parseFrontmatterOnly(content: string): Record<string, unknown> {
  return parseFrontmatter(content).frontmatter
}

/**
 * Parse markdown to HTML
 */
export function parseMarkdown(markdown: string): string {
  const html = renderMarkdown(markdown)
  return sanitizeHtml(html)
}

