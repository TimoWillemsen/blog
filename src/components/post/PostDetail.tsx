import { Link } from 'react-router-dom'
import type { BlogPost } from '../../lib/posts/types'
import { MarkdownRenderer } from './MarkdownRenderer'
import { TagList } from './TagList'

interface PostDetailProps {
  post: BlogPost | null
  loading?: boolean
  error?: string | null
  onBack?: () => void
  onTagClick?: (tag: string) => void
  activeTag?: string | null
  relatedPosts?: BlogPost[]
}

/**
 * Display full blog post content
 */
export function PostDetail({ post, loading, error, onBack, onTagClick, activeTag, relatedPosts }: PostDetailProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Loading post...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border rounded p-3" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-sm mb-3" style={{ color: 'var(--color-accent)' }}>Error loading post: {error}</p>
        <Link to="/" className="text-sm" style={{ color: 'var(--color-accent)' }}>
          ← Back to homepage
        </Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-8">
        <h1 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Post not found</h1>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>The post you're looking for doesn't exist.</p>
        <Link to="/" className="text-sm" style={{ color: 'var(--color-accent)' }}>
          ← Back to homepage
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(post.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article 
      className=""
      role="article"
      aria-labelledby="post-detail-title"
    >
      <Link
        to="/"
        className="text-sm mb-6 inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded transition-colors group"
        style={{ 
          color: 'var(--color-text-secondary)',
          '--tw-ring-color': 'var(--color-accent)',
        } as React.CSSProperties & { '--tw-ring-color': string }}
        onClick={onBack}
        aria-label="Back to homepage"
      >
        <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <header className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h1 
          id="post-detail-title"
          className="text-2xl font-semibold mb-4 leading-tight tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {post.title}
        </h1>
        <div 
          className="flex flex-wrap items-center gap-2 text-sm font-medium mb-4" 
          style={{ color: 'var(--color-text-secondary)' }}
          role="contentinfo"
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
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4">
            <TagList tags={post.tags} onTagClick={onTagClick} activeTag={activeTag} />
          </div>
        )}
      </header>

      <div className="prose max-w-none" role="main">
        <MarkdownRenderer content={post.content} />
      </div>

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <h2 
            className="text-xl font-semibold mb-6 tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Related Articles
          </h2>
          <div className="space-y-5">
            {relatedPosts.map((relatedPost) => (
              <article 
                key={relatedPost.id} 
                className="border-b pb-5 last:border-b-0 group"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <Link
                  to={`/${relatedPost.slug}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg -mx-2 px-2 py-1 transition-all"
                  style={{ 
                    '--tw-ring-color': 'var(--color-accent)',
                  } as React.CSSProperties & { '--tw-ring-color': string }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-hover-bg)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <h3 
                    className="text-lg font-semibold transition-colors mb-2 leading-tight"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {relatedPost.title}
                  </h3>
                  <div 
                    className="flex items-center gap-2 text-xs mb-2 font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <time dateTime={relatedPost.publicationDate.toISOString()}>
                      {new Date(relatedPost.publicationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {relatedPost.author && (
                      <>
                        <span aria-hidden="true" style={{ color: 'var(--color-border)' }}>•</span>
                        <span>{relatedPost.author}</span>
                      </>
                    )}
                  </div>
                  {relatedPost.excerpt && (
                    <p 
                      className="text-sm line-clamp-2 leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {relatedPost.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

