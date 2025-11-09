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
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border rounded p-3" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-sm" style={{ color: 'var(--color-accent)' }}>Error loading posts: {error}</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {activeTag ? `No posts match the tag "${activeTag}".` : 'No posts available yet.'}
        </p>
        {activeTag && onClearFilter && (
          <button
            onClick={onClearFilter}
            className="mt-2 text-sm underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded transition-colors"
            style={{ 
              color: 'var(--color-accent)',
              '--tw-ring-color': 'var(--color-accent)',
            } as React.CSSProperties & { '--tw-ring-color': string }}
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
        <div 
          className="mb-6 p-4 rounded-lg flex items-center justify-between shadow-sm" 
          style={{ 
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          role="status" 
          aria-live="polite"
        >
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Filtered by: <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{activeTag}</span>
          </span>
          {onClearFilter && (
            <button
              onClick={onClearFilter}
              className="text-xs font-medium underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded transition-colors"
              style={{ 
                color: 'var(--color-accent)',
                '--tw-ring-color': 'var(--color-accent)',
              } as React.CSSProperties & { '--tw-ring-color': string }}
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

