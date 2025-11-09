# Tasks: Multiple Theme Support

**Input**: Design documents from `/specs/006-multiple-themes/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included per constitution requirement (TDD mandatory). Tests MUST be written and FAIL before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/`, `tests/` at repository root
- Paths follow plan.md structure: `src/lib/theme/`, `src/components/layout/`, `src/index.css`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and theme system structure

- [x] T001 Create theme system directory structure (src/lib/theme/, tests/unit/theme/)
- [x] T002 [P] Create theme type definitions in src/lib/theme/types.ts
- [x] T003 [P] Create test setup utilities for theme testing in tests/unit/theme/setup.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core theme utilities that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests for Foundational Components ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T004 [P] Unit test for theme type validation in tests/unit/theme/types.test.ts
- [x] T005 [P] Unit test for localStorage storage utilities in tests/unit/theme/storage.test.ts
- [x] T006 [P] Unit test for seasonal theme availability logic in tests/unit/theme/seasonal.test.ts
- [x] T007 [P] Unit test for theme color definitions in tests/unit/theme/themes.test.ts

### Implementation for Foundational Components

- [x] T008 [P] Implement Theme type and ThemeColors interface in src/lib/theme/types.ts
- [x] T009 [P] Implement localStorage storage utilities (saveTheme, loadTheme, isValidTheme, isStorageAvailable) in src/lib/theme/storage.ts
- [x] T010 [P] Implement seasonal theme availability utilities (getAvailableThemes, isThemeAvailable, getCurrentMonth) in src/lib/theme/seasonal.ts
- [x] T011 [P] Define light theme color palette in src/lib/theme/themes.ts
- [x] T012 [P] Define dark theme color palette in src/lib/theme/themes.ts
- [x] T013 [P] Implement getThemeColors() function in src/lib/theme/themes.ts
- [x] T014 [P] Implement getAllThemes() function in src/lib/theme/themes.ts
- [x] T015 [P] Implement applyTheme() function to set data-theme attribute in src/lib/theme/themes.ts
- [x] T016 [P] Create CSS variables for light theme in src/index.css
- [x] T017 [P] Create CSS variables for dark theme in src/index.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Switch Between Light and Dark Themes (Priority: P1) 🎯 MVP

**Goal**: Users can switch between a light theme and a dark theme to customize their reading experience. Theme persists across pages and browser sessions.

**Independent Test**: Visit the blog, select dark theme from theme selector, verify all UI elements change to dark colors with appropriate contrast. Navigate between pages and refresh - theme should persist.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T018 [P] [US1] Unit test for ThemeProvider initialization and theme loading in tests/unit/theme/context.test.tsx
- [x] T019 [P] [US1] Unit test for useTheme hook in tests/unit/theme/context.test.tsx
- [x] T020 [P] [US1] Contract test for ThemeSelector component in tests/contract/components/ThemeSelector.test.tsx
- [x] T021 [P] [US1] Integration test for theme switching flow in tests/integration/theme-switching.test.tsx
- [x] T022 [P] [US1] Integration test for theme persistence across pages in tests/integration/theme-persistence.test.tsx

### Implementation for User Story 1

- [x] T023 [US1] Create ThemeContext and ThemeProvider component in src/lib/theme/context.tsx
- [x] T024 [US1] Implement useTheme hook in src/lib/theme/context.tsx
- [x] T025 [US1] Implement theme initialization from localStorage in ThemeProvider (depends on T009)
- [x] T026 [US1] Implement theme application to document root in ThemeProvider (depends on T015)
- [x] T027 [US1] Create ThemeSelector component in src/components/layout/ThemeSelector.tsx
- [x] T028 [US1] Implement theme dropdown/select UI in ThemeSelector component
- [x] T029 [US1] Integrate ThemeSelector into Layout header in src/components/layout/Layout.tsx
- [x] T030 [US1] Wrap App with ThemeProvider in src/App.tsx
- [x] T031 [US1] Update existing components to use CSS variables (verify Layout, PostCard, PostDetail, TagList work with themes)
- [x] T032 [US1] Update prose styles in src/index.css to use CSS variables for all color tokens
- [x] T033 [US1] Implement theme persistence on change in ThemeProvider (save to localStorage)
- [x] T034 [US1] Add error handling for localStorage failures in ThemeProvider (fallback to default theme)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can switch between light and dark themes with persistence.

