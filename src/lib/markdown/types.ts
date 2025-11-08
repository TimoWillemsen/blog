/**
 * MarkdownFile entity - represents a source markdown file
 */
export interface MarkdownFile {
  path: string
  filename: string
  content: string
  frontmatter: Record<string, unknown>
  body: string
  lastModified: Date
}

