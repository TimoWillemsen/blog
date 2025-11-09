# Research: About Me Page

**Feature**: About Me Page  
**Date**: 2025-01-27  
**Phase**: 0 - Outline & Research

## Research Questions

### 1. How to structure about page loader separate from blog posts?

**Decision**: Create a dedicated `AboutLoader` service in `src/lib/about/` that reuses markdown parsing utilities but operates independently from the blog post loading system.

**Rationale**:
- Maintains separation of concerns: blog posts and about page are different content types
- Allows independent evolution: about page doesn't need post-specific features (slug generation, sorting, date-based filtering)
- Reuses existing markdown parsing infrastructure (`parseFile`, `parseMarkdown` from `src/lib/markdown/`)
- Follows single responsibility principle: each loader handles one content type

**Alternatives Considered**:
- **Extend PostLoader**: Rejected - would couple about page to blog post logic unnecessarily
- **Generic ContentLoader**: Rejected - over-engineering for two content types, adds unnecessary abstraction
- **Hardcode in component**: Rejected - doesn't follow established pattern, harder to test and maintain

**Implementation Approach**:
- Create `src/lib/about/aboutLoader.ts` with `loadAboutPage()` method
- Use `import.meta.glob` to load `src/content/about.md` (similar to how posts are loaded)
- Reuse `parseFile()` from `src/lib/markdown/parser.ts` to extract frontmatter and body
- Reuse `parseMarkdown()` to convert markdown body to HTML
- Return a simple `AboutPage` entity (title, content, optional metadata)

### 2. How to handle routing without conflicting with blog post slugs?

**Decision**: Use explicit `/about` route that takes precedence over the catch-all `/:slug` route for blog posts.

**Rationale**:
- React Router matches routes in order, so `/about` route must be defined before `/:slug`
- Explicit route is clearer and more maintainable than trying to exclude "about" from slug matching
- Follows RESTful conventions: `/about` is a standard path for about pages
- Prevents accidental conflicts if a blog post is ever created with slug "about"

**Alternatives Considered**:
- **Use `/about-me` route**: Rejected - `/about` is more standard and shorter
- **Exclude "about" from slug matching**: Rejected - more complex, requires route guard logic
- **Use query parameter**: Rejected - doesn't match URL structure expectations, less SEO-friendly

**Implementation Approach**:
- Add `<Route path="/about" element={<AboutPage />} />` before `<Route path="/:slug" element={<PostPage />} />` in `App.tsx`
- This ensures `/about` is matched first, before the catch-all slug route

### 3. How to reuse markdown rendering components?

**Decision**: Reuse existing `MarkdownRenderer` component from `src/components/post/MarkdownRenderer.tsx` for displaying about page content.

**Rationale**:
- Component is already generic: takes `content` (HTML string) and optional `className`
- No blog-specific logic in the component - it's a pure presentation component
- Maintains visual consistency: about page will have same markdown styling as blog posts
- Follows DRY principle: no need to duplicate rendering logic

**Alternatives Considered**:
- **Create separate AboutMarkdownRenderer**: Rejected - unnecessary duplication, breaks consistency
- **Inline rendering in AboutPage**: Rejected - doesn't follow component pattern, harder to test
- **Extract to shared location**: Considered but not needed - component is already in a reasonable location and is reusable

**Implementation Approach**:
- Import `MarkdownRenderer` from `src/components/post/MarkdownRenderer.tsx` in `AboutPage.tsx`
- Pass HTML content (from `parseMarkdown()`) to the component
- Component handles sanitization and styling automatically

### 4. How to integrate navigation to about page?

**Decision**: Add navigation link in the Layout component header, next to or near the site title.

**Rationale**:
- Header is the standard location for primary navigation
- Consistent with common blog patterns: about page is typically accessible from header
- Doesn't require new navigation component - simple Link in existing header
- Maintains clean, minimal design aesthetic

**Alternatives Considered**:
- **Footer navigation**: Rejected - less discoverable, about page is important enough for header
- **Separate navigation menu**: Rejected - over-engineering for single additional link
- **Breadcrumbs**: Rejected - not needed for simple site structure
- **Sidebar**: Rejected - no sidebar exists, would require new layout component

**Implementation Approach**:
- Add `<Link to="/about">About</Link>` in `src/components/layout/Layout.tsx` header
- Style consistently with existing header elements
- Position near site title or as separate navigation item

### 5. What content structure should about.md use?

**Decision**: Use same frontmatter + markdown body structure as blog posts, but with simpler metadata requirements.

**Rationale**:
- Consistency: same format as blog posts makes it familiar
- Reuses existing parsing infrastructure
- Frontmatter allows for optional metadata (title, last updated date, etc.)
- Markdown body provides flexibility for rich content formatting

**Alternatives Considered**:
- **Plain markdown only**: Rejected - frontmatter provides useful metadata and consistency
- **JSON metadata file**: Rejected - unnecessary complexity, breaks consistency
- **Hardcoded in component**: Rejected - doesn't follow content-as-data pattern

**Implementation Approach**:
- Create `src/content/about.md` with optional frontmatter:
  ```yaml
  ---
  title: "About"
  lastUpdated: "2025-01-27"
  ---
  ```
- Markdown body contains the actual about page content
- Loader extracts frontmatter and body, converts body to HTML

## Technology Decisions

### Markdown Parsing
- **Decision**: Reuse existing `marked` library via `src/lib/markdown/parser.ts`
- **Rationale**: Already in use, proven, configured correctly
- **No alternatives needed**: Existing solution is appropriate

### File Loading
- **Decision**: Use Vite's `import.meta.glob` with `?raw` query parameter
- **Rationale**: Same approach as blog posts, works in browser environment
- **No alternatives needed**: Existing solution is appropriate

### Routing
- **Decision**: Use React Router DOM (already in use)
- **Rationale**: Already integrated, standard for React SPAs
- **No alternatives needed**: Existing solution is appropriate

## Best Practices Applied

1. **Separation of Concerns**: About page loader separate from blog post loader
2. **Code Reuse**: Reuse markdown parsing and rendering components
3. **Consistency**: Follow same patterns as blog posts where appropriate
4. **Simplicity**: Minimal new code, leverage existing infrastructure
5. **Testability**: Each component can be tested independently

## Dependencies

- Existing markdown parsing utilities (`src/lib/markdown/`)
- Existing `MarkdownRenderer` component
- React Router DOM (already in use)
- Vite build system (for `import.meta.glob`)

## Open Questions Resolved

All research questions have been resolved. No remaining unknowns.

