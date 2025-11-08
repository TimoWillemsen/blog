import { Link } from 'react-router-dom'
import type { BlogPost } from '../../lib/posts/types'

interface PostCardProps {
  post: BlogPost
}

/**
 * Display a single post preview in the list
 */
export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article 
      className="border-b border-[#e8e6e3] py-4 group"
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      <Link 
        to={`/${post.slug}`} 
        className="block focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2 rounded"
        aria-label={`Read post: ${post.title}`}
      >
        <h2 
          id={`post-title-${post.id}`}
          className="text-base font-medium text-[#2d2d2d] group-hover:text-[#1a1a1a] transition-colors mb-1.5"
        >
          {post.title}
        </h2>
        <div className="flex items-center gap-2 text-xs text-[#6b6b6b] mb-2">
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
        {post.excerpt && post.excerpt.trim().length > 0 ? (
          <p className="text-sm text-[#6b6b6b] line-clamp-2 leading-relaxed">{post.excerpt}</p>
        ) : null}
      </Link>
    </article>
  )
}

