# Component Contracts: About Me Page

**Date**: 2025-01-27  
**Feature**: About Me Page

## Component Interface Contracts

### AboutPage Component

**Purpose**: Display the about page content loaded from markdown file.

**Props Interface**:
```typescript
interface AboutPageProps {
  // No props - component loads its own data
}
```

**Behavior Contract**:
- MUST load about page content on mount
- MUST display loading state while content is loading
- MUST display error message if loading fails
- MUST display page title (from frontmatter or default "About")
- MUST render markdown content using MarkdownRenderer component
- MUST handle missing about.md file gracefully (show error message)
- MUST maintain consistent styling with rest of blog

**State Management**:
- Uses `useState` for about page data, loading, and error states
- Uses `useEffect` to load content on mount
- Optional: Can use `useRef` for file watching in development (similar to posts)

**Accessibility Requirements**:
- MUST have proper heading hierarchy (h1 for page title)
- MUST have proper article semantics
- MUST be keyboard navigable
- MUST have accessible error messages

### MarkdownRenderer Component (REUSED)

**Purpose**: Safely render markdown content as HTML.

**Note**: This component is reused from `src/components/post/MarkdownRenderer.tsx`. The contract remains the same.

**Props Interface**:
```typescript
interface MarkdownRendererProps {
  content: string;
  className?: string;
}
```

**Behavior Contract**:
- MUST convert HTML content to rendered output
- MUST sanitize HTML output to prevent XSS (via existing sanitizer)
- MUST preserve markdown formatting (headers, lists, code blocks, links)
- MUST preserve line breaks
- MUST handle empty content gracefully
- MUST apply provided className to container

**Security Requirements**:
- MUST sanitize all HTML output
- MUST not execute scripts in rendered content
- MUST escape dangerous HTML tags

## Service Interface Contracts

### AboutLoader Service

**Purpose**: Load and parse about page markdown file into AboutPage entity.

**Interface**:
```typescript
interface AboutLoader {
  loadAboutPage(): Promise<AboutPage>;
  watchForChanges(callback: (aboutPage: AboutPage) => void): () => void;
}
```

**Behavior Contract**:
- `loadAboutPage()` MUST return AboutPage entity from `src/content/about.md`
- `loadAboutPage()` MUST handle file reading errors gracefully
- `loadAboutPage()` MUST parse frontmatter and markdown body
- `loadAboutPage()` MUST convert markdown body to HTML
- `loadAboutPage()` MUST extract title from frontmatter (default: "About")
- `loadAboutPage()` MUST return metadata from frontmatter
- `watchForChanges()` MUST call callback when about.md is modified (dev only)
- `watchForChanges()` MUST return cleanup function to stop watching

**Error Handling**:
- MUST log errors for invalid/missing files
- MUST return meaningful error messages
- MUST handle browser environment requirements (e.g., import.meta.glob)
- MUST ensure frontmatter is completely separated from markdown body

**Dependencies**:
- Reuses `parseFile()` from `src/lib/markdown/parser.ts`
- Reuses `parseMarkdown()` from `src/lib/markdown/parser.ts`
- Uses Vite's `import.meta.glob` for file loading

## Data Flow Contracts

### AboutPage Loading Flow

1. `AboutPage` component mounts
2. Component calls `AboutLoader.loadAboutPage()`
3. Loader uses `import.meta.glob` to load `src/content/about.md`
4. Loader uses `parseFile()` to extract frontmatter and body
5. Loader uses `parseMarkdown()` to convert body to HTML
6. Loader returns `AboutPage` entity
7. Component displays title and passes HTML content to `MarkdownRenderer`
8. `MarkdownRenderer` renders HTML content

### Navigation Flow

1. User clicks "About" link in header (Layout component)
2. React Router navigates to `/about` route
3. `AboutPage` component renders
4. Component loads and displays about page content

## Routing Contract

**Route Definition**:
```typescript
<Route path="/about" element={<AboutPage />} />
```

**Route Priority**:
- `/about` route MUST be defined before `/:slug` route in App.tsx
- This ensures `/about` is matched before the catch-all slug route
- Prevents conflicts with potential blog post slug "about"

**URL Structure**:
- About page accessible at `/about`
- Clean URL, no query parameters
- SEO-friendly path

## Integration Contracts

### Layout Component Integration

**Navigation Link**:
- Layout component MUST include link to `/about` route
- Link MUST be accessible from header
- Link MUST use React Router's `Link` component
- Link styling MUST match existing header elements

### Markdown Parser Integration

**Reused Components**:
- `parseFile()` - Extracts frontmatter and body
- `parseMarkdown()` - Converts markdown to HTML
- `sanitizeHtml()` - Sanitizes HTML output (via renderer)

**Separation**:
- About page loader does NOT use blog post loader
- About page loader does NOT use blog post utilities (slug, sorter, scanner)
- About page loader ONLY uses markdown parsing utilities

## Testing Contracts

### Unit Tests
- MUST test `AboutLoader.loadAboutPage()` with valid markdown
- MUST test `AboutLoader.loadAboutPage()` with missing file
- MUST test `AboutLoader.loadAboutPage()` with invalid frontmatter
- MUST test `AboutLoader.loadAboutPage()` with empty content

### Integration Tests
- MUST test navigation to `/about` route
- MUST test about page renders correctly
- MUST test error handling when file is missing
- MUST test markdown content renders properly

### Contract Tests
- MUST test `AboutPage` component contract
- MUST test `AboutLoader` service contract
- MUST test `MarkdownRenderer` integration (reused component)

