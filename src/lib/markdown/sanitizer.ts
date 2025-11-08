/**
 * Sanitize HTML to prevent XSS attacks
 * For now, returns HTML as-is. In production, use DOMPurify or similar.
 * @param html - HTML content to sanitize
 * @returns Sanitized HTML
 */
export function sanitizeHtml(html: string): string {
  // TODO: Implement proper HTML sanitization using DOMPurify
  // For MVP, we'll trust the markdown parser output
  // In production, add: import DOMPurify from 'dompurify' and return DOMPurify.sanitize(html)
  return html
}

