# Quick Start: Post Tags and Filtering

**Feature**: Post Tags and Filtering  
**Date**: 2025-01-27

## Overview

This feature adds tagging capability to blog posts, enabling users to:
- View tags on posts
- Filter posts by tags
- Discover related articles via shared tags

## Adding Tags to a Post

Tags are added to markdown files via frontmatter:

```yaml
---
title: "My Post Title"
date: "2025-01-27"
author: "Timo Willemsen"
tags: ["react", "typescript", "web-development"]
---

# Post Content

Your markdown content here...
```

### Tag Format

- **Array format** (recommended): `tags: ["react", "typescript"]`
- **String format** (also supported): `tags: "react, typescript"`
- **Single tag**: `tags: ["react"]` or `tags: "react"`
- **No tags**: Omit `tags` field or use `tags: []`

### Tag Normalization

Tags are automatically normalized:
- Converted to lowercase: `"React"` → `"react"`
- Trimmed: `" react "` → `"react"`
- Empty strings removed: `["", "react"]` → `["react"]`
- Duplicates removed: `["react", "React"]` → `["react"]`

## Using Tags in Components

### Displaying Tags

Use the `TagList` component to display tags:

```typescript
import { TagList } from '@/components/post/TagList'

<TagList 
  tags={post.tags || []}
  activeTag={selectedTag}
  onTagClick={(tag) => setSelectedTag(tag)}
/>
```

### Filtering Posts by Tag

Filter posts using the `filterPostsByTag` function:

```typescript
import { filterPostsByTag } from '@/lib/posts/filter'

const filteredPosts = filterPostsByTag(allPosts, selectedTag)
// selectedTag = null shows all posts
// selectedTag = "react" shows only posts with "react" tag
```

### Finding Related Posts

Find related posts using the `findRelatedPosts` function:

```typescript
import { findRelatedPosts } from '@/lib/posts/relatedPosts'

const related = findRelatedPosts(currentPost, allPosts, 5)
// Returns up to 5 related posts, sorted by shared tag count
```

## Component Updates

### PostCard

PostCard now displays tags and handles tag clicks:

```typescript
<PostCard 
  post={post}
  onTagClick={(tag) => handleTagClick(tag)}
  activeTag={selectedTag}
/>
```

### PostDetail

PostDetail displays tags and related articles:

```typescript
<PostDetail 
  post={post}
  onTagClick={(tag) => handleTagClick(tag)}
  relatedPosts={relatedPosts}
  activeTag={selectedTag}
/>
```

### HomePage

HomePage manages tag filtering state:

```typescript
const [selectedTag, setSelectedTag] = useState<string | null>(null)

const handleTagClick = (tag: string) => {
  setSelectedTag(tag)
}

const filteredPosts = selectedTag
  ? filterPostsByTag(posts, selectedTag)
  : posts
```

## Tag Normalization Utilities

Normalize tags using utility functions:

```typescript
import { normalizeTag, normalizeTags, parseTags } from '@/lib/posts/tagNormalizer'

// Normalize a single tag
const normalized = normalizeTag("React")  // "react"

// Normalize an array of tags
const normalized = normalizeTags(["React", "TypeScript"])  // ["react", "typescript"]

// Parse tags from frontmatter (handles array or string)
const tags = parseTags(frontmatter.tags)  // Always returns string[]
```

## Testing Tags

### Unit Tests

Test tag normalization:

```typescript
import { normalizeTag } from '@/lib/posts/tagNormalizer'

test('normalizes tag to lowercase', () => {
  expect(normalizeTag('React')).toBe('react')
})
```

Test tag filtering:

```typescript
import { filterPostsByTag } from '@/lib/posts/filter'

test('filters posts by tag', () => {
  const posts = [
    { ...post1, tags: ['react'] },
    { ...post2, tags: ['typescript'] }
  ]
  const filtered = filterPostsByTag(posts, 'react')
  expect(filtered).toHaveLength(1)
})
```

### Integration Tests

Test tag filtering user flow:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('user can filter posts by tag', async () => {
  render(<HomePage />)
  const tag = screen.getByText('react')
  await userEvent.click(tag)
  expect(screen.getByText('Filtered by: react')).toBeInTheDocument()
})
```

## Common Patterns

### Clearing Tag Filter

```typescript
const handleClearFilter = () => {
  setSelectedTag(null)
}
```

### Tag Click Handler

```typescript
const handleTagClick = (tag: string) => {
  if (selectedTag === tag) {
    // Clicking active tag clears filter
    setSelectedTag(null)
  } else {
    // Clicking new tag sets filter
    setSelectedTag(tag)
  }
}
```

### Related Posts Calculation

```typescript
useEffect(() => {
  if (post && allPosts) {
    const related = findRelatedPosts(post, allPosts, 5)
    setRelatedPosts(related)
  }
}, [post, allPosts])
```

## File Structure

```
src/
├── components/
│   └── post/
│       ├── TagList.tsx          # NEW: Tag display component
│       ├── PostCard.tsx         # UPDATED: Add tag display
│       ├── PostDetail.tsx       # UPDATED: Add tags + related articles
│       └── PostList.tsx         # UPDATED: Add filter UI
├── lib/
│   └── posts/
│       ├── types.ts            # UPDATED: Add tags field
│       ├── loader.ts           # UPDATED: Parse tags from frontmatter
│       ├── filter.ts           # UPDATED: Add filterPostsByTag
│       ├── tagNormalizer.ts    # NEW: Tag normalization utilities
│       └── relatedPosts.ts     # NEW: Related posts calculation
└── pages/
    └── HomePage.tsx            # UPDATED: Add tag filter state
```

## Key Functions

### Tag Normalization

- `normalizeTag(tag: string): string` - Normalize single tag
- `normalizeTags(tags: string[]): string[]` - Normalize tag array
- `parseTags(value: unknown): string[]` - Parse tags from frontmatter

### Post Filtering

- `filterPostsByTag(posts: BlogPost[], tag: string | null): BlogPost[]` - Filter posts by tag

### Related Posts

- `findRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit?: number): BlogPost[]` - Find related posts

## Edge Cases

### Posts Without Tags

Posts without tags are handled gracefully:
- No tag section displayed
- Excluded from tag-filtered views
- Related posts calculation returns empty array

### Empty Filter Results

When filtering returns no results:
- Show "No posts match this tag" message
- Display clear filter button
- Maintain filter state until user clears

### Case Variations

Tag matching is case-insensitive:
- `"React"` matches `"react"`
- Both normalize to `"react"` for matching
- Original case preserved for display (if stored in metadata)

## Performance Notes

- Tag filtering: < 1 second (client-side, O(n*m))
- Related posts: < 100ms (O(n*m), memoizable)
- Tag normalization: Done once at load time
- Bundle size: < 5KB addition

## Next Steps

1. Add tags to existing posts via frontmatter
2. Test tag filtering on homepage
3. Verify related posts on detail pages
4. Review tag normalization behavior
5. Check accessibility (keyboard navigation, screen readers)

