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
            className="px-2 py-1 text-xs rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={
              isActive
                ? {
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    borderColor: 'var(--color-accent)',
                    '--tw-ring-color': 'var(--color-accent)',
                  } as React.CSSProperties & { '--tw-ring-color': string }
                : {
                    backgroundColor: 'transparent',
                    color: 'var(--color-tag-text)',
                    borderColor: 'var(--color-border)',
                    '--tw-ring-color': 'var(--color-accent)',
                  } as React.CSSProperties & { '--tw-ring-color': string }
            }
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'var(--color-tag-hover)'
                e.currentTarget.style.borderColor = 'var(--color-accent)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = 'var(--color-border)'
              }
            }}
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