---

## Phase 4: User Story 2 - Access Seasonal Themes (Priority: P2)

**Goal**: Users can select seasonal themes (Christmas and Halloween) that appear automatically during their respective seasons. Seasonal themes are slight deviations from the light theme.

**Independent Test**: During October, verify Halloween theme appears in selector. During December, verify Christmas theme appears. Select seasonal theme and verify UI displays seasonal color accents while maintaining readability.

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T035 [P] [US2] Unit test for seasonal theme availability in October in tests/unit/theme/seasonal.test.ts
- [x] T036 [P] [US2] Unit test for seasonal theme availability in December in tests/unit/theme/seasonal.test.ts
- [x] T037 [P] [US2] Unit test for seasonal theme filtering in ThemeProvider in tests/unit/theme/context.test.tsx
- [x] T038 [P] [US2] Integration test for seasonal theme display in selector in tests/integration/seasonal-themes.test.tsx
- [x] T039 [P] [US2] Integration test for seasonal theme fallback when season ends in tests/integration/seasonal-themes.test.tsx

### Implementation for User Story 2

- [x] T040 [US2] Define Christmas theme color palette in src/lib/theme/themes.ts (slight deviations from light theme)
- [x] T041 [US2] Define Halloween theme color palette in src/lib/theme/themes.ts (slight deviations from light theme)
- [x] T042 [US2] Create CSS variables for Christmas theme in src/index.css
- [x] T043 [US2] Create CSS variables for Halloween theme in src/index.css
- [x] T044 [US2] Update ThemeProvider to filter available themes based on current date (depends on T010)
- [x] T045 [US2] Update ThemeSelector to display only available themes (depends on T044)
- [x] T046 [US2] Implement seasonal theme fallback logic in ThemeProvider (fallback to light/dark when season ends)
- [x] T047 [US2] Update Theme type to include 'christmas' and 'halloween' in src/lib/theme/types.ts
- [x] T048 [US2] Validate seasonal theme colors meet WCAG AA contrast requirements

**Checkpoint**: At this point, User Story 2 should be fully functional. Seasonal themes appear during their months and can be selected.

---

## Phase 5: User Story 3 - Theme Preference Persistence (Priority: P3)

**Goal**: The system remembers the user's theme selection across browser sessions, with graceful error handling.

**Independent Test**: Select a theme, close browser, reopen blog - verify theme is automatically applied. Test with localStorage disabled - verify graceful fallback to default theme.

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T049 [P] [US3] Unit test for theme persistence across browser sessions in tests/unit/theme/storage.test.ts
- [ ] T050 [P] [US3] Unit test for localStorage error handling in tests/unit/theme/storage.test.ts
- [ ] T051 [P] [US3] Integration test for theme persistence on page refresh in tests/integration/theme-persistence.test.tsx
- [ ] T052 [P] [US3] Integration test for localStorage unavailable scenario in tests/integration/theme-persistence.test.tsx

### Implementation for User Story 3

- [ ] T053 [US3] Enhance ThemeProvider to handle localStorage errors gracefully (already partially done in T034, verify completeness)
- [ ] T054 [US3] Implement theme validation on load (check if stored theme is still available) in ThemeProvider
- [ ] T055 [US3] Add fallback to default 'light' theme when stored theme is invalid/unavailable
- [ ] T056 [US3] Implement theme persistence for seasonal themes (handle expiration when season ends)
- [ ] T057 [US3] Add error logging for debugging theme persistence issues

**Checkpoint**: At this point, User Story 3 should be fully functional. Theme preferences persist correctly with robust error handling.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final polish, accessibility, performance, and edge case handling

### Accessibility & WCAG Compliance

- [ ] T058 [P] Validate all theme color combinations meet WCAG AA contrast requirements (4.5:1 normal text, 3:1 large text)
- [ ] T059 [P] Test theme selector with keyboard navigation (Tab, Enter, Arrow keys)
- [ ] T060 [P] Test theme selector with screen reader (verify aria-labels and announcements)
- [ ] T061 [P] Verify focus states are visible in all themes

### Performance & Optimization

- [ ] T062 [P] Verify theme switching completes in < 1 second (measure with performance API)
- [ ] T063 [P] Verify no layout shifts during theme switching (CLS < 0.1)
- [ ] T064 [P] Test rapid theme switching (verify no visual glitches or performance issues)
- [ ] T065 [P] Verify bundle size impact is < 5KB additional JavaScript

