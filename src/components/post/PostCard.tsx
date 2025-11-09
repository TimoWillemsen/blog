import { Link } from 'react-router-dom'
import type { BlogPost } from '../../lib/posts/types'
import { TagList } from './TagList'

interface PostCardProps {
  post: BlogPost
  onTagClick?: (tag: string) => void
  activeTag?: string | null
}

/**
 * Display a single post preview in the list
 */
export function PostCard({ post, onTagClick, activeTag }: PostCardProps) {
  const formattedDate = new Date(post.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article 
      className="border-b py-6 group transition-all"
      style={{ 
        borderColor: 'var(--color-border)'
      }}
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      <Link 
        to={`/${post.slug}`} 
        className="block focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg -mx-2 px-2 py-1 transition-all"
        style={{ 
          '--tw-ring-color': 'var(--color-accent)',
        } as React.CSSProperties & { '--tw-ring-color': string }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)'
          e.currentTarget.style.borderColor = 'var(--color-hover-border)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.borderColor = 'transparent'
        }}
        aria-label={`Read post: ${post.title}`}
      >
        <h2 
          id={`post-title-${post.id}`}
          className="text-xl font-semibold transition-colors mb-2 leading-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {post.title}
        </h2>
        <div 
          className="flex items-center gap-2 text-sm mb-3 font-medium"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <time 
            dateTime={post.publicationDate.toISOString()}
            aria-label={`Published on ${formattedDate}`}
          >
            {formattedDate}
          </time>
          {post.author && (
            <>
              <span aria-hidden="true" style={{ color: 'var(--color-border)' }}>•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>
        {post.excerpt && post.excerpt.trim().length > 0 ? (
          <p 
            className="text-base line-clamp-2 leading-relaxed mb-1"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {post.excerpt}
          </p>
        ) : null}
      </Link>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
          <TagList tags={post.tags} onTagClick={onTagClick} activeTag={activeTag} />
        </div>
      )}
    </article>
  )
}

