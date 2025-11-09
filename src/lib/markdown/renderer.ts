import { marked } from 'marked'
import { highlightCode, initializeHighlighter } from './highlighter'

// Initialize syntax highlighter once at module load
initializeHighlighter()

// Track if marked has been configured
let markedConfigured = false

// Configure marked with syntax highlighting support
function configureMarked(): void {
  if (markedConfigured) {
    return
  }

  // Configure marked to respect line breaks (convert single newlines to <br>)
  marked.setOptions({
    breaks: true, // Convert single newlines to <br> tags
    gfm: true, // Enable GitHub Flavored Markdown
  })

  // Configure custom code renderer for syntax highlighting
  marked.use({
    renderer: {
      code(token): string {
        // In marked v17, the code renderer receives a token object with text and lang properties
        // Ensure we have valid string values
        const code = (token?.text && typeof token.text === 'string') ? token.text : String(token?.text || '')
        const language = (token?.lang && typeof token.lang === 'string') ? token.lang : undefined

        if (!language) {
          // If no language, return plain code block
          const highlighted = highlightCode(code)
          return `<pre><code>${highlighted}</code></pre>`
        }

        // Normalize language identifier for highlighting (case-insensitive)
        const normalizedLanguage = language.toLowerCase().trim()
        
        // Highlight code using normalized language
        const highlighted = highlightCode(code, normalizedLanguage)
        
        // Use original language (lowercased) for CSS class to match user expectations
        // e.g., 'html' stays as 'html' even though Prism.js uses 'markup' internally
        const languageClass = normalizedLanguage
        
        // Wrap in pre/code with language class
        return `<pre class="language-${languageClass}"><code class="language-${languageClass}">${highlighted}</code></pre>`
      },
    },
  })

  markedConfigured = true
}

/**
 * Convert markdown to HTML
 * @param markdown - Markdown content
 * @returns HTML string
 */
export function renderMarkdown(markdown: string): string {
  try {
    // Configure marked on first use
    configureMarked()

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
    
    // Use marked.parse() for synchronous parsing (marked v17)
    const html = marked.parse(cleanMarkdown) as string
    
    // Verify we got HTML back (not the original markdown)
    if (html === cleanMarkdown && cleanMarkdown.length > 0) {
      console.warn('[renderMarkdown] marked.parse returned original markdown, this may indicate an error')
    }
    
    return html
  } catch (error) {
    console.error('Failed to render markdown:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack)
    }
    // Return original markdown as fallback if rendering fails
    return markdown
  }
}

