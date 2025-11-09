# Component Contracts: Post Tags and Filtering

**Date**: 2025-01-27  
**Feature**: Post Tags and Filtering

## Component Interface Contracts

### TagList Component (NEW)

**Purpose**: Display a list of tags as clickable badges/chips.

**Props Interface**:
```typescript
interface TagListProps {
  tags: string[];
  activeTag?: string | null;
  onTagClick?: (tag: string) => void;
  className?: string;
}
```

**Behavior Contract**:
- MUST display all tags in the `tags` array
- MUST render tags as clickable badges/chips
- MUST highlight active tag when `activeTag` matches a tag (case-insensitive)
- MUST call `onTagClick(tag)` when a tag is clicked (if provided)
- MUST handle empty tags array gracefully (render nothing)
- MUST apply provided `className` to container
- MUST use consistent styling with existing design system (brown/beige colors)

**Accessibility Requirements**:
- MUST have proper ARIA labels: `aria-label="Tag: {tagName}"` for each tag
- MUST be keyboard navigable (Tab to focus, Enter/Space to activate)
- MUST have focus indicators
- MUST indicate active tag with `aria-current="true"` when active

**Display Requirements**:
- Tags should wrap on multiple lines if needed (flex-wrap)
- Tags should have hover state for interactivity
- Active tag should be visually distinct (different background/border)
- Tags should be small, compact badges (not full-width buttons)

---

### PostCard Component (UPDATED)

**Purpose**: Display a single post preview in the list with tags.

**Props Interface**:
```typescript
interface PostCardProps {
  post: BlogPost;  // Now includes tags?: string[]
  onClick?: () => void;
  onTagClick?: (tag: string) => void;  // NEW
  activeTag?: string | null;  // NEW
}
```

**Behavior Contract** (Existing + New):
- MUST display post title (existing)
- MUST display publication date (existing)
- MUST display excerpt if available (existing)
- MUST display author name if available (existing)
- MUST display tags if post has tags (NEW)
- MUST call `onTagClick(tag)` when a tag is clicked (NEW)
- MUST pass `activeTag` to TagList component for highlighting (NEW)
- MUST handle posts without tags gracefully (no tag section) (NEW)
- MUST be clickable (triggers `onClick` if provided) (existing)

**Accessibility Requirements**:
- MUST be keyboard accessible (existing)
- MUST have proper ARIA role (article) (existing)
- Tag clicks MUST not trigger post navigation (NEW)

---

### PostDetail Component (UPDATED)

**Purpose**: Display full blog post content with tags and related articles.

**Props Interface**:
```typescript
interface PostDetailProps {
  post: BlogPost | null;  // Now includes tags?: string[]
  loading?: boolean;
  error?: string | null;
  onBack?: () => void;
  onTagClick?: (tag: string) => void;  // NEW
  relatedPosts?: BlogPost[];  // NEW
  activeTag?: string | null;  // NEW
}
```

**Behavior Contract** (Existing + New):
- MUST display full post content (existing)
- MUST display post title (existing)
- MUST display publication date (existing)
- MUST display author name (existing)
- MUST display tags if post has tags (NEW)
- MUST display related articles section if `relatedPosts` provided and non-empty (NEW)
- MUST call `onTagClick(tag)` when a tag is clicked (NEW)
- MUST handle posts without tags gracefully (no tag section) (NEW)
- MUST handle empty related posts gracefully (no related section) (NEW)
- MUST exclude current post from related articles (handled by parent) (NEW)

**Accessibility Requirements**:
- MUST have proper heading hierarchy (existing)
- MUST have proper article semantics (existing)
- Related articles section MUST have proper heading (h2) (NEW)
- Tag clicks MUST navigate to filtered list (via onTagClick) (NEW)

---

### PostPage Component (UPDATED)

**Purpose**: Page component that loads and displays a single blog post with tag navigation support.

**Props Interface**:
```typescript
// No props (uses useParams for slug)
```

**Behavior Contract** (Existing + New):
- MUST load post by slug from URL (existing)
- MUST handle loading and error states (existing)
- MUST calculate related posts using `findRelatedPosts()` (existing)
- MUST pass `onTagClick` handler to PostDetail that navigates to homepage with tag filter (NEW)
- MUST use React Router's `useNavigate` to navigate with URL search params (NEW)

**Navigation Behavior** (NEW):
- When tag is clicked in PostDetail, navigate to `/?tag={tag}` using `useNavigate`
- Tag value MUST be URL-encoded using `encodeURIComponent`
- Navigation preserves browser history (back button works)

---

### PostList Component (UPDATED)

**Purpose**: Display a list of blog posts with tag filtering support.

**Props Interface**:
```typescript
interface PostListProps {
  posts: BlogPost[];  // Now includes tags?: string[]
  loading?: boolean;
  error?: string | null;
  activeTag?: string | null;  // NEW
  onTagClick?: (tag: string) => void;  // NEW
  onClearFilter?: () => void;  // NEW
}
```

