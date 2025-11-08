import type { BlogPost } from './types'

/**
 * Sort posts by publication date
 * @param posts - Array of blog posts
 * @param order - Sort order: 'desc' for newest first (default), 'asc' for oldest first
 * @returns Sorted array of posts
 */
export function sortPostsByDate(
  posts: BlogPost[],
  order: 'asc' | 'desc' = 'desc'
): BlogPost[] {
  const sorted = [...posts] // Create a copy to avoid mutating the original

  sorted.sort((a, b) => {
    const dateA = a.publicationDate.getTime()
    const dateB = b.publicationDate.getTime()

    // If dates are the same, sort by title for consistent ordering
    if (dateA === dateB) {
      return a.title.localeCompare(b.title)
    }

    // Sort by date
    return order === 'desc' ? dateB - dateA : dateA - dateB
  })

  return sorted
}

