# Data Model: About Me Page

**Feature**: About Me Page  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Entities

### AboutPage

Represents the about page content loaded from markdown file.

**Fields**:
- `title: string` - Page title (from frontmatter, defaults to "About" if not provided)
- `content: string` - HTML content rendered from markdown body
- `rawContent?: string` - Optional raw markdown content (for development/debugging)
- `metadata?: Record<string, unknown>` - Optional additional frontmatter metadata (e.g., lastUpdated date)

**Relationships**:
- None (standalone entity, not related to blog posts)

**Validation Rules**:
- `title` must be a non-empty string (defaults to "About" if missing)
- `content` must be valid HTML (sanitized by markdown renderer)
- `metadata` is optional and can contain any key-value pairs from frontmatter

**State Transitions**:
- **Initial**: About page markdown file exists in `src/content/about.md`
- **Loaded**: File content parsed, frontmatter extracted, markdown converted to HTML
- **Rendered**: HTML content displayed in AboutPage component via MarkdownRenderer

**Example**:
```typescript
{
  title: "About",
  content: "<h1>About Timo</h1><p>I'm an engineering manager...</p>",
  rawContent: "# About Timo\n\nI'm an engineering manager...",
  metadata: {
    lastUpdated: "2025-01-27"
  }
}
```

## Data Flow

### Loading Flow

1. **File Location**: `src/content/about.md`
2. **Loader**: `AboutLoader.loadAboutPage()`
3. **Parsing**: 
   - Use `parseFile()` to extract frontmatter and markdown body
   - Use `parseMarkdown()` to convert body to HTML
   - Extract title from frontmatter (default: "About")
4. **Result**: `AboutPage` entity with title, content, and optional metadata

### Rendering Flow

1. **Component**: `AboutPage` receives `AboutPage` entity
2. **Display**: 
   - Title displayed as page heading
   - Content passed to `MarkdownRenderer` component
   - Metadata displayed optionally (if provided)

## Comparison with BlogPost Entity

**Similarities**:
- Both use markdown files with frontmatter
- Both use same markdown parsing utilities
- Both have title and content fields

**Differences**:
- `AboutPage` has no `slug` (not needed for single page)
- `AboutPage` has no `publicationDate` (not time-sensitive content)
- `AboutPage` has no `excerpt` (not displayed in lists)
- `AboutPage` has no `id` (single instance, no need for identification)
- `AboutPage` has no `sourceFile` (known location, not needed)
- `AboutPage` is simpler: single page vs. collection of posts

## Data Storage

- **Format**: Markdown file with YAML frontmatter
- **Location**: `src/content/about.md`
- **Loading**: At runtime via Vite's `import.meta.glob` (similar to blog posts)
- **Caching**: Optional (can cache parsed result, but not required for single page)

## Validation

### Frontmatter Validation
- Title: Optional string, defaults to "About"
- Other fields: Any key-value pairs allowed in metadata

### Content Validation
- Markdown body: Must be valid markdown (parser handles errors gracefully)
- HTML output: Sanitized by existing sanitizer utility

### File Validation
- File must exist at `src/content/about.md`
- File must be readable
- File must contain valid markdown (or at least parseable content)

