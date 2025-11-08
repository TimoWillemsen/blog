# Data Model: Simple Blog Application

**Date**: 2025-01-27  
**Feature**: Simple Blog Application

## Entities

### BlogPost

Represents a single blog post entry, derived from a markdown file.

**Attributes**:
- `id` (string, required): Unique identifier for the post (derived from filename or slug)
- `title` (string, required): Post title (from frontmatter or filename)
- `content` (string, required): HTML content (converted from markdown)
- `rawContent` (string, optional): Original markdown content (for editing)
- `publicationDate` (Date, required): Publication date (from frontmatter or file modification date)
- `author` (string, optional): Author name (defaults to "Timo Willemsen" if not in frontmatter)
- `slug` (string, required): URL-friendly identifier (derived from filename or title)
- `excerpt` (string, optional): Short excerpt for list views (from frontmatter or first paragraph)
- `sourceFile` (string, required): Path to the source markdown file
- `metadata` (object, optional): Additional frontmatter fields (tags, categories, etc.)

**Validation Rules**:
- Title must be non-empty string
- Publication date must be valid date (ISO 8601 format preferred)
- Slug must be URL-safe (lowercase, hyphens, no special chars)
- Content must be non-empty after markdown parsing

**State Transitions**:
- **Draft → Published**: File moved to published directory or metadata updated
- **Published → Removed**: File deleted or moved out of published directory

### MarkdownFile

Source file containing blog post content.

**Attributes**:
- `path` (string, required): File system path to markdown file
- `filename` (string, required): Filename with extension
- `content` (string, required): Raw file content (markdown + frontmatter)
- `frontmatter` (object, required): Parsed YAML frontmatter
- `body` (string, required): Markdown content after frontmatter
- `lastModified` (Date, required): File system modification timestamp

**Structure**:
```yaml
---
title: "Post Title"
date: "2025-01-27"
author: "Timo Willemsen"
excerpt: "Optional excerpt"
tags: ["engineering", "management"]
---

# Post Content

Markdown content here...
```

**Validation Rules**:
- File must have `.md` or `.markdown` extension
- Frontmatter must be valid YAML
- Frontmatter must contain `title` or be derivable from filename
- File must not be hidden (not starting with `.`)
- File must not be temporary/backup (not ending with `~`, `.bak`, `.tmp`)

### PostList

Collection of blog posts for display.

**Attributes**:
- `posts` (BlogPost[], required): Array of blog posts
- `totalCount` (number, required): Total number of posts
- `sortedBy` (string, required): Sort field (default: "publicationDate")
- `order` (string, required): Sort order ("desc" for newest first, "asc" for oldest first)

**Operations**:
- `sortByDate(order: "asc" | "desc")`: Sort posts by publication date
- `filterByAuthor(author: string)`: Filter posts by author (future use)
- `getLatest(n: number)`: Get N most recent posts

## Relationships

- **MarkdownFile → BlogPost**: One-to-one relationship. Each markdown file produces one blog post.
- **PostList → BlogPost**: One-to-many relationship. A list contains multiple posts.

## Data Flow

1. **File Discovery**: System scans `content/posts/` directory for `.md` files
2. **File Reading**: Read file content from file system
3. **Frontmatter Parsing**: Extract YAML frontmatter using `gray-matter` or similar
4. **Markdown Parsing**: Convert markdown body to HTML using `marked` or similar
5. **Post Creation**: Create BlogPost entity with parsed data
6. **Post Storage**: Store in memory/state (no persistence needed - stateless)
7. **Post Display**: Render BlogPost entities in UI components

## Edge Cases

### Missing Metadata
- **Title missing**: Derive from filename (remove extension, convert to title case)
- **Date missing**: Use file modification date
- **Author missing**: Default to "Timo Willemsen"

### Invalid Files
- **Malformed YAML**: Skip file, log error, continue processing
- **Empty content**: Skip file, log warning
- **Invalid date format**: Parse best-effort, fallback to file modification date

### File Changes
- **File added**: Detect new file, parse and add to post list
- **File modified**: Re-parse file, update existing post
- **File deleted**: Remove post from list
- **File renamed**: Treat as delete + add (or detect rename if possible)

## Performance Considerations

### Caching Strategy
- **Build-time**: Parse all files once, cache results
- **Runtime**: Cache parsed posts in memory, invalidate on file change
- **Lazy loading**: Parse posts on-demand for large collections

### Optimization
- **Pagination**: Load posts in batches (e.g., 20 per page)
- **Virtual scrolling**: For large lists, render only visible posts
- **Pre-rendering**: Generate HTML at build time for faster initial load

