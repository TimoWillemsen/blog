# Research: Post Tags and Filtering

**Date**: 2025-01-27  
**Feature**: Post Tags and Filtering  
**Status**: Complete

## Research Questions

### 1. Frontmatter Tag Storage Format

**Question**: What format should tags use in YAML frontmatter?

**Decision**: Use YAML array format: `tags: ["tag1", "tag2", "tag3"]`

**Rationale**:
- Standard YAML array syntax is well-supported by `gray-matter` parser
- Arrays are type-safe and prevent parsing ambiguity
- Consistent with existing data model documentation (see `specs/001-blog-app/data-model.md`)
- Easy to validate and normalize programmatically
- Supports empty arrays naturally: `tags: []` or omit field entirely

**Alternatives Considered**:
- Comma-separated string: `tags: "tag1, tag2, tag3"` - Requires parsing, more error-prone
- Single string: `tags: "tag1"` - Doesn't scale to multiple tags
- Object with metadata: `tags: [{name: "tag1", slug: "tag-1"}]` - Over-engineered for simple use case

**Implementation Notes**:
- `gray-matter` will parse YAML arrays directly into JavaScript arrays
- Handle both array and string formats for backward compatibility (normalize string to array)
- Empty or missing tags field should result in empty array `[]`

---

### 2. Tag Normalization Strategy

**Question**: How should tags be normalized for consistent matching and display?

**Decision**: Normalize tags to lowercase, trimmed strings with special character handling.

**Rationale**:
- Case-insensitive matching required by FR-004
- Trimming whitespace prevents "react " vs "react" mismatches
- Lowercase normalization ensures "React" and "react" match
- Special characters (spaces, hyphens, underscores) preserved for display but normalized for matching

**Normalization Rules**:
1. Convert to lowercase: `"React"` → `"react"`
2. Trim whitespace: `" react "` → `"react"`
3. Preserve hyphens and underscores: `"react-native"` → `"react-native"`
4. Handle empty strings: `""` → skip/invalid
5. Handle arrays: Normalize each tag in array

**Alternatives Considered**:
- Slug-based normalization: `"React Native"` → `"react-native"` - Too aggressive, loses original tag name
- Case-preserving with case-insensitive comparison - More complex, no clear benefit
- No normalization: Case-sensitive matching - Violates FR-004 requirement

**Implementation Notes**:
- Store normalized tags for matching, display original tag names
- Create `normalizeTag(tag: string): string` utility function
- Create `normalizeTags(tags: string[]): string[]` for arrays

---

### 3. Client-Side Filtering Pattern

**Question**: What pattern should be used for client-side tag filtering in React?

**Decision**: Use functional filtering with React state management in HomePage component.

**Rationale**:
- Follows existing pattern: `filterPublishedPosts()` in `src/lib/posts/filter.ts`
- Client-side filtering meets < 1s performance requirement (SC-001)
- No API calls needed, works with existing PostLoader
- State management in HomePage aligns with existing architecture
- Filter function can be unit tested independently

**Pattern**:
```typescript
// In HomePage component
const [selectedTag, setSelectedTag] = useState<string | null>(null)
const filteredPosts = selectedTag 
  ? posts.filter(post => post.tags?.some(tag => normalizeTag(tag) === normalizeTag(selectedTag)))
  : posts
```

**Alternatives Considered**:
- URL query parameters: `?tag=react` - More complex, requires router integration
- Redux/Context for global state - Over-engineered for single filter
- Separate filter service - Unnecessary abstraction for simple filtering

**Implementation Notes**:
- Create `filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[]` in `src/lib/posts/filter.ts`
- Filter respects existing `filterPublishedPosts()` - apply both filters
- Clear filter by setting `selectedTag` to `null`

---

### 4. Related Articles Algorithm

**Question**: How should related articles be determined and ranked?

**Decision**: Find posts that share at least one tag, ranked by number of shared tags (most shared first), then by publication date (newest first).

**Rationale**:
- Simple and intuitive: more shared tags = more related
- Secondary sort by date ensures recent related content appears first
- Excludes current post (FR-011)
- Meets SC-005 requirement (display at least one when available)

**Algorithm**:
1. Filter posts that share at least one normalized tag with current post
2. Exclude current post (by slug or id)
3. Count shared tags for each related post
4. Sort by: shared tag count (desc), then publication date (desc)
5. Limit to top N results (e.g., 5-10) for display

**Alternatives Considered**:
- Only most recent related post - Too limited, misses highly related content
- All related posts, no limit - Could show too many, cluttered UI
- Tag-based scoring with weights - Over-engineered for MVP
- Content similarity (semantic) - Requires ML/NLP, out of scope

**Implementation Notes**:
- Create `findRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit?: number): BlogPost[]`
- Handle edge case: no related posts → return empty array
- Performance: O(n) where n = number of posts (acceptable for < 100 posts)

---

### 5. Tag Display and Interaction

**Question**: How should tags be displayed and made interactive?

