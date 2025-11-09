# Tasks: Post Tags and Filtering

**Input**: Design documents from `/specs/004-post-tags/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: TDD is mandatory per constitution - all tests must be written before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project structure and dependencies

- [x] T001 Verify existing project structure matches plan.md (src/components/, src/lib/, src/pages/, tests/)
- [x] T002 [P] Verify TypeScript, React, and testing dependencies are installed (check package.json)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests for Foundational (TDD - Write First, Ensure They Fail)

- [x] T003 [P] [FOUNDATION] Unit test for normalizeTag function in tests/unit/posts/tagNormalizer.test.ts
- [x] T004 [P] [FOUNDATION] Unit test for normalizeTags function in tests/unit/posts/tagNormalizer.test.ts
- [x] T005 [P] [FOUNDATION] Unit test for parseTags function in tests/unit/posts/tagNormalizer.test.ts

### Implementation for Foundational

- [x] T006 [P] [FOUNDATION] Extend BlogPost interface with tags field in src/lib/posts/types.ts
- [x] T007 [P] [FOUNDATION] Create tagNormalizer.ts with normalizeTag function in src/lib/posts/tagNormalizer.ts
- [x] T008 [P] [FOUNDATION] Add normalizeTags function to src/lib/posts/tagNormalizer.ts
- [x] T009 [P] [FOUNDATION] Add parseTags function to src/lib/posts/tagNormalizer.ts
- [x] T010 [FOUNDATION] Update PostLoader to parse tags from frontmatter in src/lib/posts/loader.ts

**Checkpoint**: Foundation ready - tag normalization and BlogPost type extension complete. User story implementation can now begin.

---

## Phase 3: User Story 1 - View Tags on Blog Posts (Priority: P1) 🎯 MVP

**Goal**: Readers can see tags associated with each blog post, making it easy to understand the topic and discover related content at a glance.

**Independent Test**: Can be fully tested by displaying posts with tags visible on post cards and detail pages. Delivers immediate value by showing topic categorization even without filtering functionality.

### Tests for User Story 1 (TDD - Write First, Ensure They Fail)

- [x] T011 [P] [US1] Contract test for TagList component in tests/contract/components/TagList.test.tsx
- [x] T012 [P] [US1] Contract test for PostCard with tags in tests/contract/components/PostCard.test.tsx
- [x] T013 [P] [US1] Contract test for PostDetail with tags in tests/contract/components/PostDetail.test.tsx

### Implementation for User Story 1

- [x] T014 [P] [US1] Create TagList component in src/components/post/TagList.tsx
- [x] T015 [US1] Update PostCard to display tags using TagList in src/components/post/PostCard.tsx
- [x] T016 [US1] Update PostDetail to display tags using TagList in src/components/post/PostDetail.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Tags are visible on all posts but not yet clickable.

---

## Phase 4: User Story 2 - Filter Posts by Tags (Priority: P2)

**Goal**: Readers can filter the blog post list to show only posts with specific tags, enabling quick discovery of related content. Clicking tags on detail pages navigates to homepage with filter applied.

**Independent Test**: Can be fully tested by selecting a tag and verifying only posts with that tag are displayed. Delivers value by reducing search time and improving content discovery.

### Tests for User Story 2 (TDD - Write First, Ensure They Fail)

- [x] T017 [P] [US2] Unit test for filterPostsByTag function in tests/unit/posts/filter.test.ts
- [x] T018 [P] [US2] Contract test for PostList with tag filtering in tests/contract/components/PostList.test.tsx
- [x] T019 [P] [US2] Integration test for tag filtering user flow in tests/integration/tag-filtering.test.tsx

### Implementation for User Story 2

- [x] T020 [P] [US2] Add filterPostsByTag function to src/lib/posts/filter.ts
- [x] T021 [US2] Add tag filter state management and URL parameter sync to HomePage in src/pages/HomePage.tsx
- [x] T022 [US2] Update PostList to handle tag filtering and active filter indicator in src/components/post/PostList.tsx
- [x] T023 [US2] Update PostCard to handle tag clicks and pass onTagClick prop in src/components/post/PostCard.tsx
- [x] T024 [US2] Update PostDetail to handle tag clicks and pass onTagClick prop in src/components/post/PostDetail.tsx
- [x] T025 [US2] Update TagList to handle tag clicks and active tag highlighting in src/components/post/TagList.tsx
- [x] T026 [US2] Add navigation handler in PostPage to navigate to homepage with tag filter in src/pages/PostPage.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Users can click tags to filter posts, and clicking tags on detail pages navigates to filtered homepage.

---

## Phase 5: User Story 3 - Discover Related Articles via Tags (Priority: P3)

**Goal**: Readers can easily find related articles by seeing posts that share tags with the current post they're reading.

**Independent Test**: Can be fully tested by viewing a post and seeing a list of related posts that share at least one tag. Delivers value by increasing content discovery and time spent on the blog.

### Tests for User Story 3 (TDD - Write First, Ensure They Fail)

- [x] T027 [P] [US3] Unit test for findRelatedPosts function in tests/unit/posts/relatedPosts.test.ts
- [x] T028 [P] [US3] Contract test for PostDetail with related articles in tests/contract/components/PostDetail.test.tsx

### Implementation for User Story 3

- [x] T029 [P] [US3] Create findRelatedPosts function in src/lib/posts/relatedPosts.ts
- [x] T030 [US3] Add related posts calculation to PostPage in src/pages/PostPage.tsx
- [x] T031 [US3] Update PostDetail to display related articles section in src/components/post/PostDetail.tsx

**Checkpoint**: All user stories should now be independently functional. Users can view tags, filter by tags, navigate from detail pages, and see related articles.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T032 [P] Add JSDoc comments to all new functions and components
- [x] T033 [P] Verify accessibility requirements (ARIA labels, keyboard navigation) across all tag components
- [x] T034 [P] Test edge cases: many tags, long tag names, special characters, empty states
- [x] T035 [P] Verify performance: tag filtering completes in < 1 second (SC-001)
- [x] T036 [P] Run linting and type checking (npm run lint, tsc --noEmit)
- [x] T037 [P] Run all tests and verify coverage meets requirements
- [x] T038 Run quickstart.md validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for TagList component, but filtering logic is independent
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 for tags display, but related posts calculation is independent

### Within Each User Story

- Tests (TDD) MUST be written and FAIL before implementation
- Models/types before services
- Services before components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational test tasks (T003-T005) can run in parallel
- All Foundational implementation tasks (T006-T009) can run in parallel
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Contract test for TagList component in tests/contract/components/TagList.test.tsx"
Task: "Contract test for PostCard with tags in tests/contract/components/PostCard.test.tsx"
Task: "Contract test for PostDetail with tags in tests/contract/components/PostDetail.test.tsx"

# After tests are written, create component:
Task: "Create TagList component in src/components/post/TagList.tsx"
```

---

## Parallel Example: User Story 2

```bash
# Launch all tests for User Story 2 together:
Task: "Unit test for filterPostsByTag function in tests/unit/posts/filter.test.ts"
Task: "Contract test for PostList with tag filtering in tests/contract/components/PostList.test.tsx"
Task: "Integration test for tag filtering user flow in tests/integration/tag-filtering.test.tsx"

# After tests, implement filtering and UI updates in parallel:
Task: "Add filterPostsByTag function to src/lib/posts/filter.ts"
Task: "Update PostList to handle tag filtering in src/components/post/PostList.tsx"
Task: "Update PostCard to handle tag clicks in src/components/post/PostCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently - tags should be visible on all posts
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP! - Tags visible)
3. Add User Story 2 → Test independently → Deploy/Demo (Filtering + Navigation working)
4. Add User Story 3 → Test independently → Deploy/Demo (Related articles working)
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Tag display)
   - Developer B: User Story 2 (Filtering + Navigation) - can start after US1 TagList exists
   - Developer C: User Story 3 (Related articles) - can start after US1 tags exist
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- TDD: Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Navigation requirement: Clicking tags on PostDetail must navigate to `/?tag={tag}` using React Router
- URL synchronization: HomePage must read and write tag filter to/from URL search params
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
