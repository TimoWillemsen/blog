import { normalizeTag } from '../../lib/posts/tagNormalizer'

interface TagListProps {
  tags: string[]
  activeTag?: string | null
  onTagClick?: (tag: string) => void
  className?: string
}

/**
 * Display a list of tags as clickable badges/chips.
 * Tags are displayed with consistent styling and support keyboard navigation.
 */
export function TagList({ tags, activeTag, onTagClick, className }: TagListProps) {
  // Don't render anything if no tags
  if (!tags || tags.length === 0) {
    return null
  }

  const normalizedActiveTag = activeTag ? normalizeTag(activeTag) : null

  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {tags.map((tag, index) => {
        const normalizedTag = normalizeTag(tag)
        const isActive = normalizedActiveTag === normalizedTag

        const tagElement = (
          <button
            key={`${tag}-${index}`}
            type="button"
            onClick={() => onTagClick?.(tag)}
            className={`
              px-2 py-1 text-xs rounded
              border transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-1
              ${
                isActive
                  ? 'bg-[#8b7355] text-white border-[#8b7355]'
                  : 'bg-transparent text-[#6b6b6b] border-[#d4c4b0] hover:bg-[#f5f3f0] hover:border-[#8b7355]'
              }
            `}
            aria-label={`Tag: ${tag}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {tag}
          </button>
        )

        return tagElement
      })}
    </div>
  )
}

