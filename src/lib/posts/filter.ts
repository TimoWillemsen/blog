import type { BlogPost } from './types'
import { normalizeTag } from './tagNormalizer'

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

/**
 * Filters an array of blog posts by tag.
 * Returns all posts when tag is null, or only posts containing the specified tag.
 * Filtering is case-insensitive and respects post visibility rules.
 * 
 * @param posts - Array of blog posts to filter
 * @param tag - Tag to filter by (null to return all published posts)
 * @returns Array containing only published posts with matching tag, or all published posts if tag is null
 */
export function filterPostsByTag(posts: BlogPost[], tag: string | null): BlogPost[] {
  // First, filter by published status to respect visibility rules
  const publishedPosts = filterPublishedPosts(posts)

  // If no tag specified, return all published posts
  if (tag === null) {
    return publishedPosts
  }

  // Normalize the filter tag for case-insensitive matching
  const normalizedFilterTag = normalizeTag(tag)

  // Filter posts that have the matching tag
  return publishedPosts.filter((post) => {
    // Exclude posts without tags
    if (!post.tags || post.tags.length === 0) {
      return false
    }

    // Check if any of the post's tags match the filter tag (case-insensitive)
    return post.tags.some((postTag) => normalizeTag(postTag) === normalizedFilterTag)
  })
}

