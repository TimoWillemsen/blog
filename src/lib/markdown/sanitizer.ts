import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML to prevent XSS attacks
 * Uses DOMPurify to remove dangerous scripts and attributes while preserving
 * safe markdown-rendered HTML (headings, lists, links, code blocks, etc.)
 * @param html - HTML content to sanitize
 * @returns Sanitized HTML
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html)
}

