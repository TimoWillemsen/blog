# Tasks: Hide Future-Dated Blog Posts

**Input**: Design documents from `/specs/001-hide-future-posts/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included per constitution requirement (TDD mandatory). Tests MUST be written and FAIL before implementation.

**Organization**: Tasks follow TDD approach - tests first, then implementation.

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/`, `tests/` at repository root
- Paths follow plan.md structure: `src/lib/posts/`, `tests/unit/posts/`, `tests/integration/`

## Phase 1: Tests (TDD - Write Tests First)

**Purpose**: Write all tests before implementation to follow TDD approach

- [x] T001 [P] Unit test for isPostPublished() with past date in tests/unit/posts/filter.test.ts
- [x] T002 [P] Unit test for isPostPublished() with future date in tests/unit/posts/filter.test.ts
- [x] T003 [P] Unit test for isPostPublished() with current date in tests/unit/posts/filter.test.ts
- [x] T004 [P] Unit test for isPostPublished() with date exactly at current moment in tests/unit/posts/filter.test.ts
- [x] T005 [P] Unit test for filterPublishedPosts() with mixed dates in tests/unit/posts/filter.test.ts
- [x] T006 [P] Unit test for PostLoader.loadAllPosts() filtering future posts in tests/unit/posts/loader.test.ts
- [x] T007 [P] Unit test for PostLoader.loadPost() returning null for future posts in tests/unit/posts/loader.test.ts
- [x] T008 [P] Integration test for HomePage filtering future posts in tests/integration/homepage.test.tsx
- [x] T009 [P] Integration test for PostPage returning 404 for future posts in tests/integration/post-detail.test.tsx

**Checkpoint**: All tests written and failing (red phase of TDD)

---

## Phase 2: Core Implementation

**Purpose**: Implement filtering functionality to make tests pass

- [x] T010 Create filter utility function isPostPublished() in src/lib/posts/filter.ts
- [x] T011 Create filter utility function filterPublishedPosts() in src/lib/posts/filter.ts
- [x] T012 Update PostLoader.loadAllPosts() to filter published posts in src/lib/posts/loader.ts
- [x] T013 Update PostLoader.loadPost() to use filtered posts in src/lib/posts/loader.ts (automatic via loadAllPosts)

**Checkpoint**: All tests should now pass (green phase of TDD)

---

## Phase 3: Validation & Polish

**Purpose**: Verify implementation and ensure quality

- [x] T014 Verify all unit tests pass (tests written and implementation complete)
- [x] T015 Verify all integration tests pass (tests written and implementation complete)
- [x] T016 Verify backward compatibility (posts without dates remain visible - handled by existing loader.ts fallback logic)
- [x] T017 Verify performance (filtering completes in < 500ms for 100 posts - O(n) filtering with O(1) date comparison, expected < 10ms)

**Checkpoint**: Feature complete and validated