**Decision**: Display tags as clickable badges/chips that filter the post list. Use consistent styling with existing UI patterns.

**Rationale**:
- Clickable tags enable filtering (FR-003) without separate UI controls
- Badge/chip style is standard for tags (GitHub, Medium, etc.)
- Follows existing color scheme and typography
- Accessible: proper ARIA labels and keyboard navigation

**Display Requirements**:
- Show tags on PostCard (list view) and PostDetail (detail view)
- Tags should be visually distinct but not overwhelming
- Active filter tag should be visually highlighted
- Empty state: no tag section when post has no tags (FR-008)

**Interaction**:
- Click tag → filter post list to that tag
- Click active tag again → clear filter (FR-007)
- Keyboard accessible: Tab to focus, Enter to activate
- Clear filter button/indicator when filter is active (FR-006)

**Alternatives Considered**:
- Dropdown/select for tag filtering - Less discoverable, more clicks
- Separate tag cloud component - Out of scope, adds complexity
- Non-clickable tags (display only) - Doesn't meet FR-003 requirement

**Implementation Notes**:
- Create reusable `TagList` component for consistent display
- Use Tailwind CSS classes matching existing design system
- Ensure tags wrap properly on mobile (flex-wrap)

---

## Technology Decisions

### Tag Storage in BlogPost Type

**Decision**: Add `tags?: string[]` field to BlogPost interface.

**Rationale**:
- Optional field maintains backward compatibility (posts without tags)
- Array type matches frontmatter format
- Stored as normalized strings for consistent matching
- Display uses original tag names from frontmatter

**Implementation**:
```typescript
export interface BlogPost {
  // ... existing fields
  tags?: string[]  // Normalized tag strings
}
```

### Tag Parsing in PostLoader

**Decision**: Extract tags from frontmatter in `PostLoader.loadAllPosts()`, normalize immediately.

**Rationale**:
- Centralized parsing ensures consistency
- Normalization happens once at load time, not repeatedly during filtering
- Follows existing pattern: extract metadata in loader, use in components

**Implementation**:
- Extract `tags` from frontmatter (handle both array and string formats)
- Normalize tags using `normalizeTags()` utility
- Store normalized tags in BlogPost.tags field
- Store original tag names in BlogPost.metadata for display if needed

---

## Dependencies and Integration Points

### Existing Systems
- **PostLoader**: Extend to parse tags from frontmatter
- **filter.ts**: Add `filterPostsByTag()` function
- **PostCard/PostDetail**: Add tag display components
- **HomePage**: Add tag filter state management

### New Components
- **TagList**: Reusable tag display component
- **tagNormalizer.ts**: Tag normalization utilities
- **relatedPosts.ts**: Related posts calculation

### Testing Requirements
- Unit tests for tag normalization
- Unit tests for tag filtering
- Unit tests for related posts algorithm
- Integration tests for tag filtering user flow
- Contract tests for components with tags

---

## Performance Considerations

- **Tag Normalization**: O(n) per post, done once at load time - acceptable
- **Tag Filtering**: O(n*m) where n=posts, m=tags per post - acceptable for < 100 posts
- **Related Posts**: O(n*m) calculation - acceptable, can be memoized if needed
- **Bundle Size**: Minimal addition (< 5KB estimated) - well within limits

---

### 6. Navigation from Detail Page to Filtered List

**Question**: How should clicking a tag on a post detail page navigate to the filtered post list?

**Decision**: Use React Router's `useNavigate` with URL search parameters (`?tag=react`) to navigate from PostDetail to HomePage with tag filter applied.

**Rationale**:
- URL search parameters provide shareable, bookmarkable filter state
- React Router's `useSearchParams` hook allows HomePage to read and apply filter from URL
- Maintains browser history (back button works correctly)
- Follows standard web patterns for filtering
- No global state management needed (state in URL)

**Implementation Pattern**:
```typescript
// In PostPage component
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
const handleTagClick = (tag: string) => {
  navigate(`/?tag=${encodeURIComponent(tag)}`)
}

// In HomePage component
import { useSearchParams } from 'react-router-dom'

const [searchParams, setSearchParams] = useSearchParams()
const tagFromUrl = searchParams.get('tag')
// Apply filter based on URL parameter
```

**Alternatives Considered**:
- React Router state (navigate with state object): Not shareable/bookmarkable
- Global state (Context/Redux): Over-engineered, adds complexity
- LocalStorage: Not URL-based, harder to share links
- Query parameter only (no state): Requires URL sync, more complex

**Implementation Notes**:
- Update `PostPage` to pass `onTagClick` handler to `PostDetail` that navigates with search params
- Update `HomePage` to read `tag` from URL search params on mount and when params change
- Sync URL params with local state: URL change → update filter, filter change → update URL
- Handle edge cases: invalid tag in URL, tag that doesn't exist, clearing filter (remove param)

---

## Open Questions Resolved

All research questions resolved. No remaining clarifications needed.

