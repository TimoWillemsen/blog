# Tasks: Simple Blog Application

**Input**: Design documents from `/specs/001-blog-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included per constitution requirement (TDD mandatory). Tests MUST be written and FAIL before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/`, `tests/` at repository root
- Paths follow plan.md structure: `src/components/`, `src/lib/`, `src/pages/`, `src/content/posts/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan (src/components/, src/lib/, src/pages/, src/content/posts/, tests/)
- [x] T002 Initialize Vite project with React and TypeScript in root directory
- [x] T003 [P] Install and configure Tailwind CSS with PostCSS
- [x] T004 [P] Install and configure ShadCN UI components (setup shadcn/ui)
- [x] T005 [P] Install markdown dependencies (marked or remark, gray-matter for frontmatter)
- [x] T006 [P] Install testing dependencies (Vitest, React Testing Library, @testing-library/jest-dom)
- [x] T007 [P] Configure TypeScript with strict mode in tsconfig.json
- [x] T008 [P] Configure ESLint and Prettier for code quality
- [x] T009 Create content directory structure (src/content/posts/) for markdown files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T010 Create BlogPost type definition in src/lib/posts/types.ts
- [x] T011 Create MarkdownFile type definition in src/lib/markdown/types.ts
- [x] T012 [P] Implement MarkdownParser service interface in src/lib/markdown/parser.ts
- [x] T013 [P] Implement frontmatter parsing utility in src/lib/markdown/frontmatter.ts
- [x] T014 [P] Implement markdown to HTML conversion utility in src/lib/markdown/renderer.ts
- [x] T015 [P] Implement HTML sanitization utility in src/lib/markdown/sanitizer.ts
- [x] T016 Create PostLoader service interface in src/lib/posts/loader.ts
- [x] T017 Implement file system scanning utility in src/lib/posts/scanner.ts
- [x] T018 Implement slug generation utility in src/lib/posts/slug.ts
- [x] T019 Create error handling utilities in src/lib/errors/handlers.ts
- [x] T020 [P] Create base layout component in src/components/layout/Layout.tsx
- [x] T021 [P] Setup React Router configuration in src/App.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Published Blog Posts (Priority: P1) 🎯 MVP

**Goal**: Readers can view published blog posts on the blog homepage and read individual posts

**Independent Test**: Visit the blog homepage and verify published posts are visible with titles, dates, and full content. Click a post to view full content.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T022 [P] [US1] Unit test for MarkdownParser.parseFile() in tests/unit/markdown/parser.test.ts
- [x] T023 [P] [US1] Unit test for PostLoader.loadAllPosts() in tests/unit/posts/loader.test.ts
- [x] T024 [P] [US1] Unit test for slug generation in tests/unit/posts/slug.test.ts
- [x] T025 [P] [US1] Contract test for PostList component in tests/contract/components/PostList.test.tsx
- [x] T026 [P] [US1] Contract test for PostCard component in tests/contract/components/PostCard.test.tsx
- [x] T027 [P] [US1] Contract test for PostDetail component in tests/contract/components/PostDetail.test.tsx
- [x] T028 [P] [US1] Integration test for homepage post list display in tests/integration/homepage.test.tsx
- [x] T029 [P] [US1] Integration test for post detail view in tests/integration/post-detail.test.tsx

### Implementation for User Story 1

- [x] T030 [US1] Implement MarkdownParser.parseFile() in src/lib/markdown/parser.ts (depends on T012, T013)
- [x] T031 [US1] Implement MarkdownParser.parseMarkdown() in src/lib/markdown/parser.ts (depends on T014)
- [x] T032 [US1] Implement PostLoader.loadAllPosts() in src/lib/posts/loader.ts (depends on T016, T017, T030)
- [x] T033 [US1] Implement PostLoader.loadPost(slug) in src/lib/posts/loader.ts (depends on T032)
- [x] T034 [US1] Create MarkdownRenderer component in src/components/post/MarkdownRenderer.tsx
- [x] T035 [US1] Create PostCard component in src/components/post/PostCard.tsx
- [x] T036 [US1] Create PostList component in src/components/post/PostList.tsx (depends on T035)
- [x] T037 [US1] Create PostDetail component in src/components/post/PostDetail.tsx (depends on T034)
- [x] T038 [US1] Create HomePage component in src/pages/HomePage.tsx (depends on T036, T032)
- [x] T039 [US1] Create PostPage component in src/pages/PostPage.tsx (depends on T037, T033)
- [x] T040 [US1] Setup routing in src/App.tsx for homepage and post detail routes (depends on T038, T039, T021)
- [x] T041 [US1] Add loading states to PostList and PostDetail components
- [x] T042 [US1] Add error handling and display in PostList and PostDetail components
- [x] T043 [US1] Add empty state message when no posts available in PostList component

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Manage Blog Posts via Markdown Files (Priority: P2)

**Goal**: System automatically reads markdown files and displays them as blog posts. Author can create/edit posts by managing markdown files.

**Independent Test**: Create a new markdown file in src/content/posts/, verify it appears in reader view. Edit the file, verify changes are reflected.

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T044 [P] [US2] Unit test for file change detection in tests/unit/posts/scanner.test.ts
- [x] T045 [P] [US2] Unit test for PostLoader.watchForChanges() in tests/unit/posts/loader.test.ts
- [x] T046 [P] [US2] Integration test for file addition detection in tests/integration/file-management.test.ts
- [x] T047 [P] [US2] Integration test for file modification detection in tests/integration/file-management.test.ts
- [x] T048 [P] [US2] Integration test for file removal detection in tests/integration/file-management.test.ts

### Implementation for User Story 2

- [x] T049 [US2] Implement file filtering (ignore temp/backup files) in src/lib/posts/scanner.ts (depends on T017)
- [x] T050 [US2] Implement PostLoader.watchForChanges() in src/lib/posts/loader.ts (depends on T032, T049)
- [x] T051 [US2] Add file watching integration to HomePage component (depends on T050, T038)
- [x] T052 [US2] Implement metadata extraction with defaults (title from filename, date from file mod time) in src/lib/markdown/parser.ts
- [x] T053 [US2] Add error handling for malformed markdown files in src/lib/posts/loader.ts
- [x] T054 [US2] Add logging for file processing errors in src/lib/posts/loader.ts (depends on T019)
- [x] T055 [US2] Create sample markdown post file in src/content/posts/sample-post.md for testing

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Browse Posts by Date (Priority: P3)

**Goal**: Posts are displayed in reverse chronological order (newest first) on the homepage

**Independent Test**: Verify posts are displayed with most recent post first, and scrolling shows posts in reverse chronological order.

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T056 [P] [US3] Unit test for post sorting by date in tests/unit/posts/sorter.test.ts
- [x] T057 [P] [US3] Integration test for chronological ordering on homepage in tests/integration/sorting.test.tsx

### Implementation for User Story 3

- [x] T058 [US3] Implement post sorting utility by publication date in src/lib/posts/sorter.ts
- [x] T059 [US3] Integrate sorting into PostLoader.loadAllPosts() in src/lib/posts/loader.ts (depends on T032, T058)
- [x] T060 [US3] Update PostList component to display posts in sorted order (depends on T036, T059)
- [x] T061 [US3] Add handling for posts with same publication date (consistent ordering) in src/lib/posts/sorter.ts

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T062 [P] Add accessibility attributes (ARIA labels, roles) to all components
- [x] T063 [P] Add keyboard navigation support to PostCard and PostDetail components
- [x] T064 [P] Optimize bundle size (code splitting, lazy loading) in vite.config.ts
- [x] T065 [P] Add performance monitoring and bundle size tracking
- [x] T066 [P] Add error boundary component in src/components/layout/ErrorBoundary.tsx
- [x] T067 [P] Add loading skeletons for better UX in src/components/ui/skeleton.tsx
- [x] T068 [P] Style components with Tailwind CSS to match design system
- [x] T069 [P] Add responsive design for mobile devices
- [x] T070 [P] Add SEO meta tags to pages (title, description)
- [x] T071 [P] Add unit tests for edge cases (missing metadata, malformed files) in tests/unit/
- [x] T072 [P] Add integration tests for edge cases in tests/integration/
- [x] T073 Run quickstart.md validation checklist
- [x] T074 Code cleanup and refactoring
- [x] T075 Documentation updates in README.md

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 infrastructure (PostLoader, components) but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 (PostList component) but independently testable

### Within Each User Story

- Tests (included per constitution) MUST be written and FAIL before implementation
- Services before components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003-T008)
- All Foundational tasks marked [P] can run in parallel (T012-T015, T020-T021)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Services within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for MarkdownParser.parseFile() in tests/unit/markdown/parser.test.ts"
Task: "Unit test for PostLoader.loadAllPosts() in tests/unit/posts/loader.test.ts"
Task: "Unit test for slug generation in tests/unit/posts/slug.test.ts"
Task: "Contract test for PostList component in tests/contract/components/PostList.test.tsx"
Task: "Contract test for PostCard component in tests/contract/components/PostCard.test.tsx"
Task: "Contract test for PostDetail component in tests/contract/components/PostDetail.test.tsx"

# Launch foundational services in parallel:
Task: "Implement frontmatter parsing utility in src/lib/markdown/frontmatter.ts"
Task: "Implement markdown to HTML conversion utility in src/lib/markdown/renderer.ts"
Task: "Implement HTML sanitization utility in src/lib/markdown/sanitizer.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2 (can start after US1 PostLoader is done)
   - Developer C: User Story 3 (can start after US1 PostList is done)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD mandatory per constitution)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

