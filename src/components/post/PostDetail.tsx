import { Link } from 'react-router-dom'
import type { BlogPost } from '../../lib/posts/types'
import { MarkdownRenderer } from './MarkdownRenderer'

interface PostDetailProps {
  post: BlogPost | null
  loading?: boolean
  error?: string | null
  onBack?: () => void
}

/**
 * Display full blog post content
 */
export function PostDetail({ post, loading, error, onBack }: PostDetailProps) {
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

      <header className="mb-6 pb-4 border-b border-[#e8e6e3]">
        <h1 
          id="post-detail-title"
          className="text-2xl font-semibold text-[#2d2d2d] mb-3 leading-tight"
        >
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6b6b6b]" role="contentinfo">
          <time 
            dateTime={post.publicationDate.toISOString()}
            aria-label={`Published on ${formattedDate}`}
          >
            {formattedDate}
          </time>
          {post.author && (
            <>
              <span aria-hidden="true">•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>
      </header>

      <div className="prose max-w-none prose-headings:font-semibold prose-headings:text-[#2d2d2d] prose-p:text-[#2d2d2d] prose-p:leading-relaxed prose-a:text-[#8b7355] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#2d2d2d] prose-code:text-[#8b7355] prose-code:bg-[#f5f3f0] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#2d2d2d] prose-pre:text-[#faf9f7] prose-blockquote:border-[#d4c4b0] prose-blockquote:text-[#6b6b6b]" role="main">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  )
}

