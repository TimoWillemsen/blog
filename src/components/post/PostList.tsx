import type { BlogPost } from '../../lib/posts/types'
import { PostCard } from './PostCard'

interface PostListProps {
  posts: BlogPost[]
  loading?: boolean
  error?: string | null
  onPostClick?: (post: BlogPost) => void
}

/**
 * Display a list of blog posts on the homepage
 */
export function PostList({ posts, loading, error, onPostClick }: PostListProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-[#6b6b6b] text-sm">Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border border-[#d4c4b0] rounded p-3">
        <p className="text-[#8b7355] text-sm">Error loading posts: {error}</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#6b6b6b] text-sm">No posts available yet.</p>
      </div>
    )
  }

  return (
    <div role="list" aria-label="Blog posts" aria-live="polite">
      {posts.map((post) => (
        <div key={post.id} role="listitem">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

