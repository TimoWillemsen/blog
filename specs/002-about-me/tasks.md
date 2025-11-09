# Tasks: About Me Page

**Input**: Design documents from `/specs/002-about-me/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: TDD is mandatory per constitution - all test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., [US1], [US2], [US3])
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths follow existing blog structure: `src/lib/about/`, `src/pages/`, `src/content/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and content file structure

- [X] T001 Create content directory structure for about page in src/content/
- [X] T002 Create about page markdown file template in src/content/about.md with frontmatter and sample content

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Create AboutPage type definition in src/lib/about/types.ts
- [X] T004 [P] Create AboutLoader service interface in src/lib/about/aboutLoader.ts
- [X] T005 Implement AboutLoader.loadAboutPage() method in src/lib/about/aboutLoader.ts (reuses parseFile and parseMarkdown from src/lib/markdown/)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - View About Page Content (Priority: P1) 🎯 MVP

**Goal**: Display personal information about the blog author on a dedicated about-me page accessible via URL route

**Independent Test**: Navigate to `/about` URL and verify that personal information about the author is displayed in a readable format. This delivers value by allowing visitors to understand who writes the blog.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T006 [P] [US1] Unit test for AboutLoader.loadAboutPage() with valid markdown in tests/unit/about/loader.test.ts
- [X] T007 [P] [US1] Unit test for AboutLoader.loadAboutPage() with missing file in tests/unit/about/loader.test.ts
- [X] T008 [P] [US1] Unit test for AboutLoader.loadAboutPage() with invalid frontmatter in tests/unit/about/loader.test.ts
- [X] T009 [P] [US1] Contract test for AboutPage component in tests/contract/components/AboutPage.test.tsx
- [X] T010 [P] [US1] Integration test for about page route and rendering in tests/integration/about-page.test.tsx

### Implementation for User Story 1

- [X] T011 [US1] Create AboutPage component in src/pages/AboutPage.tsx with loading, error, and content states
- [X] T012 [US1] Implement content loading logic in src/pages/AboutPage.tsx using AboutLoader.loadAboutPage()
- [X] T013 [US1] Integrate MarkdownRenderer component in src/pages/AboutPage.tsx to display about page content
- [X] T014 [US1] Add /about route to App.tsx before /:slug route to prevent conflicts
- [X] T015 [US1] Add AboutPage import to src/App.tsx
- [X] T016 [US1] Verify about page displays title from frontmatter or defaults to "About"
- [X] T017 [US1] Verify about page handles missing about.md file gracefully with error message

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Navigate to `/about` to verify content displays correctly.

---

## Phase 4: User Story 2 - Navigate to About Page (Priority: P2)

**Goal**: Provide navigation link to about-me page from other parts of the blog for discoverability

**Independent Test**: Verify that a navigation link to the about-me page exists in the blog interface (header) and that clicking it successfully navigates to the about page. This delivers value by making the about page discoverable to visitors.

### Tests for User Story 2 ⚠️

- [X] T018 [P] [US2] Integration test for navigation link in header in tests/integration/about-navigation.test.tsx
- [X] T019 [P] [US2] Integration test for navigation from homepage to about page in tests/integration/about-navigation.test.tsx
- [X] T020 [P] [US2] Integration test for navigation from blog post page to about page in tests/integration/about-navigation.test.tsx

### Implementation for User Story 2

- [X] T021 [US2] Add "About" navigation link to Layout component header in src/components/layout/Layout.tsx
- [X] T022 [US2] Style navigation link to match existing header elements in src/components/layout/Layout.tsx
- [X] T023 [US2] Verify navigation link uses React Router Link component in src/components/layout/Layout.tsx
- [X] T024 [US2] Test navigation from homepage to about page works correctly
- [X] T025 [US2] Test navigation from blog post page to about page works correctly

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Navigation link should be visible and functional from all pages.

---

