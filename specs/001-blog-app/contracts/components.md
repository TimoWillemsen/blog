# Component Contracts: Simple Blog Application

**Date**: 2025-01-27  
**Feature**: Simple Blog Application

## Component Interface Contracts

### PostList Component

**Purpose**: Display a list of blog posts on the homepage.

**Props Interface**:
```typescript
interface PostListProps {
  posts: BlogPost[];
  loading?: boolean;
  error?: string | null;
  onPostClick?: (post: BlogPost) => void;
}
```

**Behavior Contract**:
- MUST display posts in reverse chronological order (newest first)
- MUST show loading state when `loading === true`
- MUST show error message when `error` is provided
- MUST call `onPostClick` when a post is clicked (if provided)
- MUST display post title and publication date for each post
- MUST handle empty state (no posts available)

**Accessibility Requirements**:
- MUST have proper ARIA labels for list and list items
- MUST be keyboard navigable
- MUST have focus indicators

### PostCard Component

**Purpose**: Display a single post preview in the list.

**Props Interface**:
```typescript
interface PostCardProps {
  post: BlogPost;
  onClick?: () => void;
}
```

**Behavior Contract**:
- MUST display post title
- MUST display publication date in readable format
- MUST display excerpt if available in post metadata
- MUST display author name if available
- MUST be clickable (triggers `onClick` if provided)
- MUST have hover state for interactivity
- MUST use clean, minimal styling with brown/beige color scheme

**Accessibility Requirements**:
- MUST be keyboard accessible (Enter/Space to activate)
- MUST have proper ARIA role (article or button)
- MUST have accessible name (post title)

### PostDetail Component

**Purpose**: Display full blog post content.

**Props Interface**:
```typescript
interface PostDetailProps {
  post: BlogPost | null;
  loading?: boolean;
  error?: string | null;
  onBack?: () => void;
}
```

**Behavior Contract**:
- MUST display full post content (HTML rendered from markdown)
- MUST display post title from frontmatter only (not from markdown H1)
- MUST display publication date
- MUST display author name
- MUST show loading state when `loading === true`
- MUST show error message when `error` is provided
- MUST handle null post (show not found message)
- MUST call `onBack` when back button is clicked (if provided)
- MUST preserve line breaks in markdown content

**Accessibility Requirements**:
- MUST have proper heading hierarchy (h1 for title)
- MUST have proper article semantics
- MUST be keyboard navigable
- MUST have skip links if needed

### MarkdownRenderer Component

**Purpose**: Safely render markdown content as HTML.

**Props Interface**:
```typescript
interface MarkdownRendererProps {
  content: string;
  className?: string;
}
```

**Behavior Contract**:
- MUST convert markdown to HTML
- MUST sanitize HTML output to prevent XSS
- MUST preserve markdown formatting (headers, lists, code blocks, links)
- MUST preserve line breaks (single newlines converted to <br> tags)
- MUST handle empty content gracefully
- MUST apply provided className to container
- MUST use marked library with breaks: true option

**Security Requirements**:
- MUST sanitize all HTML output
- MUST not execute scripts in rendered content
- MUST escape dangerous HTML tags

### PostLoader Service

**Purpose**: Load and parse markdown files into BlogPost entities.

**Interface**:
```typescript
interface PostLoader {
  loadAllPosts(): Promise<BlogPost[]>;
  loadPost(slug: string): Promise<BlogPost | null>;
  watchForChanges(callback: (posts: BlogPost[]) => void): () => void;
}
```

**Behavior Contract**:
- `loadAllPosts()` MUST return all posts from content directory
- `loadAllPosts()` MUST handle file reading errors gracefully
- `loadAllPosts()` MUST skip invalid/malformed files
- `loadPost(slug)` MUST return post matching slug or null if not found
- `watchForChanges()` MUST call callback when files are added/modified/removed
- `watchForChanges()` MUST return cleanup function to stop watching

**Error Handling**:
- MUST log errors for invalid files
- MUST continue processing other files if one fails
- MUST return empty array if directory doesn't exist
- MUST handle browser environment requirements (e.g., Buffer polyfill for gray-matter)
- MUST ensure frontmatter is completely separated from markdown body

### MarkdownParser Service

**Purpose**: Parse markdown files and extract frontmatter.

**Interface**:
```typescript
interface MarkdownParser {
  parseFile(content: string): {
    frontmatter: Record<string, any>;
    body: string;
  };
  parseFrontmatter(content: string): Record<string, any>;
  parseMarkdown(markdown: string): string; // Returns HTML
}
```

**Behavior Contract**:
- `parseFile()` MUST extract YAML frontmatter and markdown body
- `parseFile()` MUST handle missing frontmatter (return empty object)
- `parseFile()` MUST ensure frontmatter markers are completely removed from body
- `parseFrontmatter()` MUST parse YAML frontmatter
- `parseFrontmatter()` MUST handle invalid YAML gracefully
- `parseMarkdown()` MUST convert markdown to HTML
- `parseMarkdown()` MUST handle common markdown features (headers, lists, code, links)
- `parseMarkdown()` MUST preserve line breaks (configure marked with breaks: true)

**Validation**:
- MUST validate frontmatter structure
- MUST provide defaults for missing required fields
- MUST handle special characters in content

## Data Flow Contracts

### Homepage → PostList → PostCard

1. Homepage component loads posts via `PostLoader.loadAllPosts()`
2. Posts passed to `PostList` component
3. `PostList` renders `PostCard` for each post (with excerpt if available)
4. User clicks `PostCard` → navigate to post detail page using clean URL (/:slug)

### PostDetail Page Flow

1. Route extracts slug from URL (clean URL format: /:slug)
2. `PostDetail` component loads post via `PostLoader.loadPost(slug)`
3. Post title displayed from frontmatter metadata (not from markdown H1)
4. Post content rendered via `MarkdownRenderer` (with line breaks preserved)
5. User clicks back → navigate to homepage

### File Change Detection Flow

1. `PostLoader.watchForChanges()` monitors file system
2. File added/modified/deleted → callback triggered
3. Posts re-loaded and state updated
4. UI re-renders with new data

## Error Contract

**Error States**:
- **File not found**: Return null, show "Post not found" message
- **Invalid markdown**: Skip file, log error, continue processing
- **Network error** (if fetching): Show error message, allow retry
- **Parse error**: Show error for specific file, continue with others

**Error Display**:
- MUST show user-friendly error messages
- MUST not expose internal file paths or technical details
- MUST provide actionable next steps (retry, go back, etc.)

## Performance Contract

**Loading States**:
- Initial load: Show skeleton/loading state
- Post navigation: Show loading state during fetch
- File changes: Update without full page reload

**Caching**:
- Posts cached in memory after first load
- Re-fetch only on file changes
- Individual posts cached by slug

**Optimization**:
- Lazy load post content (code splitting)
- Virtual scrolling for large post lists
- Image lazy loading if images added later

