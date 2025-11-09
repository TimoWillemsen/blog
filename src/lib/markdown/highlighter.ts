import Prism from 'prismjs'

// Import required language definitions
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup' // HTML
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-sql'

/**
 * SyntaxHighlighter module for applying syntax highlighting to code blocks
 * using Prism.js
 * 
 * Supported languages:
 * - JavaScript (javascript, js)
 * - TypeScript (typescript, ts)
 * - Python (python, py)
 * - Bash (bash, sh, shell)
 * - JSON (json)
 * - Markdown (markdown, md)
 * - HTML (html, htm) - mapped to Prism.js 'markup'
 * - CSS (css)
 * - SQL (sql)
 */
class SyntaxHighlighter {
  private initialized = false

  /**
   * Initialize Prism.js with required language definitions
   * Should be called once during application startup
   */
  initialize(): void {
    if (this.initialized) {
      return
    }
    // Languages are imported above, Prism.js is ready to use
    this.initialized = true
  }

  /**
   * Check if a language is supported by Prism.js
   * @param language - Language identifier
   * @returns true if language is supported, false otherwise
   */
  isLanguageSupported(language: string): boolean {
    if (!language) {
      return false
    }
    const normalized = this.normalizeLanguage(language)
    return normalized in Prism.languages
  }

  /**
   * Highlight code with syntax highlighting if language is supported
   * @param code - Raw code content
   * @param language - Optional language identifier (e.g., "javascript", "python")
   * @returns Highlighted HTML string with Prism.js classes, or plain HTML if language not supported
   * 
   * Performance: Target < 50ms for typical code blocks (< 100 lines)
   * Bundle size: ~15-20KB additional (Prism.js core + 9 language definitions)
   */
  highlight(code: string, language?: string): string {
    // Handle empty or null code - ensure code is a string
    if (!code) {
      return ''
    }
    
    // Ensure code is a string (handle edge cases)
    const codeStr = String(code)

    // If no language provided, return plain code block
    if (!language) {
      return this.escapeHtml(codeStr)
    }

    // Normalize language identifier
    const normalized = this.normalizeLanguage(language)

    // Check if language is supported
    if (!this.isLanguageSupported(normalized)) {
      // Fallback to plain code block for unsupported languages
      return this.escapeHtml(codeStr)
    }

    try {
      // Apply Prism.js highlighting
      // Performance: Prism.js highlighting is typically < 50ms for code blocks < 100 lines
      const highlighted = Prism.highlight(codeStr, Prism.languages[normalized], normalized)
      return highlighted
    } catch (error) {
      // On error, fallback to plain code block
      if (import.meta.env.DEV) {
        console.warn(`[SyntaxHighlighter] Failed to highlight code with language "${language}":`, error)
      }
      return this.escapeHtml(codeStr)
    }
  }

  /**
   * Normalize language identifier (case-insensitive, handle aliases)
   * @param language - Language identifier
   * @returns Normalized language identifier
   */
  private normalizeLanguage(language: string): string {
    const lower = language.toLowerCase().trim()

    // Language alias mapping
    const aliases: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      py: 'python',
      sh: 'bash',
      shell: 'bash',
      md: 'markdown',
      html: 'markup', // Prism.js uses 'markup' for HTML
      htm: 'markup',
    }

    return aliases[lower] || lower
  }

  /**
   * Escape HTML entities in code content
   * @param text - Text to escape
   * @returns Escaped HTML string
   */
  private escapeHtml(text: string): string {
    // Ensure text is a string
    const textStr = String(text)
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return textStr.replace(/[&<>"']/g, (char) => map[char] || char)
  }
}

// Export singleton instance
export const syntaxHighlighter = new SyntaxHighlighter()

// Export functions for convenience
export function highlightCode(code: string, language?: string): string {
  return syntaxHighlighter.highlight(code, language)
}

export function isLanguageSupported(language: string): boolean {
  return syntaxHighlighter.isLanguageSupported(language)
}

export function initializeHighlighter(): void {
  syntaxHighlighter.initialize()
}