## Phase 5: User Story 3 - Responsive About Page Display (Priority: P3)

**Goal**: Ensure about-me page content is readable and properly formatted on different device sizes (mobile, tablet, desktop)

**Independent Test**: View the about-me page on different screen sizes and verify that content is readable and properly formatted on mobile devices, tablets, and desktop screens. This delivers value by ensuring all visitors can access the information regardless of their device.

### Tests for User Story 3 ⚠️

- [X] T026 [P] [US3] Integration test for responsive layout on mobile viewport in tests/integration/about-responsive.test.tsx
- [X] T027 [P] [US3] Integration test for responsive layout on tablet viewport in tests/integration/about-responsive.test.tsx
- [X] T028 [P] [US3] Integration test for responsive layout on desktop viewport in tests/integration/about-responsive.test.tsx

### Implementation for User Story 3

- [X] T029 [US3] Verify AboutPage component uses existing Layout component for responsive structure
- [X] T030 [US3] Verify MarkdownRenderer component applies responsive prose classes correctly
- [X] T031 [US3] Test about page on mobile device viewport (320px-768px)
- [X] T032 [US3] Test about page on tablet viewport (768px-1024px)
- [X] T033 [US3] Test about page on desktop viewport (1024px+)
- [X] T034 [US3] Verify content adapts when browser window is resized

**Checkpoint**: All user stories should now be independently functional. About page should be responsive across all device sizes.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [X] T035 [P] Verify all tests pass (unit, contract, integration)
- [X] T036 [P] Run linting and fix any issues
- [X] T037 [P] Verify about page loads within 2 seconds (SC-001 performance requirement)
- [X] T038 [P] Verify about page meets accessibility standards (WCAG 2.1 Level AA)
- [X] T039 [P] Verify about page styling matches blog design system
- [X] T040 [P] Verify /about route does not conflict with blog post slugs
- [X] T041 [P] Run quickstart.md validation checklist
- [X] T042 Code cleanup and refactoring if needed
- [X] T043 Update documentation if needed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed sequentially in priority order (P1 → P2 → P3)
  - US2 depends on US1 being complete (navigation needs page to exist)
  - US3 can proceed after US1 (responsive testing needs page to exist)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 completion - Navigation link needs about page to exist
- **User Story 3 (P3)**: Depends on US1 completion - Responsive testing needs about page to exist

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Type definitions before loader implementation
- Loader implementation before component
- Component before routing
- Routing before navigation
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks T001 and T002 can run in parallel (different concerns)
- Foundational tasks T003 and T004 can run in parallel (different files)
- All test tasks within a user story marked [P] can run in parallel
- Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for AboutLoader.loadAboutPage() with valid markdown in tests/unit/about/loader.test.ts"
Task: "Unit test for AboutLoader.loadAboutPage() with missing file in tests/unit/about/loader.test.ts"
Task: "Unit test for AboutLoader.loadAboutPage() with invalid frontmatter in tests/unit/about/loader.test.ts"
Task: "Contract test for AboutPage component in tests/contract/components/AboutPage.test.tsx"
Task: "Integration test for about page route and rendering in tests/integration/about-page.test.tsx"

# These can all be written in parallel since they test different aspects
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (write tests first, then implementation)
4. **STOP and VALIDATE**: Test User Story 1 independently by navigating to `/about`
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### TDD Workflow

For each user story:
1. Write all test tasks first (T006-T010 for US1, etc.)
2. Run tests - they should FAIL (red)
3. Implement corresponding functionality (T011-T017 for US1, etc.)
4. Run tests - they should PASS (green)
5. Refactor if needed
6. Move to next story

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- About page loader is separate from blog post loader (separation of concerns)
- Reuses existing markdown parsing utilities (parseFile, parseMarkdown)
- Reuses existing MarkdownRenderer component
- Route `/about` must be defined before `/:slug` in App.tsx
- Avoid: modifying blog post functionality, coupling about page to blog posts

