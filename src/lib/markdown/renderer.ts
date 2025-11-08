import { marked } from 'marked'

// Configure marked to respect line breaks (convert single newlines to <br>)
marked.setOptions({
  breaks: true, // Convert single newlines to <br> tags
  gfm: true, // Enable GitHub Flavored Markdown
})

/**
 * Convert markdown to HTML
 * @param markdown - Markdown content
 * @returns HTML string
 */
export function renderMarkdown(markdown: string): string {
  try {
    // Ensure we're not rendering frontmatter
    let cleanMarkdown = markdown.trim()
    
    // Remove any frontmatter that might have slipped through
    if (cleanMarkdown.startsWith('---')) {
      const parts = cleanMarkdown.split('---')
      if (parts.length >= 3) {
        // Skip frontmatter (first two parts: empty string and frontmatter content)
        cleanMarkdown = parts.slice(2).join('---').trim()
      }
    }
    
    if (import.meta.env.DEV && cleanMarkdown.length === 0) {
      console.warn('Empty markdown content after cleaning')
    }
    
    return marked(cleanMarkdown) as string
  } catch (error) {
    console.error('Failed to render markdown:', error)
    return markdown // Return original if rendering fails
  }
}

