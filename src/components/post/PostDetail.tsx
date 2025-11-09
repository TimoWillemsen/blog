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
        <p className="text-[#6b6b6b] text-sm">Loading post...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border border-[#d4c4b0] rounded p-3">
        <p className="text-[#8b7355] text-sm mb-3">Error loading post: {error}</p>
        <Link to="/" className="text-[#8b7355] hover:text-[#2d2d2d] text-sm">
          ← Back to homepage
        </Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-8">
        <h1 className="text-lg font-semibold text-[#2d2d2d] mb-2">Post not found</h1>
        <p className="text-[#6b6b6b] text-sm mb-4">The post you're looking for doesn't exist.</p>
        <Link to="/" className="text-[#8b7355] hover:text-[#2d2d2d] text-sm">
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
        className="text-[#6b6b6b] hover:text-[#2d2d2d] text-sm mb-6 inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2 rounded transition-colors group"
        onClick={onBack}
        aria-label="Back to homepage"
      >
        <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <header className="mb-8 pb-6 border-b border-[#e8e6e3]">
        <h1 
          id="post-detail-title"
          className="text-2xl font-semibold text-[#2d2d2d] mb-4 leading-tight tracking-tight"
        >
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#6b6b6b] font-medium mb-4" role="contentinfo">
          <time 
            dateTime={post.publicationDate.toISOString()}
            aria-label={`Published on ${formattedDate}`}
          >
            {formattedDate}
          </time>
          {post.author && (
            <>
              <span aria-hidden="true" className="text-[#d4c4b0]">•</span>
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

      <div className="prose max-w-none prose-headings:font-semibold prose-headings:text-[#2d2d2d] prose-p:text-[#2d2d2d] prose-p:leading-relaxed prose-a:text-[#8b7355] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#2d2d2d] prose-code:text-[#8b7355] prose-code:bg-[#f5f3f0] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#2d2d2d] prose-pre:text-[#faf9f7] prose-blockquote:border-[#d4c4b0] prose-blockquote:text-[#6b6b6b]" role="main">
        <MarkdownRenderer content={post.content} />
      </div>

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t border-[#e8e6e3]">
          <h2 className="text-xl font-semibold text-[#2d2d2d] mb-6 tracking-tight">Related Articles</h2>
          <div className="space-y-5">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="border-b border-[#e8e6e3] pb-5 last:border-b-0 group">
                <Link
                  to={`/${relatedPost.slug}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2 rounded-lg -mx-2 px-2 py-1 transition-all hover:bg-[#f5f3f0]"
                >
                  <h3 className="text-lg font-semibold text-[#2d2d2d] group-hover:text-[#1a1a1a] transition-colors mb-2 leading-tight">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#6b6b6b] mb-2 font-medium">
                    <time dateTime={relatedPost.publicationDate.toISOString()}>
                      {new Date(relatedPost.publicationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {relatedPost.author && (
                      <>
                        <span aria-hidden="true" className="text-[#d4c4b0]">•</span>
                        <span>{relatedPost.author}</span>
                      </>
                    )}
                  </div>
                  {relatedPost.excerpt && (
                    <p className="text-sm text-[#6b6b6b] line-clamp-2 leading-relaxed">
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

