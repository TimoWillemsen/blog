# Data Model: Hide Future-Dated Blog Posts

**Feature**: 003-hide-future-posts  
**Date**: 2025-01-27

## Entities

### BlogPost

**Description**: Represents a single blog post entry with metadata including publication date.

**Fields**:
- `id: string` - Unique identifier (derived from slug)
- `title: string` - Post title
- `content: string` - Rendered HTML content
- `rawContent?: string` - Raw markdown content (optional)
- `publicationDate: Date` - Publication date and time (determines visibility)
- `author?: string` - Author name (optional)
- `slug: string` - URL-friendly identifier
- `excerpt?: string` - Short description (optional)
- `sourceFile: string` - Path to source markdown file
- `metadata?: Record<string, unknown>` - Additional frontmatter data (optional)

**Key Relationships**:
- None (standalone entity)

**Validation Rules**:
- `publicationDate` MUST be a valid Date object
- If `publicationDate` is invalid or missing, it defaults to current date (backward compatibility)
- `publicationDate` is used to determine if post should be visible (filtered if future)

**State Transitions**:
- **Unpublished → Published**: When `publicationDate` passes current date/time, post becomes visible
- **Published → Published**: Post remains visible as long as `publicationDate <= current date/time`

**Filtering Logic**:
- Post is considered **published** (visible) when: `publicationDate.getTime() <= new Date().getTime()`
- Post is considered **unpublished** (hidden) when: `publicationDate.getTime() > new Date().getTime()`

## Derived/Computed Fields

### isPostPublished(post: BlogPost): boolean

**Description**: Determines if a post should be visible based on its publication date.

**Computation**:
```typescript
function isPostPublished(post: BlogPost): boolean {
  const now = new Date().getTime();
  const publicationTime = post.publicationDate.getTime();
  return publicationTime <= now;
}
```

**Edge Cases**:
- Posts with publication date exactly at current moment: **visible** (uses `<=`)
- Posts with invalid dates: Already handled in loader (defaults to current date, so visible)
- Posts with missing dates: Already handled in loader (defaults to current date, so visible)

## Data Flow

1. **Load Phase**: PostLoader loads all markdown files and creates BlogPost objects
2. **Filter Phase**: Posts are filtered using `isPostPublished()` before being returned
3. **Display Phase**: Only published posts are passed to components
4. **Access Phase**: Direct URL access to future posts returns null (404 equivalent)

## No Schema Changes Required

- No database schema changes (content is file-based)
- No API contract changes (frontend-only feature)
- No component prop changes (components already handle filtered arrays/null values)

