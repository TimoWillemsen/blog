import { parseFile, parseMarkdown } from '../markdown/parser'
import type { AboutPage } from './types'

/**
 * AboutLoader service interface
 */
export interface AboutLoader {
  loadAboutPage(): Promise<AboutPage>
}

/**
 * AboutLoader service implementation
 * Loads about page markdown file and converts it to AboutPage entity
 */
class AboutLoaderImpl implements AboutLoader {
  async loadAboutPage(): Promise<AboutPage> {
    try {
      // Use import.meta.glob to load the about.md file
      // This is a Vite feature that allows importing files at build time
      // Use ?raw query parameter to import files as raw text
      const modules = import.meta.glob('/src/content/about.md', {
        query: '?raw',
        eager: false
      })

      // Load the about.md file
      const module = await modules['/src/content/about.md']()
      
      // With ?raw, the module should be a string directly
      const content = typeof module === 'string' 
        ? module 
        : (module as { default?: string })?.default || String(module || '')
      
      if (content.length === 0) {
        throw new Error('About page content is empty')
      }

      // Parse the markdown file - this separates frontmatter from body
      const { frontmatter, body } = parseFile(content)
      
      // Convert markdown body to HTML
      const htmlContent = parseMarkdown(body)

      // Extract title from frontmatter, default to "About"
      const title = (frontmatter.title as string) || 'About'

      return {
        title,
        content: htmlContent,
        rawContent: body,
        metadata: frontmatter
      }
    } catch (error) {
      // Handle file not found or other errors
      if (error instanceof Error) {
        throw new Error(`Failed to load about page: ${error.message}`)
      }
      throw new Error('Failed to load about page: Unknown error')
    }
  }
}

export const aboutLoader = new AboutLoaderImpl()

