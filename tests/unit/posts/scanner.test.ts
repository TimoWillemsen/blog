import { describe, it, expect } from 'vitest'
import { shouldIgnoreFile } from '../../../src/lib/posts/scanner'

describe('File Scanner', () => {
  describe('shouldIgnoreFile', () => {
    it('should ignore hidden files', () => {
      expect(shouldIgnoreFile('.hidden.md')).toBe(true)
      expect(shouldIgnoreFile('.DS_Store')).toBe(true)
    })

    it('should ignore temporary files', () => {
      expect(shouldIgnoreFile('post.md.tmp')).toBe(true)
      expect(shouldIgnoreFile('post.md.bak')).toBe(true)
      expect(shouldIgnoreFile('post.md.swp')).toBe(true)
      expect(shouldIgnoreFile('post~')).toBe(true)
    })

    it('should accept valid markdown files', () => {
      expect(shouldIgnoreFile('post.md')).toBe(false)
      expect(shouldIgnoreFile('my-post.markdown')).toBe(false)
    })

    it('should ignore non-markdown files', () => {
      expect(shouldIgnoreFile('post.txt')).toBe(true)
      expect(shouldIgnoreFile('post.js')).toBe(true)
      expect(shouldIgnoreFile('post')).toBe(true)
    })
  })
})

