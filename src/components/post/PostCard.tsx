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
      className="border-b border-[#e8e6e3] py-6 group transition-all hover:border-[#d4c4b0]"
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      <Link 
        to={`/${post.slug}`} 
        className="block focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2 rounded-lg -mx-2 px-2 py-1 transition-all hover:bg-[#f5f3f0]"
        aria-label={`Read post: ${post.title}`}
      >
        <h2 
          id={`post-title-${post.id}`}
          className="text-xl font-semibold text-[#2d2d2d] group-hover:text-[#1a1a1a] transition-colors mb-2 leading-tight"
        >
          {post.title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-3 font-medium">
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
        {post.excerpt && post.excerpt.trim().length > 0 ? (
          <p className="text-base text-[#6b6b6b] line-clamp-2 leading-relaxed mb-1">{post.excerpt}</p>
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

