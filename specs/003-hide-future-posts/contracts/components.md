# Component Contracts: Hide Future-Dated Blog Posts

**Feature**: 003-hide-future-posts  
**Date**: 2025-01-27

## Overview

This feature modifies the data layer (PostLoader) but maintains existing component contracts. Components receive filtered data and handle it the same way they handle empty/null data.

## PostLoader Interface Contract

### `loadAllPosts(): Promise<BlogPost[]>`

**Pre-condition**: None

**Post-condition**: 
- Returns array of BlogPost objects
- All returned posts have `publicationDate <= current date/time`
- Future-dated posts are excluded from the array
- Array is sorted by publication date (newest first)

**Behavior Changes**:
- **Before**: Returned all posts regardless of publication date
- **After**: Filters out posts with future publication dates before returning

**Contract Guarantees**:
- Returned posts are always published (visible)
- Empty array if no published posts exist
- Maintains existing sorting behavior

### `loadPost(slug: string): Promise<BlogPost | null>`

**Pre-condition**: `slug` is a non-empty string

**Post-condition**:
- Returns `BlogPost` if post exists AND is published (`publicationDate <= current date/time`)
- Returns `null` if post doesn't exist OR has future publication date
- Caller cannot distinguish between "not found" and "not published" (both return null)

**Behavior Changes**:
- **Before**: Returned post if slug matched, regardless of publication date
- **After**: Returns null for future-dated posts (same as non-existent posts)

**Contract Guarantees**:
- Returned post is always published (visible)
- Future-dated posts are inaccessible via direct URL
- Maintains existing error handling (null = not found)

## Component Contracts (No Changes)

### HomePage Component

**Input**: Receives filtered posts from `postLoader.loadAllPosts()`

**Contract**: 
- Displays post list or "No posts available" message
- No changes to component interface or behavior
- Already handles empty arrays gracefully

### PostPage Component

**Input**: Receives post from `postLoader.loadPost(slug)` (may be null)

**Contract**:
- Displays post detail or "Post not found" error
- No changes to component interface or behavior
- Already handles null posts gracefully (shows error)

### PostList Component

**Input**: Receives array of BlogPost objects (may be empty)

**Contract**:
- Renders list of posts or "No posts available" message
- No changes to component interface or behavior
- Already handles empty arrays gracefully

## Filter Utility Contract

### `isPostPublished(post: BlogPost): boolean`

**Pre-condition**: `post` is a valid BlogPost object with `publicationDate` field

**Post-condition**: 
- Returns `true` if `post.publicationDate <= current date/time`
- Returns `false` if `post.publicationDate > current date/time`
- Pure function (no side effects, deterministic)

**Contract Guarantees**:
- Deterministic: Same input always produces same output (for given current time)
- Pure: No side effects, no external dependencies beyond Date
- Fast: O(1) time complexity

## Testing Contracts

### Unit Test Contracts

- `filter.test.ts`: Tests `isPostPublished()` with various date scenarios
- `loader.test.ts`: Tests filtering behavior in `loadAllPosts()` and `loadPost()`

### Integration Test Contracts

- `homepage.test.tsx`: Verifies future posts don't appear in list
- `post-detail.test.tsx`: Verifies future posts return 404/null

### Contract Test Contracts

- `PostList.test.tsx`: Verifies component handles filtered arrays correctly

## Breaking Changes

**None**: All component interfaces remain unchanged. Filtering is transparent to components.

## Migration Notes

**None Required**: Existing components already handle the filtered data correctly (empty arrays, null values).

