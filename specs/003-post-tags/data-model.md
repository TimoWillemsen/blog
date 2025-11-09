# Data Model: Post Tags and Filtering

**Date**: 2025-01-27  
**Feature**: Post Tags and Filtering

## Entities

### BlogPost

Represents a single blog post entry with tag support.

**Attributes**:
- `id` (string, required): Unique identifier for the post (derived from slug)
- `title` (string, required): Post title (from frontmatter or filename)
- `content` (string, required): HTML content (converted from markdown)
- `rawContent` (string, optional): Original markdown content (for editing)
- `publicationDate` (Date, required): Publication date (from frontmatter or file modification date)
- `author` (string, optional): Author name (defaults to "Timo Willemsen" if not in frontmatter)
- `slug` (string, required): URL-friendly identifier (derived from filename or title)
- `excerpt` (string, optional): Short excerpt for list views (from frontmatter or first paragraph)
- `sourceFile` (string, required): Path to the source markdown file
- `tags` (string[], optional): Array of normalized tag strings (lowercase, trimmed)
- `metadata` (object, optional): Additional frontmatter fields (includes original tag names if different from normalized)

**Validation Rules**:
- Title must be non-empty string
- Publication date must be valid date (ISO 8601 format preferred)
- Slug must be URL-safe (lowercase, hyphens, no special chars)
- Content must be non-empty after markdown parsing
- Tags array must contain only non-empty strings after normalization
- Each tag in array must be normalized (lowercase, trimmed)

**State Transitions**:
- **Draft → Published**: File moved to published directory or metadata updated (existing)
- **Published → Removed**: File deleted or moved out of published directory (existing)
- **Untagged → Tagged**: Frontmatter updated with tags field
- **Tagged → Untagged**: Tags field removed from frontmatter

**Tag Handling**:
- Tags are extracted from frontmatter `tags` field (YAML array format)
- Tags are normalized at load time: lowercase, trimmed, empty strings removed
- Original tag names preserved in metadata if needed for display
- Empty tags array or missing tags field results in `tags: undefined`

---

### Tag

Represents a normalized tag label used for categorization and filtering.

**Attributes**:
- `name` (string, required): Normalized tag name (lowercase, trimmed)
- `displayName` (string, optional): Original tag name for display (if different from normalized)

**Normalization Rules**:
- Convert to lowercase: `"React"` → `"react"`
- Trim whitespace: `" react "` → `"react"`
- Preserve hyphens and underscores: `"react-native"` → `"react-native"`
- Remove empty strings: `["", "react"]` → `["react"]`
- Handle both array and string formats from frontmatter

**Validation Rules**:
- Tag name must be non-empty string after normalization
- Tag name must not contain only whitespace
- Tag name may contain: alphanumeric characters, hyphens, underscores

**Relationships**:
- **Tag → BlogPost**: Many-to-many relationship (a tag can be associated with multiple posts, a post can have multiple tags)

---

### FilteredPostList

Collection of blog posts filtered by tag.

**Attributes**:
- `posts` (BlogPost[], required): Array of filtered blog posts
- `totalCount` (number, required): Total number of posts after filtering
- `filterTag` (string | null, required): Currently active tag filter (null = no filter)
- `sortedBy` (string, required): Sort field (default: "publicationDate")
- `order` (string, required): Sort order ("desc" for newest first, "asc" for oldest first)

**Operations**:
- `filterByTag(tag: string | null)`: Filter posts by tag (null clears filter)
- `getFilteredPosts()`: Get posts matching current filter
- `clearFilter()`: Clear tag filter, show all posts
- `hasActiveFilter()`: Check if a tag filter is active

**Filtering Logic**:
- When `filterTag` is null: return all published posts
- When `filterTag` is set: return only posts where `tags` array contains normalized tag matching `filterTag`
- Filter respects existing post visibility rules (future-dated posts remain hidden)
- Case-insensitive matching: `"React"` matches `"react"`

---

### RelatedPosts

Collection of posts related to a current post via shared tags.

**Attributes**:
- `currentPost` (BlogPost, required): The post for which related posts are calculated
- `relatedPosts` (BlogPost[], required): Array of related posts (excludes current post)
- `sharedTagCount` (Map<BlogPost, number>, computed): Number of shared tags per related post

**Computation Rules**:
1. Find all posts that share at least one normalized tag with current post
2. Exclude current post (by slug or id)
3. Count shared tags for each related post
4. Sort by: shared tag count (descending), then publication date (descending)
5. Limit to top N results (default: 5-10) for display

