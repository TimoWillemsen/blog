import { describe, it, expect } from 'vitest'
import { parseFile, parseMarkdown } from '../../../src/lib/markdown/parser'

describe('MarkdownParser', () => {
  describe('parseFile', () => {
    it('should parse frontmatter and body from markdown content', () => {
      const content = `---
title: "Test Post"
date: "2025-01-27"
---
# Content
This is the body.`

      const result = parseFile(content)

      expect(result.frontmatter).toEqual({
        title: 'Test Post',
        date: '2025-01-27',
      })
      expect(result.body).toContain('# Content')
      expect(result.body).toContain('This is the body.')
    })

    it('should handle markdown without frontmatter', () => {
      const content = '# Content\nThis is the body.'

      const result = parseFile(content)

      expect(result.frontmatter).toEqual({})
      expect(result.body).toBe(content)
    })

    it('should handle empty content', () => {
      const result = parseFile('')

      expect(result.frontmatter).toEqual({})
      expect(result.body).toBe('')
    })
  })

  describe('parseMarkdown', () => {
    it('should convert markdown to HTML', () => {
      const markdown = '# Heading\n\nThis is a paragraph.'
      const html = parseMarkdown(markdown)

      expect(html).toContain('<h1>Heading</h1>')
      expect(html).toContain('<p>This is a paragraph.</p>')
    })

    it('should handle empty markdown', () => {
      const html = parseMarkdown('')
      expect(html).toBe('')
    })
  })
})

