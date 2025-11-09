import type { BlogPost } from './types'

/**
 * Determines if a blog post should be visible based on its publication date.
 * A post is published (visible) if its publication date is in the past or on the current date.
 * 
 * @param post - The blog post to check
 * @returns true if the post is published (should be visible), false otherwise
 */
export function isPostPublished(post: BlogPost): boolean {
  const now = new Date().getTime()
  const publicationTime = post.publicationDate.getTime()
  return publicationTime <= now
}

/**
 * Filters an array of blog posts to only include published posts.
 * 
 * @param posts - Array of blog posts to filter
 * @returns Array containing only published posts
 */
export function filterPublishedPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(isPostPublished)
}

