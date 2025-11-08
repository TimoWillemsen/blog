/**
 * BlogPost entity - represents a single blog post entry
 */
export interface BlogPost {
  id: string
  title: string
  content: string
  rawContent?: string
  publicationDate: Date
  author?: string
  slug: string
  excerpt?: string
  sourceFile: string
  metadata?: Record<string, unknown>
}