**Behavior Contract** (Existing + New):
- MUST display posts in reverse chronological order (existing)
- MUST show loading state when `loading === true` (existing)
- MUST show error message when `error` is provided (existing)
- MUST display active filter indicator when `activeTag` is set (NEW)
- MUST call `onClearFilter()` when clear filter button is clicked (NEW)
- MUST handle empty filtered results (show "No posts found" message) (NEW)
- MUST pass `activeTag` and `onTagClick` to PostCard components (NEW)

**Accessibility Requirements**:
- MUST have proper ARIA labels (existing)
- Active filter indicator MUST be announced to screen readers (NEW)
- Clear filter button MUST have accessible label (NEW)

---

### HomePage Component (UPDATED)

**Purpose**: Homepage with tag filtering state management and URL parameter synchronization.

**Props Interface**:
```typescript
// No props (page component)
```

**State Management** (NEW):
```typescript
const [selectedTag, setSelectedTag] = useState<string | null>(null);
const [searchParams, setSearchParams] = useSearchParams();
```

**Behavior Contract** (Existing + New):
- MUST load all posts on mount (existing)
- MUST read `tag` from URL search params on mount (NEW)
- MUST sync URL search params with `selectedTag` state (NEW)
- MUST filter posts by tag when `selectedTag` is set (NEW)
- MUST clear filter when `selectedTag` is null (NEW)
- MUST update URL search params when filter changes (NEW)
- MUST pass `activeTag` and `onTagClick` to PostList (NEW)
- MUST handle tag click: set `selectedTag`, update URL, and filter posts (NEW)
- MUST handle clear filter: set `selectedTag` to null and remove URL param (NEW)

**URL Parameter Synchronization** (NEW):
- On mount: Read `tag` from `searchParams.get('tag')` and set `selectedTag`
- On tag click: Update URL to `/?tag={tag}` using `setSearchParams({ tag })`
- On clear filter: Remove `tag` param using `setSearchParams({})` or `setSearchParams(prev => { prev.delete('tag'); return prev })`
- URL changes (browser back/forward): Update `selectedTag` from URL params

**Filtering Logic**:
- When `selectedTag` is null: show all published posts
- When `selectedTag` is set: show only posts where `tags` array contains normalized tag matching `selectedTag`
- Filtering MUST respect existing post visibility rules (future-dated posts remain hidden)

---

## Service Contracts

### Tag Normalizer Service (NEW)

**Purpose**: Normalize tag strings for consistent matching and storage.

**Interface**:
```typescript
interface TagNormalizer {
  normalizeTag(tag: string): string;
  normalizeTags(tags: string[]): string[];
  parseTags(value: unknown): string[];
}
```

**Behavior Contract**:
- `normalizeTag(tag)` MUST convert tag to lowercase
- `normalizeTag(tag)` MUST trim whitespace
- `normalizeTag(tag)` MUST return empty string if tag is invalid
- `normalizeTags(tags)` MUST normalize each tag in array
- `normalizeTags(tags)` MUST remove duplicates
- `normalizeTags(tags)` MUST remove empty strings
- `parseTags(value)` MUST handle array format: `["tag1", "tag2"]`
- `parseTags(value)` MUST handle string format: `"tag1, tag2"` (comma-separated)
- `parseTags(value)` MUST handle single string: `"tag1"`
- `parseTags(value)` MUST return empty array for invalid input

**Validation**:
- Empty strings after normalization are removed
- Case-insensitive matching: `"React"` and `"react"` normalize to `"react"`
- Special characters (hyphens, underscores) are preserved

---

### Post Filter Service (UPDATED)

**Purpose**: Filter blog posts by various criteria, including tags.

**Interface** (Existing + New):
```typescript
interface PostFilter {
  filterPublishedPosts(posts: BlogPost[]): BlogPost[];
  filterPostsByTag(posts: BlogPost[], tag: string | null): BlogPost[];  // NEW
}
```

**Behavior Contract** (Existing + New):
- `filterPublishedPosts()` MUST filter out future-dated posts (existing)
- `filterPostsByTag(posts, tag)` MUST return all posts when `tag` is null (NEW)
- `filterPostsByTag(posts, tag)` MUST return only posts with matching tag when `tag` is set (NEW)
- `filterPostsByTag(posts, tag)` MUST use case-insensitive matching (NEW)
- `filterPostsByTag(posts, tag)` MUST respect post visibility (apply published filter first) (NEW)
- `filterPostsByTag(posts, tag)` MUST handle posts without tags (exclude from results) (NEW)

**Filtering Logic**:
- Tag matching is case-insensitive: `"React"` matches `"react"`
- Posts without tags are excluded when filtering by tag
- Filtering is applied after published filter (future-dated posts remain hidden)

---

### Related Posts Service (NEW)

**Purpose**: Find posts related to a current post via shared tags.

**Interface**:
```typescript
interface RelatedPostsService {
  findRelatedPosts(
    currentPost: BlogPost,
    allPosts: BlogPost[],
    limit?: number
  ): BlogPost[];
}
```

