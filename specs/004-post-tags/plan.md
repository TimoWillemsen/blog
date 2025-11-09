# Implementation Plan: Post Tags and Filtering

**Branch**: `004-post-tags` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-post-tags/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add tag support to blog posts enabling users to categorize content, filter posts by tags, and discover related articles. Tags are stored in markdown frontmatter as YAML arrays, normalized for case-insensitive matching, and displayed as clickable badges. Filtering operates client-side with React state management. Clicking tags on detail pages navigates to the homepage with the tag filter applied via URL search parameters.

## Technical Context

**Language/Version**: TypeScript 5.2.2  
**Primary Dependencies**: React 18.2.0, React Router DOM 6.20.0, Vite 5.0.8  
**Storage**: Markdown files with YAML frontmatter (gray-matter 4.0.3)  
**Testing**: Vitest 1.0.4, @testing-library/react 16.3.0  
**Target Platform**: Web browser (modern browsers)  
**Project Type**: Single-page web application (SPA)  
**Performance Goals**: Tag filtering completes in < 1 second (SC-001), page load < 2s (First Contentful Paint)  
**Constraints**: Client-side filtering only, no server-side API, must work with existing post loading infrastructure  
**Scale/Scope**: < 100 blog posts, < 50 unique tags, single user blog

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Code Quality Standards ✅

- **Status**: PASS
- **Compliance**: New code follows existing patterns (PostLoader, filter functions, React components)
- **Documentation**: JSDoc comments added to all new functions and components
- **Abstraction**: Reusable TagList component, utility functions in separate modules

### II. Testing Standards (NON-NEGOTIABLE) ✅

- **Status**: PASS
- **TDD Compliance**: Tests written before implementation (red-green-refactor cycle)
- **Coverage**: Unit tests for tag normalization, filtering, related posts; contract tests for components; integration tests for user flows
- **Test Types**: Unit (tagNormalizer, filter, relatedPosts), Contract (TagList, PostCard, PostDetail, PostList), Integration (tag filtering flow)

### III. User Experience Consistency ✅

- **Status**: PASS
- **Accessibility**: ARIA labels, keyboard navigation, focus indicators on tag buttons
- **Consistency**: Tags use existing design system colors and typography
- **Feedback**: Active filter indicator, clear filter button, loading states

### IV. Performance Requirements ✅

- **Status**: PASS
- **Filtering Performance**: Client-side filtering < 1s (meets SC-001)
- **Bundle Impact**: Minimal addition (< 5KB estimated)
- **No API Calls**: All filtering is client-side, no network latency

### V. Code Review & Quality Gates ✅

- **Status**: PASS
- **Review Ready**: All code follows existing patterns and conventions
- **Quality Gates**: Linting, type checking, tests all pass

**Overall Status**: ✅ ALL GATES PASS

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── post/
│       ├── TagList.tsx          # NEW: Reusable tag display component
│       ├── PostCard.tsx          # MODIFIED: Add tag display
│       ├── PostDetail.tsx        # MODIFIED: Add tag display, related articles
│       └── PostList.tsx          # MODIFIED: Add tag filtering UI
├── lib/
│   └── posts/
│       ├── tagNormalizer.ts      # NEW: Tag normalization utilities
│       ├── filter.ts             # MODIFIED: Add filterPostsByTag function
│       ├── relatedPosts.ts       # NEW: Related posts calculation
│       ├── loader.ts             # MODIFIED: Parse tags from frontmatter
│       └── types.ts              # MODIFIED: Add tags field to BlogPost
├── pages/
│   ├── HomePage.tsx              # MODIFIED: Add tag filter state, URL params
│   └── PostPage.tsx               # MODIFIED: Add tag click navigation
└── content/
    └── posts/
        └── *.md                  # MODIFIED: Add tags to frontmatter

tests/
├── unit/
│   └── posts/
│       ├── tagNormalizer.test.ts  # NEW: Tag normalization tests
│       ├── filter.test.ts        # MODIFIED: Add tag filtering tests
│       └── relatedPosts.test.ts   # NEW: Related posts tests
├── contract/
│   └── components/
│       ├── TagList.test.tsx       # NEW: TagList contract tests
│       ├── PostCard.test.tsx     # MODIFIED: Add tag display tests
│       ├── PostDetail.test.tsx   # MODIFIED: Add tag and related posts tests
│       └── PostList.test.tsx     # MODIFIED: Add filtering tests
└── integration/
    └── tag-filtering.test.tsx     # NEW: Tag filtering user flow test
```

**Structure Decision**: Single-page web application structure. New files added to existing `src/lib/posts/` and `src/components/post/` directories. Tests follow existing structure in `tests/unit/`, `tests/contract/`, and `tests/integration/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
