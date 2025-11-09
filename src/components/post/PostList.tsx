import type { BlogPost } from '../../lib/posts/types'
import { PostCard } from './PostCard'

interface PostListProps {
  posts: BlogPost[]
  loading?: boolean
  error?: string | null
  activeTag?: string | null
  onTagClick?: (tag: string) => void
  onClearFilter?: () => void
}

/**
 * Display a list of blog posts on the homepage
 */
export function PostList({ posts, loading, error, activeTag, onTagClick, onClearFilter }: PostListProps) {
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
        <p className="text-[#6b6b6b] text-sm">
          {activeTag ? `No posts match the tag "${activeTag}".` : 'No posts available yet.'}
        </p>
        {activeTag && onClearFilter && (
          <button
            onClick={onClearFilter}
            className="mt-2 text-[#8b7355] hover:text-[#2d2d2d] text-sm underline focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2 rounded"
            aria-label="Clear tag filter"
          >
            Clear filter
          </button>
        )}
      </div>
    )
  }

  return (
    <div role="list" aria-label="Blog posts" aria-live="polite">
      {activeTag && (
        <div className="mb-6 p-4 bg-[#f5f3f0] border border-[#d4c4b0] rounded-lg flex items-center justify-between shadow-sm" role="status" aria-live="polite">
          <span className="text-sm text-[#6b6b6b]">
            Filtered by: <span className="font-semibold text-[#2d2d2d]">{activeTag}</span>
          </span>
          {onClearFilter && (
            <button
              onClick={onClearFilter}
              className="text-xs font-medium text-[#8b7355] hover:text-[#2d2d2d] underline focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2 rounded transition-colors"
              aria-label="Clear tag filter"
            >
              Clear
            </button>
          )}
        </div>
      )}
      {posts.map((post) => (
        <div key={post.id} role="listitem">
          <PostCard post={post} onTagClick={onTagClick} activeTag={activeTag} />
        </div>
      ))}
    </div>
  )
}

