import type { BlogPost } from './types'
import { parseFile, parseMarkdown } from '../markdown/parser'
import { generateSlug } from './slug'
import { shouldIgnoreFile } from './scanner'
import { handleError } from '../errors/handlers'
import { sortPostsByDate } from './sorter'

/**
 * PostLoader service interface
 */
export interface PostLoader {
  loadAllPosts(): Promise<BlogPost[]>
  loadPost(slug: string): Promise<BlogPost | null>
  watchForChanges(callback: (posts: BlogPost[]) => void): () => void
}

/**
 * PostLoader service implementation
 * Loads markdown files and converts them to BlogPost entities
 */
class PostLoaderImpl implements PostLoader {
  async loadAllPosts(): Promise<BlogPost[]> {
    try {
      // In browser environment, we need to use import.meta.glob to load markdown files
      // This is a Vite feature that allows importing files at build time
      // Use ?raw query parameter to import files as raw text
      const modules = import.meta.glob('/src/content/posts/*.md', {
        query: '?raw',
        eager: false
      })

      const posts: BlogPost[] = []

      for (const path in modules) {
        try {
          const filename = path.split('/').pop() || ''
          
          // Skip files that should be ignored
          if (shouldIgnoreFile(filename)) {
            continue
          }

          // Load the markdown file as raw text
          // When using ?raw query without import: 'default', it returns the string directly
          const module = await modules[path]()
          
          // With ?raw, the module should be a string directly
          let content = typeof module === 'string' 
            ? module 
            : (module as { default?: string })?.default || String(module || '')
          
          if (content.length === 0) {
            continue
          }

          // Parse the markdown file - this separates frontmatter from body
          let { frontmatter, body } = parseFile(content)
          
          // Verify body doesn't contain frontmatter markers
          if (body.trim().startsWith('---')) {
            // Try to manually strip it
            const cleanedBody = body.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '').trim()
            if (cleanedBody !== body) {
              body = cleanedBody
            }
          }
          
          // Only parse the body (markdown content without frontmatter)
          const htmlContent = parseMarkdown(body)

          // Extract metadata with defaults
          // Title: from frontmatter, or derive from filename (remove extension, convert to title case)
          const titleFromFilename = filename
            .replace(/\.md$/, '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase())
          const title = (frontmatter.title as string) || titleFromFilename
          
          // Date: from frontmatter, or use current date as fallback
          const dateStr = frontmatter.date as string
          let publicationDate: Date
          if (dateStr) {
            const parsedDate = new Date(dateStr)
            publicationDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate
          } else {
            publicationDate = new Date() // Fallback to current date if not provided
          }
          
          const author = (frontmatter.author as string) || 'Timo Willemsen'
          // Extract excerpt, ensuring it's a non-empty string
          const excerptValue = frontmatter.excerpt as string | undefined
          const excerpt = excerptValue && excerptValue.trim().length > 0 
            ? excerptValue.trim() 
            : undefined

          // Generate slug from title or filename
          const slug = generateSlug(frontmatter.slug as string || title)

          const post: BlogPost = {
            id: slug,
            title,
            content: htmlContent,
            rawContent: body,
            publicationDate,
            author,
            slug,
            excerpt,
            sourceFile: path,
            metadata: frontmatter,
          }

          posts.push(post)
        } catch (error) {
          // Enhanced error handling for malformed markdown files
          const fileError = path.split('/').pop() || path
          handleError(error, `Failed to load post from ${path}`)
          console.error(`Skipping file ${fileError} due to error:`, error)
          // Continue processing other files
        }
      }

      // Sort by publication date (newest first)
      const sortedPosts = sortPostsByDate(posts, 'desc')
      return sortedPosts
    } catch (error) {
      handleError(error, 'loadAllPosts')
      return []
    }
  }

  async loadPost(slug: string): Promise<BlogPost | null> {
    try {
      const posts = await this.loadAllPosts()
      return posts.find(post => post.slug === slug) || null
    } catch (error) {
      handleError(error, `loadPost(${slug})`)
      return null
    }
  }

  watchForChanges(callback: (posts: BlogPost[]) => void): () => void {
    // In browser environment, file watching is not directly available
    // However, we can use Vite's HMR or provide a manual refresh mechanism
    // For now, we'll provide a way to manually trigger reload
    let intervalId: number | null = null
    
    // In development, we can poll for changes (not ideal, but works)
    // In production, this would need a different approach (e.g., server-side file watching)
    if (import.meta.env.DEV) {
      // Poll every 5 seconds in development
      intervalId = window.setInterval(async () => {
        try {
          const posts = await this.loadAllPosts()
          callback(posts)
        } catch (error) {
          handleError(error, 'watchForChanges')
        }
      }, 5000)
    }
    
    // Return cleanup function
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
      }
    }
  }
}

// Export singleton instance
export const postLoader: PostLoader = new PostLoaderImpl()