**Behavior Contract**:
- `findRelatedPosts()` MUST exclude current post from results
- `findRelatedPosts()` MUST find posts that share at least one normalized tag
- `findRelatedPosts()` MUST sort by shared tag count (descending), then by publication date (descending)
- `findRelatedPosts()` MUST limit results to `limit` (default: 5-10)
- `findRelatedPosts()` MUST return empty array if current post has no tags
- `findRelatedPosts()` MUST return empty array if no other posts share tags

**Algorithm**:
1. Get current post's normalized tags
2. If no tags, return empty array
3. Find all posts (excluding current) that share at least one tag
4. Count shared tags for each related post
5. Sort by: shared tag count (desc), then publication date (desc)
6. Return top N results (limit)

---

### PostLoader Service (UPDATED)

**Purpose**: Load and parse markdown files into BlogPost entities with tags.

**Interface** (Existing):
```typescript
interface PostLoader {
  loadAllPosts(): Promise<BlogPost[]>;  // Now includes tags
  loadPost(slug: string): Promise<BlogPost | null>;  // Now includes tags
  watchForChanges(callback: (posts: BlogPost[]) => void): () => void;
}
```

**Behavior Contract** (Existing + New):
- `loadAllPosts()` MUST return all posts with tags parsed from frontmatter (NEW)
- `loadAllPosts()` MUST normalize tags during parsing (NEW)
- `loadAllPosts()` MUST handle missing tags field (treat as no tags) (NEW)
- `loadAllPosts()` MUST handle both array and string tag formats (NEW)
- `loadPost()` MUST return post with tags if available (NEW)

**Tag Parsing**:
- Extract `tags` field from frontmatter
- Handle YAML array format: `tags: ["tag1", "tag2"]`
- Handle string format: `tags: "tag1, tag2"` (parse and normalize)
- Normalize tags immediately during parsing
- Store normalized tags in `BlogPost.tags` field

---

## Data Flow Contracts

### Tag Filtering Flow

1. User clicks tag in PostCard or PostDetail
2. `onTagClick(tag)` called with normalized tag
3. **If on PostDetail**: PostPage navigates to `/?tag={tag}` using `useNavigate`
4. **If on PostCard**: HomePage updates `selectedTag` state and URL params
5. HomePage reads tag from URL params (if navigated from PostDetail)
6. HomePage filters posts using `filterPostsByTag()`
7. Filtered posts passed to PostList
8. PostList displays filtered posts with active filter indicator
9. User clicks active tag or clear button → `selectedTag` set to null, URL param removed
10. All posts displayed again

### Related Posts Flow

1. PostDetail component receives post with tags
2. HomePage calculates related posts using `findRelatedPosts()`
3. Related posts passed to PostDetail as prop
4. PostDetail displays related posts section below content
5. User clicks related post → navigate to that post
6. New post's related posts calculated and displayed

### Tag Display Flow

1. PostLoader parses frontmatter and extracts tags
2. Tags normalized and stored in `BlogPost.tags`
3. PostCard/PostDetail receives post with tags
4. TagList component renders tags as badges
5. User clicks tag → triggers filtering flow

---

## Error Contract

**Error States**:
- **Invalid tag format in frontmatter**: Log warning, treat as no tags, continue processing
- **Tag normalization failure**: Skip invalid tag, continue with valid tags
- **Filter returns no results**: Show "No posts found" message (not an error)
- **Related posts calculation failure**: Return empty array, don't show related section

**Error Display**:
- Invalid tags in frontmatter: Log to console, don't break post loading
- Filter with no results: User-friendly "No posts match this tag" message
- Related posts errors: Fail silently, don't show related section

---

## Performance Contract

**Tag Filtering Performance**:
- Filtering MUST complete in < 1 second (SC-001)
- Client-side filtering (no API calls)
- Filtering is O(n*m) where n=posts, m=tags per post (acceptable for < 100 posts)

**Related Posts Performance**:
- Calculation MUST complete in < 100ms for typical post count
- Calculation is O(n*m) where n=posts, m=tags per post
- Results can be memoized if needed

**Tag Normalization Performance**:
- Normalization done once at load time (not during filtering)
- O(m) per post where m=tags per post
- Minimal performance impact

**Bundle Size**:
- Tag feature adds < 5KB to bundle (well within < 200KB gzipped limit)

---

## Accessibility Contract

**Tag Interaction**:
- Tags MUST be keyboard accessible (Tab to focus, Enter/Space to activate)
- Tags MUST have proper ARIA labels: `aria-label="Tag: {tagName}"`
- Active tag MUST have `aria-current="true"`
- Tag clicks MUST be announced to screen readers

**Filter State**:
- Active filter MUST be announced to screen readers
- Clear filter button MUST have accessible label
- "No posts found" message MUST be announced

**Related Articles**:
- Related articles section MUST have proper heading (h2)
- Related articles MUST be keyboard navigable
- Related articles MUST have proper link semantics

