import { describe, it, expect } from 'vitest'
import { sortPostsByDate } from '../../../src/lib/posts/sorter'
import type { BlogPost } from '../../../src/lib/posts/types'

describe('Post Sorter', () => {
  const createPost = (title: string, date: Date): BlogPost => ({
    id: title.toLowerCase(),
    title,
    content: '<p>Content</p>',
    publicationDate: date,
    slug: title.toLowerCase(),
    sourceFile: `${title}.md`,
  })

  it('should sort posts by date descending (newest first) by default', () => {
    const posts = [
      createPost('Old Post', new Date('2025-01-01')),
      createPost('New Post', new Date('2025-01-27')),
      createPost('Middle Post', new Date('2025-01-15')),
    ]

    const sorted = sortPostsByDate(posts)

    expect(sorted[0].title).toBe('New Post')
    expect(sorted[1].title).toBe('Middle Post')
    expect(sorted[2].title).toBe('Old Post')
  })

  it('should sort posts by date ascending (oldest first) when specified', () => {
    const posts = [
      createPost('New Post', new Date('2025-01-27')),
      createPost('Old Post', new Date('2025-01-01')),
      createPost('Middle Post', new Date('2025-01-15')),
    ]

    const sorted = sortPostsByDate(posts, 'asc')

    expect(sorted[0].title).toBe('Old Post')
    expect(sorted[1].title).toBe('Middle Post')
    expect(sorted[2].title).toBe('New Post')
  })

  it('should handle posts with same publication date by sorting by title', () => {
    const sameDate = new Date('2025-01-27')
    const posts = [
      createPost('Zebra Post', sameDate),
      createPost('Alpha Post', sameDate),
      createPost('Beta Post', sameDate),
    ]

    const sorted = sortPostsByDate(posts)

    expect(sorted[0].title).toBe('Alpha Post')
    expect(sorted[1].title).toBe('Beta Post')
    expect(sorted[2].title).toBe('Zebra Post')
  })

  it('should not mutate the original array', () => {
    const posts = [
      createPost('Old Post', new Date('2025-01-01')),
      createPost('New Post', new Date('2025-01-27')),
    ]

    const originalOrder = posts.map(p => p.title)
    sortPostsByDate(posts)

    expect(posts.map(p => p.title)).toEqual(originalOrder)
  })
})

