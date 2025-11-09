# Implementation Plan: Hide Future-Dated Blog Posts

**Branch**: `001-hide-future-posts` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-hide-future-posts/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Filter blog posts with future publication dates from all frontend views. Posts with publication dates in the past or on the current date should be displayed normally, while future-dated posts should be excluded from post lists and inaccessible via direct URL navigation. The filtering will be implemented at the data loading layer in the PostLoader service, comparing publication dates against the current date/time.

## Technical Context

**Language/Version**: TypeScript 5.2.2  
**Primary Dependencies**: React 18.2.0, React Router DOM 6.20.0, Vite 5.0.8, gray-matter 4.0.3, marked 17.0.0  
**Storage**: Markdown files in `/src/content/posts/*.md` (frontmatter-based metadata)  
**Testing**: Vitest 1.0.4, @testing-library/react 16.3.0, @testing-library/jest-dom 6.9.1  
**Target Platform**: Web browser (client-side React application)  
**Project Type**: Single web application (React SPA)  
**Performance Goals**: Post list filtering completes in < 500ms for up to 100 posts (per SC-005)  
**Constraints**: Must maintain backward compatibility with posts missing publication dates, filtering must occur without noticeable performance impact  
**Scale/Scope**: Blog application with markdown-based content, expected to handle 10-100 blog posts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Code Quality Standards
✅ **PASS**: Filtering logic will be implemented as a pure function with clear responsibility. Date comparison logic will be extracted into a dedicated utility function with clear documentation. No code duplication expected.

### II. Testing Standards (NON-NEGOTIABLE)
✅ **PASS**: TDD will be strictly followed:
- Unit tests for date comparison utility function (edge cases: timezone, same-day, invalid dates)
- Unit tests for PostLoader filtering logic
- Integration tests for HomePage and PostPage components to verify filtering behavior
- Contract tests to ensure BlogPost interface compliance
- All tests written before implementation

### III. User Experience Consistency
✅ **PASS**: Filtering is transparent to users - future-dated posts simply don't appear. No UI changes required. Existing error handling for "Post not found" already covers inaccessible posts.

### IV. Performance Requirements
✅ **PASS**: Filtering operation is O(n) where n is number of posts. Date comparison is O(1). Expected performance: < 10ms for 100 posts (well under 500ms threshold). No database queries or network calls involved.

### V. Code Review & Quality Gates
✅ **PASS**: Standard code review process applies. No breaking changes - only additive filtering behavior. Backward compatibility maintained for posts without dates.

**Gate Status**: ✅ **ALL GATES PASS** - Proceed to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
specs/001-hide-future-posts/
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
├── lib/
│   └── posts/
│       ├── loader.ts           # PostLoader service (filtering logic added here)
│       ├── types.ts            # BlogPost interface (no changes)
│       ├── filter.ts           # NEW: Date filtering utility functions
│       ├── slug.ts
│       ├── sorter.ts
│       └── scanner.ts
├── components/
│   └── post/
│       ├── PostList.tsx        # (no changes - receives filtered posts)
│       ├── PostDetail.tsx      # (no changes - receives filtered/null post)
│       └── PostCard.tsx
├── pages/
│   ├── HomePage.tsx            # (no changes - receives filtered posts)
│   └── PostPage.tsx            # (no changes - receives filtered/null post)
└── content/
    └── posts/
        └── *.md                # Markdown files with frontmatter dates

tests/
├── unit/
│   └── posts/
│       ├── filter.test.ts      # NEW: Unit tests for date filtering
│       └── loader.test.ts      # Updated: Tests for filtering in loader
├── integration/
│   ├── homepage.test.tsx       # Updated: Verify filtering on homepage
│   └── post-detail.test.tsx    # Updated: Verify 404 for future posts
└── contract/
    └── components/
        └── PostList.test.tsx   # Updated: Verify filtered posts
```

**Structure Decision**: Single project structure (React SPA). Filtering logic will be added to `src/lib/posts/loader.ts` and extracted into a new utility module `src/lib/posts/filter.ts` for testability and reusability. No changes to component structure - filtering happens at the data layer.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitution gates pass. No complexity tracking needed.

## Phase 0: Research Complete

**Status**: ✅ Complete

**Deliverables**:
- `research.md` - Technical decisions documented:
  - Date comparison approach (JavaScript Date.getTime())
  - Filtering implementation location (utility function)
  - Performance considerations (no optimization needed)
  - Backward compatibility strategy (maintain existing behavior)

**Key Decisions**:
- Use native JavaScript Date comparison with `getTime()` method
- Extract filtering to dedicated utility function for testability
- No performance optimization required for expected scale
- Maintain backward compatibility for posts without dates

## Phase 1: Design Complete

**Status**: ✅ Complete

**Deliverables**:
- `data-model.md` - BlogPost entity definition and filtering logic
- `contracts/components.md` - PostLoader interface contracts and component contracts
- `quickstart.md` - Implementation guide for developers
- Agent context updated (`.cursor/rules/specify-rules.mdc`)

**Design Decisions**:
- Filtering implemented in PostLoader service layer
- Pure utility function `isPostPublished()` for date checking
- No component changes required (filtering transparent to UI)
- Backward compatible (posts without dates remain visible)

## Constitution Check (Post-Design)

*Re-evaluated after Phase 1 design*

### I. Code Quality Standards
✅ **PASS**: Filtering logic is extracted into pure utility function with clear responsibility. Date comparison is isolated and well-documented.

### II. Testing Standards (NON-NEGOTIABLE)
✅ **PASS**: TDD approach maintained:
- Unit tests for `isPostPublished()` utility function
- Unit tests for PostLoader filtering methods
- Integration tests for component behavior
- All tests defined in contracts and quickstart guide

### III. User Experience Consistency
✅ **PASS**: No UI changes - filtering is transparent. Existing error handling covers inaccessible posts.

### IV. Performance Requirements
✅ **PASS**: O(n) filtering with O(1) date comparison. Expected < 10ms for 100 posts (well under 500ms threshold).

### V. Code Review & Quality Gates
✅ **PASS**: Standard review process applies. No breaking changes, backward compatible.

**Gate Status**: ✅ **ALL GATES PASS** - Ready for Phase 2 (task generation via `/speckit.tasks`)