**Edge Cases**:
- Current post has no tags: return empty array
- No other posts share tags: return empty array
- Multiple posts with same shared tag count: sort by date (newest first)

---

## Relationships

- **BlogPost → Tag**: Many-to-many relationship via `tags` array field
  - A blog post can have zero or more tags
  - A tag can be associated with zero or more blog posts
  - Relationship is implicit (no separate Tag entity table)

- **BlogPost → RelatedPosts**: One-to-many relationship
  - Each blog post can have related posts calculated from shared tags
  - Related posts exclude the current post itself

- **FilteredPostList → BlogPost**: One-to-many relationship
  - A filtered list contains multiple blog posts
  - Filtering is applied at query time, not stored

---

## Data Flow

### Tag Loading Flow

1. **File Discovery**: System scans `content/posts/` directory for `.md` files
2. **File Reading**: Read file content from file system
3. **Frontmatter Parsing**: Extract YAML frontmatter using `gray-matter`
4. **Tag Extraction**: Extract `tags` field from frontmatter (handle array or string format)
5. **Tag Normalization**: Normalize each tag (lowercase, trim, remove empty)
6. **Post Creation**: Create BlogPost entity with normalized tags in `tags` field
7. **Post Storage**: Store in memory/state with tags array

### Tag Filtering Flow

1. **User Action**: User clicks on a tag in PostCard or PostDetail
2. **State Update**: Update `selectedTag` state in HomePage component
3. **Filter Application**: Apply `filterPostsByTag()` to all published posts
4. **List Update**: Update PostList component with filtered posts
5. **UI Feedback**: Display active filter indicator
6. **Clear Filter**: User clicks active tag or clear button → set `selectedTag` to null

### Related Posts Flow

1. **Post View**: User views a PostDetail page
2. **Post Load**: Load current post with tags
3. **Related Calculation**: Call `findRelatedPosts()` with current post and all posts
4. **Sorting**: Sort related posts by shared tag count, then date
5. **Display**: Render related posts section below post content

---

## Edge Cases

### Missing or Invalid Tags

- **Tags field missing**: `tags` is `undefined`, post has no tags
- **Tags field empty array**: `tags: []` → `tags` is `undefined` (normalized)
- **Tags field contains empty strings**: `tags: ["", "react"]` → `tags: ["react"]` (empty strings removed)
- **Tags field is string instead of array**: `tags: "react, typescript"` → parse and normalize to array
- **Tags field is invalid type**: Log warning, treat as no tags

### Tag Normalization Edge Cases

- **Case variations**: `["React", "react", "REACT"]` → all normalize to `["react"]` (duplicates removed)
- **Whitespace**: `[" react ", "react"]` → both normalize to `"react"` (duplicates removed)
- **Special characters**: `["react-native", "react_native"]` → preserved as-is (different tags)
- **Mixed formats**: Frontmatter has both array and string → prefer array format

### Filtering Edge Cases

- **Filter by non-existent tag**: Return empty array, show "No posts found" message
- **Filter when no posts have tags**: Return empty array (all posts have no tags)
- **Filter respects visibility**: Future-dated posts remain hidden even if they match tag
- **Clear filter**: Return to showing all published posts

### Related Posts Edge Cases

- **Current post has no tags**: Return empty array (no related posts)
- **No other posts share tags**: Return empty array
- **Current post is only post with its tags**: Return empty array
- **Multiple posts with identical shared tag counts**: Sort by publication date (newest first)

---

## Frontmatter Format

### Standard Format

```yaml
---
title: "Post Title"
date: "2025-01-27"
author: "Timo Willemsen"
excerpt: "Optional excerpt"
tags: ["react", "typescript", "web-development"]
---

# Post Content

Markdown content here...
```

### Alternative Formats (Handled)

```yaml
# Comma-separated string (normalized to array)
tags: "react, typescript, web-development"

# Single tag as string (normalized to array)
tags: "react"

# Empty array (treated as no tags)
tags: []

# Missing field (treated as no tags)
# (tags field not present)
```

---

## Validation Summary

- Tags must be non-empty after normalization
- Tag names may contain: letters, numbers, hyphens, underscores
- Tags are case-insensitive for matching but preserve original case for display
- Empty tags arrays are treated as no tags (undefined)
- Filtering respects existing post visibility rules
- Related posts exclude the current post

