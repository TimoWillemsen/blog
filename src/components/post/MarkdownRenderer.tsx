import { useMemo } from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

/**
 * Safely render markdown content as HTML
 */
export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const htmlContent = useMemo(() => {
    if (!content) return ''
    return content
  }, [content])

  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

