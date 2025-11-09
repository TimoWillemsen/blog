# Quick Start: Hide Future-Dated Blog Posts

**Feature**: 001-hide-future-posts  
**Date**: 2025-01-27

## Overview

This feature filters out blog posts with future publication dates from all frontend views. Posts are only visible when their publication date is in the past or on the current date.

## Implementation Summary

1. **Create filter utility** (`src/lib/posts/filter.ts`): Pure function to check if post is published
2. **Update PostLoader** (`src/lib/posts/loader.ts`): Apply filtering in `loadAllPosts()` and `loadPost()`
3. **Write tests**: Unit tests for filter function, integration tests for components
4. **No component changes**: Components already handle filtered data correctly

## Key Files to Modify

### New Files
- `src/lib/posts/filter.ts` - Date filtering utility function

### Modified Files
- `src/lib/posts/loader.ts` - Add filtering logic to load methods
- `tests/unit/posts/filter.test.ts` - Unit tests for filter function
- `tests/unit/posts/loader.test.ts` - Update loader tests
- `tests/integration/homepage.test.tsx` - Verify filtering on homepage
- `tests/integration/post-detail.test.tsx` - Verify 404 for future posts

## Implementation Steps

### Step 1: Create Filter Utility

Create `src/lib/posts/filter.ts`:

```typescript
import type { BlogPost } from './types'

/**
 * Determines if a blog post should be visible based on its publication date.
 * A post is published (visible) if its publication date is in the past or on the current date.
 * 
 * @param post - The blog post to check
 * @returns true if the post is published (should be visible), false otherwise
 */
export function isPostPublished(post: BlogPost): boolean {
  const now = new Date().getTime()
  const publicationTime = post.publicationDate.getTime()
  return publicationTime <= now
}

/**
 * Filters an array of blog posts to only include published posts.
 * 
 * @param posts - Array of blog posts to filter
 * @returns Array containing only published posts
 */
export function filterPublishedPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(isPostPublished)
}
```

### Step 2: Update PostLoader

In `src/lib/posts/loader.ts`:

1. Import the filter function:
```typescript
import { filterPublishedPosts } from './filter'
```

2. Update `loadAllPosts()` to filter before sorting:
```typescript
// After loading all posts, before sorting:
const publishedPosts = filterPublishedPosts(posts)
const sortedPosts = sortPostsByDate(publishedPosts, 'desc')
return sortedPosts
```

3. Update `loadPost()` to check publication date:
```typescript
async loadPost(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await this.loadAllPosts() // Already filtered
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    handleError(error, `loadPost(${slug})`)
    return null
  }
}
```

### Step 3: Write Tests (TDD)

Follow TDD - write tests first, then implement.

#### Unit Tests (`tests/unit/posts/filter.test.ts`)

Test cases:
- Post with past date → returns true
- Post with future date → returns false
- Post with current date → returns true
- Post with date exactly at current moment → returns true
- Post with invalid date (handled by loader, not filter) → N/A

#### Integration Tests

Update existing tests to verify filtering behavior:
- Homepage shows only published posts
- Future posts return 404/null when accessed directly

## Testing the Feature

### Manual Testing

1. **Create a test post with future date**:
   - Create `src/content/posts/test-future.md`:
   ```markdown
   ---
   title: "Future Post"
   date: "2026-01-01"
   ---
   
   This post should not be visible.
   ```

2. **Verify filtering**:
   - Homepage should not show the future post
   - Direct URL access (`/test-future`) should show "Post not found"

3. **Verify published posts**:
   - Posts with past dates should appear normally
   - Posts with today's date should appear

### Automated Testing

Run test suite:
```bash
npm test
```

Run specific test file:
```bash
npm test filter.test.ts
```

## Edge Cases Handled

- ✅ Posts with publication date exactly at current moment → visible
- ✅ Posts with invalid dates → default to current date (visible)
- ✅ Posts with missing dates → default to current date (visible)
- ✅ Timezone differences → uses browser's local timezone
- ✅ Posts far in the future → filtered out

## Performance Considerations

- Filtering is O(n) where n is number of posts
- Date comparison is O(1) using `getTime()`
- Expected performance: < 10ms for 100 posts (well under 500ms threshold)
- No database queries or network calls involved

## Rollback Plan

If issues arise, revert changes to:
1. `src/lib/posts/loader.ts` - Remove filter imports and calls
2. Delete `src/lib/posts/filter.ts`
3. Revert test updates

No component changes means no risk to UI layer.

## Next Steps After Implementation

1. ✅ Verify all tests pass
2. ✅ Manual testing with future-dated posts
3. ✅ Code review
4. ✅ Merge to main branch

## Related Documentation

- [Specification](./spec.md) - Full feature specification
- [Research](./research.md) - Technical decisions and rationale
- [Data Model](./data-model.md) - Entity definitions
- [Component Contracts](./contracts/components.md) - API contracts

