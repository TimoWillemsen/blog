import { describe, it, expect } from 'vitest'
import { sanitizeHtml } from '../../../src/lib/markdown/sanitizer'

describe('sanitizeHtml', () => {
  it('should preserve safe HTML from markdown', () => {
    const safeHtml = '<h1>Title</h1><p>Paragraph with <strong>bold</strong> text.</p>'
    const result = sanitizeHtml(safeHtml)

    expect(result).toContain('<h1>Title</h1>')
    expect(result).toContain('<p>Paragraph with <strong>bold</strong> text.</p>')
  })

  it('should remove script tags', () => {
    const dangerousHtml = '<p>Safe content</p><script>alert("XSS")</script>'
    const result = sanitizeHtml(dangerousHtml)

    expect(result).toContain('<p>Safe content</p>')
    expect(result).not.toContain('<script>')
    expect(result).not.toContain('alert("XSS")')
  })

  it('should remove inline event handlers', () => {
    const dangerousHtml = '<p onclick="alert(\'XSS\')">Click me</p>'
    const result = sanitizeHtml(dangerousHtml)

    expect(result).toContain('<p>Click me</p>')
    expect(result).not.toContain('onclick')
    expect(result).not.toContain('alert')
  })

  it('should remove javascript: URLs from links', () => {
    const dangerousHtml = '<a href="javascript:alert(\'XSS\')">Click</a>'
    const result = sanitizeHtml(dangerousHtml)

    expect(result).not.toContain('javascript:')
    expect(result).not.toContain('alert')
  })

  it('should preserve safe links', () => {
    const safeHtml = '<a href="https://example.com">Safe link</a>'
    const result = sanitizeHtml(safeHtml)

    expect(result).toContain('<a href="https://example.com">Safe link</a>')
  })

  it('should preserve code blocks and inline code', () => {
    const safeHtml = '<pre><code>const x = 1;</code></pre><p>Use <code>console.log</code> here.</p>'
    const result = sanitizeHtml(safeHtml)

    expect(result).toContain('<pre><code>const x = 1;</code></pre>')
    expect(result).toContain('<code>console.log</code>')
  })

  it('should handle empty string', () => {
    const result = sanitizeHtml('')
    expect(result).toBe('')
  })

  it('should preserve markdown-rendered lists', () => {
    const safeHtml = '<ul><li>Item 1</li><li>Item 2</li></ul>'
    const result = sanitizeHtml(safeHtml)

    expect(result).toContain('<ul>')
    expect(result).toContain('<li>Item 1</li>')
    expect(result).toContain('<li>Item 2</li>')
  })

  it('should remove iframe tags', () => {
    const dangerousHtml = '<p>Content</p><iframe src="evil.com"></iframe>'
    const result = sanitizeHtml(dangerousHtml)

    expect(result).toContain('<p>Content</p>')
    expect(result).not.toContain('<iframe>')
  })

  it('should preserve images with safe src', () => {
    const safeHtml = '<img src="https://example.com/image.jpg" alt="Image">'
    const result = sanitizeHtml(safeHtml)

    expect(result).toContain('<img')
    expect(result).toContain('src="https://example.com/image.jpg"')
  })

  it('should remove dangerous img src attributes', () => {
    const dangerousHtml = '<img src="javascript:alert(\'XSS\')" alt="Image">'
    const result = sanitizeHtml(dangerousHtml)

    expect(result).not.toContain('javascript:')
  })
})

