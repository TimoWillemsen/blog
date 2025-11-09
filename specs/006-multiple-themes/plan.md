# Implementation Plan: Multiple Theme Support

**Branch**: `006-multiple-themes` | **Date**: 2025-11-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-multiple-themes/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add support for multiple themes (light, dark, and seasonal themes) to the blog application. Users can switch between themes via a theme selector control, with preferences persisted across sessions. Seasonal themes (Halloween, Christmas) automatically appear in the selector during their respective months. All themes must maintain WCAG AA contrast requirements and apply immediately without page refresh.

## Technical Context

**Language/Version**: TypeScript 5.2.2, React 18.2.0  
**Primary Dependencies**: React Router DOM 6.20.0, Tailwind CSS 3.4.1, Vite 7.2.2  
**Storage**: Browser localStorage (for theme preference persistence)  
**Testing**: Vitest 4.0.8, @testing-library/react 16.3.0  
**Target Platform**: Modern web browsers (ES2020+), static site deployment  
**Project Type**: Single-page web application (React SPA)  
**Performance Goals**: Theme switching < 1 second, no layout shifts (CLS < 0.1), immediate visual feedback  
**Constraints**: Must work without page refresh, graceful fallback if localStorage unavailable, maintain accessibility (WCAG AA), support all existing UI elements  
**Scale/Scope**: Single-user blog application, 4 themes (light, dark, Christmas, Halloween), ~10 UI components to theme

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Code Quality Standards ✅
- **Requirement**: Code must be readable, maintainable, follow consistent patterns
- **Compliance**: Theme system will use consistent naming conventions, clear separation of concerns (theme definitions, theme context, theme selector component)
- **Risk**: Low - straightforward feature with clear boundaries

### II. Testing Standards (NON-NEGOTIABLE) ✅
- **Requirement**: TDD mandatory - tests written before implementation, 80% code coverage minimum
- **Compliance**: Unit tests for theme utilities (date checking, localStorage), integration tests for theme switching flows, contract tests for theme data structures
- **Risk**: Low - well-defined requirements enable comprehensive test coverage

### III. User Experience Consistency ✅
- **Requirement**: Consistent, predictable experiences, WCAG 2.1 Level AA minimum
- **Compliance**: All themes maintain consistent UI patterns, WCAG AA contrast ratios enforced (4.5:1 normal text, 3:1 large text), immediate visual feedback on theme switch
- **Risk**: Medium - requires careful color selection and contrast validation

### IV. Performance Requirements ✅
- **Requirement**: Theme switching < 1 second, no layout shifts (CLS < 0.1)
- **Compliance**: CSS variable-based theming enables instant switching, no DOM manipulation required, theme applied via CSS classes/data attributes
- **Risk**: Low - CSS-based approach inherently fast

### V. Code Review & Quality Gates ✅
- **Requirement**: All code reviewed, automated gates pass, performance impact assessed
- **Compliance**: Standard PR process, linting/tests must pass, performance testing for theme switching speed
- **Risk**: Low - standard process

**GATE STATUS**: ✅ **PASS** - All constitution principles satisfied. No violations identified.

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
│   ├── layout/
│   │   ├── Layout.tsx          # Add theme context provider
│   │   └── ThemeSelector.tsx   # NEW: Theme selector component
│   └── post/                    # Existing components (will use theme)
├── lib/
│   └── theme/                   # NEW: Theme system
│       ├── types.ts             # Theme type definitions
│       ├── themes.ts           # Theme color definitions
│       ├── context.tsx          # React context for theme state
│       ├── storage.ts           # localStorage utilities
│       └── seasonal.ts          # Seasonal theme availability logic
├── pages/                       # Existing pages (will use theme)
└── index.css                    # Update with CSS variables for theming

tests/
├── contract/
│   └── components/
│       └── ThemeSelector.test.tsx  # NEW: Contract tests
├── integration/
│   └── theme-switching.test.tsx    # NEW: Integration tests
└── unit/
    └── theme/                      # NEW: Theme utilities
        ├── themes.test.ts
        ├── storage.test.ts
        └── seasonal.test.ts
```

**Structure Decision**: Single project structure (Option 1). New theme system added to `src/lib/theme/` with clear separation: types, theme definitions, context provider, storage utilities, and seasonal logic. Theme selector component added to layout components. Existing components will consume theme via context without structural changes.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations identified. All constitution principles satisfied with standard React patterns.

---

## Phase 0: Research ✅

**Status**: Complete

**Output**: `research.md`

**Key Decisions**:
1. CSS Custom Properties with data attributes for theming (instant switching, no layout shifts)
2. React Context API for theme state management (simple, no external dependencies)
3. localStorage for persistence with graceful fallback
4. Client-side date checking for seasonal themes (works in static site)
5. Pre-validated colors for WCAG AA compliance
6. Dropdown selector in header navigation (accessible, discoverable)

**Research Questions Resolved**: All 6 questions answered with clear rationale and alternatives considered.

---

## Phase 1: Design & Contracts ✅

**Status**: Complete

**Outputs**:
- `data-model.md` - Theme, ThemeColors, ThemePreference, AvailableThemes entities
- `contracts/components.md` - Component contracts (ThemeProvider, ThemeSelector, hooks, utilities)
- `quickstart.md` - Developer guide for implementation

**Design Decisions**:
1. **Theme Structure**: Complete color palette per theme with TypeScript types
2. **State Management**: React Context with custom hook pattern
3. **Persistence**: localStorage with error handling and validation
4. **Seasonal Logic**: Client-side month checking (October for Halloween, December for Christmas)
5. **CSS Integration**: CSS custom properties with data attribute switching
6. **Component Architecture**: ThemeProvider wraps app, ThemeSelector in header, no changes to existing components needed

**Agent Context**: Updated with TypeScript, React, Tailwind CSS, localStorage technologies.

---

## Constitution Check (Post-Design) ✅

*Re-evaluated after Phase 1 design*

### I. Code Quality Standards ✅
- **Status**: Maintained
- **Design**: Clear separation of concerns (theme definitions, context, storage, seasonal logic)
- **Structure**: Well-organized module structure in `lib/theme/`

### II. Testing Standards ✅
- **Status**: Maintained
- **Design**: Comprehensive test coverage planned (unit, integration, contract tests)
- **Testability**: All utilities are pure functions, easy to test

### III. User Experience Consistency ✅
- **Status**: Maintained
- **Design**: CSS-based theming ensures consistent application across all components
- **Accessibility**: WCAG AA compliance built into design (pre-validated colors)

### IV. Performance Requirements ✅
- **Status**: Maintained
- **Design**: CSS variable approach enables < 1ms theme switching, no layout shifts
- **Bundle Impact**: < 5KB additional JavaScript, well within budget

### V. Code Review & Quality Gates ✅
- **Status**: Maintained
- **Design**: Standard PR process, all automated gates will pass

**GATE STATUS**: ✅ **PASS** - All constitution principles maintained through design phase.
