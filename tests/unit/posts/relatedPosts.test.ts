import { describe, it, expect } from 'vitest'
import { findRelatedPosts } from '../../../src/lib/posts/relatedPosts'
import type { BlogPost } from '../../../src/lib/posts/types'

describe('findRelatedPosts', () => {
  const now = new Date()
  const pastDate1 = new Date(now.getTime() - 86400000) // 1 day ago
  const pastDate2 = new Date(now.getTime() - 172800000) // 2 days ago
  const pastDate3 = new Date(now.getTime() - 259200000) // 3 days ago

  it('should exclude current post from results', () => {
    const currentPost: BlogPost = {
      id: 'current',
      title: 'Current Post',
      content: '<p>Content</p>',
      publicationDate: pastDate1,
      slug: 'current',
      sourceFile: 'current.md',
      tags: ['react'],
    }

    const allPosts: BlogPost[] = [
      currentPost,
      {
        id: 'related-1',
        title: 'Related Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate2,
        slug: 'related-1',
        sourceFile: 'related1.md',
        tags: ['react'],
      },
    ]

    const related = findRelatedPosts(currentPost, allPosts)
    expect(related.length).toBe(1)
    expect(related[0].id).toBe('related-1')
    expect(related.find((p) => p.id === 'current')).toBeUndefined()
  })

  it('should find posts that share at least one tag', () => {
    const currentPost: BlogPost = {
      id: 'current',
      title: 'Current Post',
      content: '<p>Content</p>',
      publicationDate: pastDate1,
      slug: 'current',
      sourceFile: 'current.md',
      tags: ['react', 'typescript'],
    }

    const allPosts: BlogPost[] = [
      currentPost,
      {
        id: 'related-1',
        title: 'Related Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate2,
        slug: 'related-1',
        sourceFile: 'related1.md',
        tags: ['react'], // Shares "react"
      },
      {
        id: 'related-2',
        title: 'Related Post 2',
        content: '<p>Content</p>',
        publicationDate: pastDate3,
        slug: 'related-2',
        sourceFile: 'related2.md',
        tags: ['typescript'], // Shares "typescript"
      },
      {
        id: 'unrelated',
        title: 'Unrelated Post',
        content: '<p>Content</p>',
        publicationDate: pastDate2,
        slug: 'unrelated',
        sourceFile: 'unrelated.md',
        tags: ['vue'], // No shared tags
      },
    ]

    const related = findRelatedPosts(currentPost, allPosts)
    expect(related.length).toBe(2)
    expect(related.map((p) => p.id)).toContain('related-1')
    expect(related.map((p) => p.id)).toContain('related-2')
    expect(related.find((p) => p.id === 'unrelated')).toBeUndefined()
  })

  it('should sort by shared tag count (descending), then by publication date (descending)', () => {
    const currentPost: BlogPost = {
      id: 'current',
      title: 'Current Post',
      content: '<p>Content</p>',
      publicationDate: pastDate1,
      slug: 'current',
      sourceFile: 'current.md',
      tags: ['react', 'typescript', 'web-dev'],
    }

    const allPosts: BlogPost[] = [
      currentPost,
      {
        id: 'related-1',
        title: 'Related Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate3, // Older
        slug: 'related-1',
        sourceFile: 'related1.md',
        tags: ['react', 'typescript', 'web-dev'], // 3 shared tags
      },
      {
        id: 'related-2',
        title: 'Related Post 2',
        content: '<p>Content</p>',
        publicationDate: pastDate2, // Newer
        slug: 'related-2',
        sourceFile: 'related2.md',
        tags: ['react'], // 1 shared tag
      },
      {
        id: 'related-3',
        title: 'Related Post 3',
        content: '<p>Content</p>',
        publicationDate: pastDate1, // Newest
        slug: 'related-3',
        sourceFile: 'related3.md',
        tags: ['react', 'typescript'], // 2 shared tags
      },
    ]

    const related = findRelatedPosts(currentPost, allPosts)
    expect(related.length).toBe(3)
    // Should be sorted: most shared tags first, then by date
    expect(related[0].id).toBe('related-1') // 3 shared tags
    expect(related[1].id).toBe('related-3') // 2 shared tags, newer
    expect(related[2].id).toBe('related-2') // 1 shared tag
  })

  it('should limit results to specified limit', () => {
    const currentPost: BlogPost = {
      id: 'current',
      title: 'Current Post',
      content: '<p>Content</p>',
      publicationDate: pastDate1,
      slug: 'current',
      sourceFile: 'current.md',
      tags: ['react'],
    }

    const allPosts: BlogPost[] = [
      currentPost,
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `related-${i}`,
        title: `Related Post ${i}`,
        content: '<p>Content</p>',
        publicationDate: new Date(pastDate1.getTime() - i * 86400000),
        slug: `related-${i}`,
        sourceFile: `related${i}.md`,
        tags: ['react'] as string[],
      })),
    ]

    const related = findRelatedPosts(currentPost, allPosts, 5)
    expect(related.length).toBe(5)
  })

  it('should return empty array if current post has no tags', () => {
    const currentPost: BlogPost = {
      id: 'current',
      title: 'Current Post',
      content: '<p>Content</p>',
      publicationDate: pastDate1,
      slug: 'current',
      sourceFile: 'current.md',
      // No tags
    }

    const allPosts: BlogPost[] = [
      currentPost,
      {
        id: 'other',
        title: 'Other Post',
        content: '<p>Content</p>',
        publicationDate: pastDate2,
        slug: 'other',
        sourceFile: 'other.md',
        tags: ['react'],
      },
    ]

    const related = findRelatedPosts(currentPost, allPosts)
    expect(related).toEqual([])
  })

  it('should return empty array if no other posts share tags', () => {
    const currentPost: BlogPost = {
      id: 'current',
      title: 'Current Post',
      content: '<p>Content</p>',
      publicationDate: pastDate1,
      slug: 'current',
      sourceFile: 'current.md',
      tags: ['react'],
    }

    const allPosts: BlogPost[] = [
      currentPost,
      {
        id: 'other',
        title: 'Other Post',
        content: '<p>Content</p>',
        publicationDate: pastDate2,
        slug: 'other',
        sourceFile: 'other.md',
        tags: ['vue'],
      },
    ]

    const related = findRelatedPosts(currentPost, allPosts)
    expect(related).toEqual([])
  })

  it('should use case-insensitive tag matching', () => {
    const currentPost: BlogPost = {
      id: 'current',
      title: 'Current Post',
      content: '<p>Content</p>',
      publicationDate: pastDate1,
      slug: 'current',
      sourceFile: 'current.md',
      tags: ['react'],
    }

    const allPosts: BlogPost[] = [
      currentPost,
      {
        id: 'related',
        title: 'Related Post',
        content: '<p>Content</p>',
        publicationDate: pastDate2,
        slug: 'related',
        sourceFile: 'related.md',
        tags: ['React'], // Different case, but should match
      },
    ]

    const related = findRelatedPosts(currentPost, allPosts)
    expect(related.length).toBe(1)
    expect(related[0].id).toBe('related')
  })
})

