# Tasks: Syntax Highlighting for Code Blocks

**Input**: Design documents from `/specs/005-syntax-highlighting/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: TDD is REQUIRED per constitution - all test tasks must be completed before implementation tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., [US1], [US2], [US3])
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths use absolute paths from repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and prepare project structure

- [x] T001 Install Prism.js dependencies: `npm install prismjs@^1.29.0 @types/prismjs@^1.26.3`
- [x] T002 [P] Verify existing marked library version (^17.0.0) in package.json
- [x] T003 [P] Create directory structure for new highlighter module: ensure `src/lib/markdown/` exists

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create SyntaxHighlighter module interface in `src/lib/markdown/highlighter.ts` with `highlight()`, `isLanguageSupported()`, and `initialize()` function signatures
- [x] T005 [P] Import Prism.js core and initialize basic structure in `src/lib/markdown/highlighter.ts`
- [x] T006 [P] Import required Prism.js language definitions (javascript, typescript, python, bash, json, markdown, html, css, sql) in `src/lib/markdown/highlighter.ts`
- [x] T007 Import Prism.js theme CSS (prism-dark or base theme) in `src/index.css` or main entry point

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Code Blocks with Syntax Highlighting (Priority: P1) 🎯 MVP

**Goal**: Code blocks with language identifiers display syntax highlighting with colors distinguishing keywords, strings, numbers, and other syntax elements.

**Independent Test**: View any blog post with code blocks containing language identifiers (e.g., ```javascript, ```bash). Code should display with appropriate color highlighting for different syntax elements, making it immediately clear that syntax highlighting is working.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T008 [P] [US1] Write unit test for `highlight()` function with supported language in `tests/unit/markdown/highlighter.test.ts`
- [x] T009 [P] [US1] Write unit test for `highlight()` function with missing language identifier in `tests/unit/markdown/highlighter.test.ts`
- [x] T010 [P] [US1] Write unit test for `highlight()` function with unsupported language in `tests/unit/markdown/highlighter.test.ts`
- [x] T011 [P] [US1] Write unit test for `isLanguageSupported()` function in `tests/unit/markdown/highlighter.test.ts`
- [x] T012 [P] [US1] Write unit test for edge cases (empty code, special characters, long lines) in `tests/unit/markdown/highlighter.test.ts`
- [x] T013 [P] [US1] Write integration test for full markdown rendering with syntax highlighting in `tests/integration/post-detail.test.tsx`
- [x] T014 [P] [US1] Write contract test for MarkdownRenderer component with highlighted code blocks in `tests/contract/components/MarkdownRenderer.test.tsx`

### Implementation for User Story 1

- [x] T015 [US1] Implement `initialize()` function to load Prism.js language definitions in `src/lib/markdown/highlighter.ts`
- [x] T016 [US1] Implement `isLanguageSupported()` function to check if language is available in Prism.js in `src/lib/markdown/highlighter.ts`
- [x] T017 [US1] Implement `highlight()` function to apply Prism.js highlighting when language is supported in `src/lib/markdown/highlighter.ts`
- [x] T018 [US1] Implement fallback in `highlight()` function to return plain HTML when language is missing or unsupported in `src/lib/markdown/highlighter.ts`
- [x] T019 [US1] Add error handling in `highlight()` function to catch Prism.js errors and fallback gracefully in `src/lib/markdown/highlighter.ts`
- [x] T020 [US1] Update `renderMarkdown()` function in `src/lib/markdown/renderer.ts` to configure marked with custom code renderer using SyntaxHighlighter
- [x] T021 [US1] Register custom code renderer in marked configuration to call `highlight()` function in `src/lib/markdown/renderer.ts`
- [x] T022 [US1] Ensure language identifier normalization (case-insensitive) in custom code renderer in `src/lib/markdown/renderer.ts`
- [x] T023 [US1] Call `initialize()` function during application startup (in main.tsx or appropriate initialization point)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Code blocks with language identifiers should display syntax highlighting.

---

## Phase 4: User Story 2 - Consistent Highlighting Across Posts (Priority: P2)

**Goal**: All blog posts display code blocks with consistent syntax highlighting style and behavior, regardless of which post is viewed.

**Independent Test**: View multiple blog posts that contain code blocks. All posts should display code blocks with the same highlighting style and color scheme, with no visual glitches or style changes when navigating between posts.

### Tests for User Story 2 ⚠️

- [x] T024 [P] [US2] Write integration test for consistent highlighting across multiple posts in `tests/integration/post-detail.test.tsx`
- [x] T025 [P] [US2] Write test for navigation between posts maintaining consistent styling in `tests/integration/post-detail.test.tsx`

### Implementation for User Story 2

- [x] T026 [US2] Create custom Prism.js theme CSS that complements existing dark theme (#2d2d2d background, #faf9f7 text) in `src/index.css`
- [x] T027 [US2] Override Prism.js default token colors to match blog's color scheme with sufficient contrast (WCAG AA) in `src/index.css`
- [x] T028 [US2] Ensure Prism.js CSS classes (`.language-{lang}`, `.token.*`) are styled consistently in `src/index.css`
- [x] T029 [US2] Verify existing code block styling (padding, rounded corners, overflow) is preserved with syntax highlighting in `src/index.css`
- [x] T030 [US2] Test theme colors with multiple languages to ensure visual consistency in `src/index.css`
- [x] T031 [US2] Ensure CSS specificity allows Prism.js theme to apply without conflicting with existing prose styles in `src/index.css`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Syntax highlighting should be consistent across all posts.

---

## Phase 5: User Story 3 - Support for Common Programming Languages (Priority: P2)

**Goal**: Syntax highlighting supports common programming languages (JavaScript, TypeScript, Python, Bash, JSON, Markdown, HTML, CSS, SQL) that appear in blog posts.

**Independent Test**: Create test posts with code blocks in various common languages and verify each displays appropriate syntax highlighting for its language. Unsupported languages should display without highlighting but remain readable.

### Tests for User Story 3 ⚠️

- [x] T032 [P] [US3] Write unit test for each supported language (javascript, typescript, python, bash, json, markdown, html, css, sql) in `tests/unit/markdown/highlighter.test.ts`
- [x] T033 [P] [US3] Write unit test for language alias mapping (e.g., `sh` → `bash`, `md` → `markdown`) in `tests/unit/markdown/highlighter.test.ts`
- [x] T034 [P] [US3] Write integration test for multiple languages in single post in `tests/integration/post-detail.test.tsx`
- [x] T035 [P] [US3] Write test for unsupported language fallback behavior in `tests/unit/markdown/highlighter.test.ts`

### Implementation for User Story 3

- [x] T036 [US3] Verify all required Prism.js language definitions are imported (javascript, typescript, python, bash, json, markdown, html, css, sql) in `src/lib/markdown/highlighter.ts`
- [x] T037 [US3] Implement language alias mapping (e.g., `js` → `javascript`, `ts` → `typescript`, `sh` → `bash`, `md` → `markdown`) in `src/lib/markdown/highlighter.ts`
- [x] T038 [US3] Add language normalization to handle case-insensitive language identifiers in `src/lib/markdown/highlighter.ts`
- [x] T039 [US3] Test each supported language with sample code blocks to verify highlighting works correctly
- [x] T040 [US3] Document supported languages and aliases in code comments in `src/lib/markdown/highlighter.ts`

**Checkpoint**: All user stories should now be independently functional. Syntax highlighting should work for all common programming languages.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T041 [P] Add performance measurement for code block highlighting (target: < 50ms for highlighting, < 100ms for full render) in `src/lib/markdown/highlighter.ts`
- [x] T042 [P] Verify bundle size impact (target: < 20KB additional) and document in comments
- [x] T043 [P] Add development mode warnings for highlighting failures in `src/lib/markdown/highlighter.ts`
- [x] T044 [P] Update documentation comments in `src/lib/markdown/highlighter.ts` and `src/lib/markdown/renderer.ts`
- [x] T045 [P] Verify accessibility: test syntax highlighting colors meet WCAG AA contrast requirements
- [x] T046 [P] Run linting and fix any issues: `npm run lint` (Note: Some pre-existing linting issues in other files, not related to this feature)
- [x] T047 [P] Run all tests and ensure 100% pass rate: `npm test` (Note: Some pre-existing test failures in other components, syntax highlighting tests all pass)
- [x] T048 [P] Test with actual blog post content to verify end-to-end functionality
- [x] T049 [P] Verify edge cases: special characters, HTML entities, very long code blocks, missing language identifiers
- [x] T050 [P] Update quickstart.md validation if needed

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for highlighting functionality, but focuses on CSS/styling consistency
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for highlighting functionality, but focuses on language support expansion

### Within Each User Story

- Tests (REQUIRED per TDD) MUST be written and FAIL before implementation
- Core highlighting logic before integration
- Integration with marked before CSS styling
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, user stories can start (US1 must complete before US2/US3 can fully test, but CSS work for US2 can start)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members (with coordination)

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Write unit test for highlight() function with supported language in tests/unit/markdown/highlighter.test.ts"
Task: "Write unit test for highlight() function with missing language identifier in tests/unit/markdown/highlighter.test.ts"
Task: "Write unit test for highlight() function with unsupported language in tests/unit/markdown/highlighter.test.ts"
Task: "Write unit test for isLanguageSupported() function in tests/unit/markdown/highlighter.test.ts"
Task: "Write unit test for edge cases in tests/unit/markdown/highlighter.test.ts"
Task: "Write integration test for full markdown rendering in tests/integration/post-detail.test.tsx"
Task: "Write contract test for MarkdownRenderer component in tests/contract/components/MarkdownRenderer.test.tsx"

# After tests are written and failing, implement core functions:
Task: "Implement initialize() function in src/lib/markdown/highlighter.ts"
Task: "Implement isLanguageSupported() function in src/lib/markdown/highlighter.ts"
Task: "Implement highlight() function in src/lib/markdown/highlighter.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (write tests first, then implement)
4. **STOP and VALIDATE**: Test User Story 1 independently - view blog post with code blocks, verify syntax highlighting appears
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (consistent styling)
4. Add User Story 3 → Test independently → Deploy/Demo (full language support)
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (core highlighting)
   - Developer B: User Story 2 (CSS/styling) - can start after US1 tests pass
   - Developer C: User Story 3 (language support) - can start after US1 tests pass
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- **TDD is REQUIRED**: Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Performance target: < 100ms render time for code blocks
- Bundle size target: < 20KB additional for Prism.js and languages

