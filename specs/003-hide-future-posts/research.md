# Research: Hide Future-Dated Blog Posts

**Feature**: 003-hide-future-posts  
**Date**: 2025-01-27

## Research Questions

### 1. Date Comparison in JavaScript/TypeScript

**Question**: How should we compare publication dates with the current date/time, especially regarding timezone handling and edge cases?

**Decision**: Use JavaScript's native `Date` object comparison with `getTime()` method for precise timestamp comparison. Compare publication dates against `new Date()` (current date/time).

**Rationale**:
- JavaScript `Date` objects represent timestamps in UTC internally, but display in local timezone
- Using `getTime()` converts dates to milliseconds since epoch for reliable numeric comparison
- `new Date()` uses the browser's local timezone, which is appropriate for client-side filtering
- Simple comparison: `post.publicationDate.getTime() <= new Date().getTime()` determines if post is published

**Alternatives Considered**:
- **Date-only comparison (ignoring time)**: Rejected because spec requires date AND time comparison (FR-005)
- **UTC-only comparison**: Rejected because it would cause confusion for users in different timezones
- **External date library (date-fns, moment.js)**: Rejected because native Date is sufficient and adds unnecessary dependency

**Edge Cases Handled**:
- Same date/time: Posts published "now" should be visible (use `<=` not `<`)
- Invalid dates: Already handled in loader.ts (falls back to current date per FR-006)
- Missing dates: Already handled in loader.ts (defaults to current date per FR-006)
- Timezone boundaries: Browser's local timezone is used consistently

### 2. Filtering Implementation Location

**Question**: Where should the filtering logic be implemented - in the PostLoader service or as a separate utility?

**Decision**: Extract filtering logic into a dedicated utility function in `src/lib/posts/filter.ts`, then use it in PostLoader's `loadAllPosts()` and `loadPost()` methods.

**Rationale**:
- Separation of concerns: Filtering logic is testable independently
- Reusability: Filter function can be used in multiple contexts if needed
- Testability: Pure function is easier to unit test with various date scenarios
- Maintainability: Date comparison logic is isolated and can be updated without touching loader logic

**Alternatives Considered**:
- **Inline filtering in PostLoader**: Rejected because it reduces testability and violates single responsibility
- **Filtering in components**: Rejected because it violates data layer separation and would require filtering in multiple places
- **Separate FilterService class**: Rejected because a simple utility function is sufficient (no state or complex logic)

### 3. Performance Optimization

**Question**: Are there performance concerns with filtering posts by date, and should we optimize?

**Decision**: No optimization needed. Filtering is O(n) where n is number of posts, and date comparison is O(1). For expected scale (10-100 posts), performance will be negligible (< 10ms).

**Rationale**:
- Date comparison using `getTime()` is extremely fast (numeric comparison)
- Filtering happens once per page load, not on every render
- Expected post count (10-100) is small enough that O(n) filtering is acceptable
- Premature optimization would add complexity without measurable benefit

**Alternatives Considered**:
- **Caching filtered results**: Rejected because posts are already cached in component state, and file watching already handles updates
- **Indexing by date**: Rejected because overhead of maintaining index exceeds benefit for small post count
- **Lazy loading with date filter**: Rejected because all posts are already loaded eagerly via import.meta.glob

### 4. Backward Compatibility

**Question**: How should we handle posts without publication dates or with invalid dates?

**Decision**: Maintain current behavior - posts without dates or with invalid dates default to current date, making them visible (per FR-006).

**Rationale**:
- Existing posts may not have dates in frontmatter
- Invalid dates already fall back to `new Date()` in loader.ts (line 84)
- Missing dates already default to `new Date()` in loader.ts (line 86)
- Changing this behavior would break existing content

**Implementation**: No changes needed - existing fallback logic in loader.ts already handles this correctly.

## Technical Decisions Summary

| Decision | Approach | Rationale |
|----------|----------|-----------|
| Date Comparison | `post.publicationDate.getTime() <= new Date().getTime()` | Simple, reliable, handles timezone correctly |
| Filtering Location | Utility function in `filter.ts` | Testable, reusable, maintainable |
| Performance | No optimization needed | Scale is small, filtering is already fast |
| Backward Compatibility | Keep existing date fallback behavior | Prevents breaking existing content |

## Implementation Notes

- Filter function signature: `isPostPublished(post: BlogPost): boolean`
- Filter function will be pure (no side effects, deterministic)
- Filtering applied in `PostLoader.loadAllPosts()` before sorting
- Filtering applied in `PostLoader.loadPost()` to return null for future posts
- No changes needed to component layer - they already handle null/empty arrays gracefully

