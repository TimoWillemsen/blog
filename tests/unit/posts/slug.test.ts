import { describe, it, expect } from 'vitest'
import { generateSlug } from '../../../src/lib/posts/slug'

describe('Slug generation', () => {
  it('should convert title to URL-safe slug', () => {
    expect(generateSlug('My Blog Post')).toBe('my-blog-post')
  })

  it('should handle special characters', () => {
    expect(generateSlug('Hello, World!')).toBe('hello-world')
  })

  it('should handle multiple spaces', () => {
    expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces')
  })

  it('should handle underscores', () => {
    expect(generateSlug('post_with_underscores')).toBe('post-with-underscores')
  })

  it('should trim leading and trailing hyphens', () => {
    expect(generateSlug('---Test---')).toBe('test')
  })

  it('should handle empty string', () => {
    expect(generateSlug('')).toBe('')
  })
})

