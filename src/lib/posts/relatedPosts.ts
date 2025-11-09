import type { BlogPost } from './types'
import { normalizeTag } from './tagNormalizer'

/**
 * Find posts related to the current post via shared tags.
 * Related posts are sorted by number of shared tags (descending),
 * then by publication date (descending).
 *
 * @param currentPost - The post for which to find related posts
 * @param allPosts - All available posts (should exclude future-dated posts)
 * @param limit - Maximum number of related posts to return (default: 5)
 * @returns Array of related posts, sorted by relevance
 */
export function findRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit: number = 5
): BlogPost[] {
  // If current post has no tags, return empty array
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return []
  }

  // Normalize current post's tags for matching
  const currentPostTags = currentPost.tags.map((tag) => normalizeTag(tag))

  // Find posts that share at least one tag, excluding current post
  const relatedPosts = allPosts
    .filter((post) => {
      // Exclude current post
      if (post.id === currentPost.id || post.slug === currentPost.slug) {
        return false
      }

      // Exclude posts without tags
      if (!post.tags || post.tags.length === 0) {
        return false
      }

      // Check if post shares at least one tag with current post
      const postTags = post.tags.map((tag) => normalizeTag(tag))
      return postTags.some((tag) => currentPostTags.includes(tag))
    })
    .map((post) => {
      // Calculate shared tag count
      const postTags = post.tags!.map((tag) => normalizeTag(tag))
      const sharedTagCount = postTags.filter((tag) => currentPostTags.includes(tag)).length

      return {
        post,
        sharedTagCount,
      }
    })
    .sort((a, b) => {
      // Sort by shared tag count (descending)
      if (b.sharedTagCount !== a.sharedTagCount) {
        return b.sharedTagCount - a.sharedTagCount
      }

      // If same shared tag count, sort by publication date (descending - newest first)
      return b.post.publicationDate.getTime() - a.post.publicationDate.getTime()
    })
    .slice(0, limit) // Limit results
    .map((item) => item.post) // Extract just the posts

  return relatedPosts
}

