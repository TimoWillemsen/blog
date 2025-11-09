import { describe, it, expect } from 'vitest'
import { isPostPublished, filterPublishedPosts, filterPostsByTag } from '../../../src/lib/posts/filter'
import type { BlogPost } from '../../../src/lib/posts/types'

describe('isPostPublished', () => {
  it('should return true for post with past date', () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1) // Yesterday

    const post: BlogPost = {
      id: 'test-post',
      title: 'Test Post',
      content: '<p>Content</p>',
      publicationDate: pastDate,
      slug: 'test-post',
      sourceFile: 'test.md',
    }

    expect(isPostPublished(post)).toBe(true)
  })

  it('should return false for post with future date', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1) // Tomorrow

    const post: BlogPost = {
      id: 'test-post',
      title: 'Test Post',
      content: '<p>Content</p>',
      publicationDate: futureDate,
      slug: 'test-post',
      sourceFile: 'test.md',
    }

    expect(isPostPublished(post)).toBe(false)
  })

  it('should return true for post with current date', () => {
    const currentDate = new Date()
    // Set to start of today to ensure it's considered "current"
    currentDate.setHours(0, 0, 0, 0)

    const post: BlogPost = {
      id: 'test-post',
      title: 'Test Post',
      content: '<p>Content</p>',
      publicationDate: currentDate,
      slug: 'test-post',
      sourceFile: 'test.md',
    }

    expect(isPostPublished(post)).toBe(true)
  })

  it('should return true for post with date exactly at current moment', () => {
    const now = new Date()

    const post: BlogPost = {
      id: 'test-post',
      title: 'Test Post',
      content: '<p>Content</p>',
      publicationDate: now,
      slug: 'test-post',
      sourceFile: 'test.md',
    }

    expect(isPostPublished(post)).toBe(true)
  })
})

describe('filterPublishedPosts', () => {
  it('should filter out future posts and keep past and current posts', () => {
    const now = new Date()
    const pastDate = new Date(now.getTime() - 86400000) // 1 day ago
    const futureDate = new Date(now.getTime() + 86400000) // 1 day from now
    const currentDate = new Date(now.getTime())

    const posts: BlogPost[] = [
      {
        id: 'past-post',
        title: 'Past Post',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'past-post',
        sourceFile: 'past.md',
      },
      {
        id: 'future-post',
        title: 'Future Post',
        content: '<p>Content</p>',
        publicationDate: futureDate,
        slug: 'future-post',
        sourceFile: 'future.md',
      },
      {
        id: 'current-post',
        title: 'Current Post',
        content: '<p>Content</p>',
        publicationDate: currentDate,
        slug: 'current-post',
        sourceFile: 'current.md',
      },
    ]

    const filtered = filterPublishedPosts(posts)

    expect(filtered.length).toBe(2)
    expect(filtered.map(p => p.id)).toEqual(['past-post', 'current-post'])
    expect(filtered.find(p => p.id === 'future-post')).toBeUndefined()
  })

  it('should return empty array when all posts are future-dated', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 1)

    const posts: BlogPost[] = [
      {
        id: 'future-1',
        title: 'Future Post 1',
        content: '<p>Content</p>',
        publicationDate: futureDate,
        slug: 'future-1',
        sourceFile: 'future1.md',
      },
      {
        id: 'future-2',
        title: 'Future Post 2',
        content: '<p>Content</p>',
        publicationDate: futureDate,
        slug: 'future-2',
        sourceFile: 'future2.md',
      },
    ]

    const filtered = filterPublishedPosts(posts)

    expect(filtered).toEqual([])
  })

  it('should return all posts when all are published', () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1)

    const posts: BlogPost[] = [
      {
        id: 'past-1',
        title: 'Past Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'past-1',
        sourceFile: 'past1.md',
      },
      {
        id: 'past-2',
        title: 'Past Post 2',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'past-2',
        sourceFile: 'past2.md',
      },
    ]

    const filtered = filterPublishedPosts(posts)

    expect(filtered.length).toBe(2)
    expect(filtered).toEqual(posts)
  })
})

describe('filterPostsByTag', () => {
  const now = new Date()
  const pastDate = new Date(now.getTime() - 86400000) // 1 day ago

  it('should return all posts when tag is null', () => {
    const posts: BlogPost[] = [
      {
        id: 'post-1',
        title: 'Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-1',
        sourceFile: 'post1.md',
        tags: ['react'],
      },
      {
        id: 'post-2',
        title: 'Post 2',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-2',
        sourceFile: 'post2.md',
        tags: ['typescript'],
      },
    ]

    const filtered = filterPostsByTag(posts, null)
    expect(filtered).toEqual(posts)
  })

  it('should return only posts with matching tag', () => {
    const posts: BlogPost[] = [
      {
        id: 'post-1',
        title: 'Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-1',
        sourceFile: 'post1.md',
        tags: ['react', 'typescript'],
      },
      {
        id: 'post-2',
        title: 'Post 2',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-2',
        sourceFile: 'post2.md',
        tags: ['typescript'],
      },
      {
        id: 'post-3',
        title: 'Post 3',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-3',
        sourceFile: 'post3.md',
        tags: ['vue'],
      },
    ]

    const filtered = filterPostsByTag(posts, 'react')
    expect(filtered.length).toBe(1)
    expect(filtered[0].id).toBe('post-1')
  })

  it('should use case-insensitive matching', () => {
    const posts: BlogPost[] = [
      {
        id: 'post-1',
        title: 'Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-1',
        sourceFile: 'post1.md',
        tags: ['react'],
      },
    ]

    const filtered = filterPostsByTag(posts, 'React')
    expect(filtered.length).toBe(1)
    expect(filtered[0].id).toBe('post-1')
  })

  it('should exclude posts without tags when filtering', () => {
    const posts: BlogPost[] = [
      {
        id: 'post-1',
        title: 'Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-1',
        sourceFile: 'post1.md',
        tags: ['react'],
      },
      {
        id: 'post-2',
        title: 'Post 2',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-2',
        sourceFile: 'post2.md',
        // No tags
      },
    ]

    const filtered = filterPostsByTag(posts, 'react')
    expect(filtered.length).toBe(1)
    expect(filtered[0].id).toBe('post-1')
  })

  it('should respect post visibility rules (filter published posts first)', () => {
    const futureDate = new Date(now.getTime() + 86400000) // 1 day from now
    const posts: BlogPost[] = [
      {
        id: 'post-1',
        title: 'Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-1',
        sourceFile: 'post1.md',
        tags: ['react'],
      },
      {
        id: 'post-2',
        title: 'Post 2',
        content: '<p>Content</p>',
        publicationDate: futureDate,
        slug: 'post-2',
        sourceFile: 'post2.md',
        tags: ['react'],
      },
    ]

    const filtered = filterPostsByTag(posts, 'react')
    // Should only return published post, even if future post has matching tag
    expect(filtered.length).toBe(1)
    expect(filtered[0].id).toBe('post-1')
  })

  it('should return empty array when no posts match tag', () => {
    const posts: BlogPost[] = [
      {
        id: 'post-1',
        title: 'Post 1',
        content: '<p>Content</p>',
        publicationDate: pastDate,
        slug: 'post-1',
        sourceFile: 'post1.md',
        tags: ['react'],
      },
    ]

    const filtered = filterPostsByTag(posts, 'vue')
    expect(filtered).toEqual([])
  })
})

