import matter from 'gray-matter'

/**
 * Parse frontmatter from markdown content
 * @param content - Raw markdown content with frontmatter
 * @returns Object with frontmatter and body
 */
export function parseFrontmatter(content: string): {
  frontmatter: Record<string, unknown>
  body: string
} {
  try {
    const parsed = matter(content)
    
    // Ensure body doesn't contain frontmatter
    // gray-matter should already strip it, but let's be extra safe
    let body = parsed.content.trim()
    
    // Double-check: if body still starts with frontmatter markers, remove them
    // This handles edge cases where gray-matter might not have parsed correctly
    const frontmatterPattern = /^---\s*\n[\s\S]*?\n---\s*\n/
    if (frontmatterPattern.test(body)) {
      body = body.replace(frontmatterPattern, '').trim()
    }
    
    return {
      frontmatter: parsed.data || {},
      body: body,
    }
  } catch (error) {
    // If frontmatter parsing fails, treat entire content as body
    console.warn('Failed to parse frontmatter:', error)
    return {
      frontmatter: {},
      body: content,
    }
  }
}