### Edge Cases & Error Handling

- [ ] T066 [P] Test theme switching while content is loading (verify no layout shifts)
- [ ] T067 [P] Test theme selector on mobile devices (verify responsive design)
- [ ] T068 [P] Test with incorrect system clock (verify seasonal themes still work correctly)
- [ ] T069 [P] Test theme boundary dates (October 1st, December 1st, November 1st, January 1st)
- [ ] T070 [P] Test with corrupted localStorage data (verify graceful fallback)
- [ ] T071 [P] Test theme switching across all pages (home, post detail, about)

### Documentation & Code Quality

- [ ] T072 [P] Add JSDoc comments to all theme utilities and components
- [ ] T073 [P] Update README with theme switching instructions
- [ ] T074 [P] Verify all code passes linting and type checking
- [ ] T075 [P] Run full test suite and verify 80%+ code coverage for theme system

---

## Dependencies

### User Story Completion Order

1. **Phase 2 (Foundational)** → Must complete before any user story
2. **Phase 3 (US1)** → Can start immediately after Phase 2
3. **Phase 4 (US2)** → Depends on Phase 3 (uses theme system from US1)
4. **Phase 5 (US3)** → Depends on Phase 3 and Phase 4 (enhances persistence)
5. **Phase 6 (Polish)** → Depends on all user stories

### Parallel Execution Opportunities

**Within Phase 2 (Foundational)**:
- T004-T007 (all test tasks) can run in parallel
- T008-T017 (all implementation tasks) can run in parallel (different files)

**Within Phase 3 (US1)**:
- T018-T022 (all test tasks) can run in parallel
- T023-T024 (context implementation) must complete before T025-T034
- T025-T034 can run in parallel after context is ready

**Within Phase 4 (US2)**:
- T035-T039 (all test tasks) can run in parallel
- T040-T048 can run in parallel after theme definitions are ready

**Within Phase 5 (US3)**:
- T049-T052 (all test tasks) can run in parallel
- T053-T057 can run in parallel

**Within Phase 6 (Polish)**:
- All tasks can run in parallel (different concerns)

## Implementation Strategy

### MVP Scope (Minimum Viable Product)

**Recommended MVP**: Complete Phase 2 (Foundational) + Phase 3 (US1) only

This delivers:
- ✅ Light and dark theme switching
- ✅ Theme persistence across pages and sessions
- ✅ Theme selector UI
- ✅ All existing components work with themes

**Post-MVP Enhancements**:
- Phase 4: Seasonal themes (nice-to-have, can be added later)
- Phase 5: Enhanced persistence (mostly covered in US1, but adds robustness)
- Phase 6: Polish (can be done incrementally)

### Incremental Delivery

1. **Week 1**: Phase 2 (Foundational) - Core theme system
2. **Week 2**: Phase 3 (US1) - Light/Dark themes with basic persistence
3. **Week 3**: Phase 4 (US2) - Seasonal themes
4. **Week 4**: Phase 5 (US3) + Phase 6 (Polish) - Enhanced persistence and polish

### Testing Strategy

- **TDD Approach**: Write all tests first, ensure they fail, then implement
- **Test Coverage**: Aim for 80%+ coverage on theme system code
- **Integration Focus**: Test complete user flows (theme switching, persistence)
- **Accessibility Testing**: Manual testing with keyboard and screen reader
- **Performance Testing**: Measure theme switching speed and layout shifts

---

## Summary

- **Total Tasks**: 75
- **Phase 1 (Setup)**: 3 tasks
- **Phase 2 (Foundational)**: 14 tasks (4 tests + 10 implementation)
- **Phase 3 (US1)**: 17 tasks (5 tests + 12 implementation)
- **Phase 4 (US2)**: 14 tasks (5 tests + 9 implementation)
- **Phase 5 (US3)**: 9 tasks (4 tests + 5 implementation)
- **Phase 6 (Polish)**: 18 tasks

**MVP Scope**: Phases 1-3 (34 tasks) - Light/Dark themes with persistence

**Independent Test Criteria**:
- **US1**: Can switch between light/dark themes, theme persists across pages and sessions
- **US2**: Seasonal themes appear during their months, can be selected and applied
- **US3**: Theme preference persists correctly with graceful error handling

