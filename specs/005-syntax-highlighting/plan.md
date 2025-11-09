# Implementation Plan: Syntax Highlighting for Code Blocks

**Branch**: `005-syntax-highlighting` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-syntax-highlighting/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add syntax highlighting to code blocks in markdown blog posts using a well-established, widely-used syntax highlighting library. The implementation will integrate with the existing `marked` markdown renderer to apply syntax highlighting during HTML generation, preserving the current dark theme styling while adding color-coded syntax elements for improved code readability.

## Technical Context

**Language/Version**: TypeScript 5.2.2, React 18.2.0  
**Primary Dependencies**: marked (^17.0.0), prismjs (^1.29.0), @types/prismjs (^1.26.3)  
**Storage**: N/A (client-side rendering only)  
**Testing**: Vitest 1.0.4, @testing-library/react 16.3.0  
**Target Platform**: Modern web browsers (client-side React application)  
**Project Type**: Web application (single-page React app)  
**Performance Goals**: Code blocks render within 100ms of page load, no noticeable performance degradation  
**Constraints**: Must preserve existing dark theme (#2d2d2d background, #faf9f7 text), must work with existing Tailwind CSS, must not break existing code block styling, must handle edge cases (special characters, long lines, missing language identifiers)  
**Scale/Scope**: All blog posts with code blocks, supporting 8+ common programming languages (JavaScript, TypeScript, Python, Bash, JSON, Markdown, HTML, CSS)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Check

### I. Code Quality Standards
✅ **PASS**: Implementation will follow existing code patterns in markdown rendering module. Syntax highlighting integration will be cleanly abstracted with clear responsibilities. Code will be documented and pass linting checks.

### II. Testing Standards (NON-NEGOTIABLE)
✅ **PASS**: TDD will be enforced. Tests will be written first for:
- Syntax highlighting application to code blocks with language identifiers
- Handling of code blocks without language identifiers
- Edge cases (special characters, long lines, invalid languages)
- Performance verification (render time < 100ms)
- Visual consistency across posts

### III. User Experience Consistency
✅ **PASS**: Feature maintains existing code block styling (dark theme, padding, rounded corners) while adding syntax highlighting. No changes to user interaction patterns. Accessibility features preserved.

### IV. Performance Requirements
⚠️ **CONDITIONAL PASS**: Performance target is 100ms render time for code blocks. Implementation must:
- Use efficient syntax highlighting library (lightweight, fast)
- Avoid blocking initial page render
- Consider lazy loading or code splitting if library is large
- Monitor bundle size impact (must stay within existing budgets)

### V. Code Review & Quality Gates
✅ **PASS**: Standard code review process applies. All tests must pass, linting must pass, performance impact must be verified.

**Pre-Phase 0 Gate Status**: ✅ **PASS** (with performance monitoring requirement)

---

### Post-Phase 1 Check (After Design)

### I. Code Quality Standards
✅ **PASS**: Design includes clean abstraction (`highlighter.ts` module) with clear responsibilities. Integration pattern (custom marked renderer) follows existing code patterns. Contracts define clear interfaces.

### II. Testing Standards (NON-NEGOTIABLE)
✅ **PASS**: Test structure defined in contracts:
- Unit tests for `SyntaxHighlighter` module
- Integration tests for full rendering pipeline
- Contract tests for component behavior
- Performance tests (50ms target for highlighting, 100ms for full render)
- Edge case coverage defined

### III. User Experience Consistency
✅ **PASS**: Design preserves existing code block styling. Custom Prism.js theme will complement dark theme. No changes to user interaction. Accessibility requirements defined in contracts.

### IV. Performance Requirements
✅ **PASS**: Research confirms Prism.js meets performance targets:
- Core library: ~2KB gzipped
- Language definitions: ~10-15KB for 8-10 languages
- Total bundle impact: ~15-20KB (acceptable)
- Highlighting algorithm is fast (< 50ms for typical blocks)
- Lazy loading strategy defined for languages

### V. Code Review & Quality Gates
✅ **PASS**: All quality gates remain applicable. Contracts define clear acceptance criteria.

**Post-Phase 1 Gate Status**: ✅ **PASS** - All constitution requirements met with design

## Project Structure

### Documentation (this feature)

```text
specs/005-syntax-highlighting/
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
│   └── markdown/
│       ├── renderer.ts          # Existing: markdown to HTML conversion
│       ├── parser.ts            # Existing: markdown parsing utilities
│       ├── frontmatter.ts       # Existing: frontmatter extraction
│       ├── sanitizer.ts         # Existing: HTML sanitization
│       └── highlighter.ts       # NEW: Syntax highlighting integration
├── components/
│   └── post/
│       └── MarkdownRenderer.tsx # Existing: React component for rendering markdown HTML
└── content/
    └── posts/
        └── *.md                 # Existing: Markdown blog post files

tests/
├── unit/
│   └── markdown/
│       ├── parser.test.ts       # Existing
│       └── highlighter.test.ts  # NEW: Syntax highlighting unit tests
├── integration/
│   └── post-detail.test.tsx     # Existing: May need updates for syntax highlighting
└── contract/
    └── components/
        └── MarkdownRenderer.test.tsx  # Existing: May need updates
```

**Structure Decision**: Single React web application. Syntax highlighting will be integrated into the existing markdown rendering pipeline:
- New `highlighter.ts` module in `src/lib/markdown/` will handle syntax highlighting logic
- Integration with `marked` library via custom renderer for code blocks
- Existing `MarkdownRenderer.tsx` component will continue to render the HTML output
- Tests will be added to `tests/unit/markdown/` following existing test patterns

## Phase Completion Status

### Phase 0: Research ✅ COMPLETE

**Output**: [research.md](./research.md)

**Key Decisions**:
- Selected Prism.js as syntax highlighting library (well-used, performant, flexible)
- Integration via custom `marked` renderer for code blocks
- Custom theme to complement existing dark theme
- Lazy loading strategy for language definitions

**All NEEDS CLARIFICATION resolved**: ✅ Yes

### Phase 1: Design & Contracts ✅ COMPLETE

**Outputs**:
- [data-model.md](./data-model.md) - Data structures and flow
- [contracts/components.md](./contracts/components.md) - Component interfaces and behavior
- [quickstart.md](./quickstart.md) - Developer and content author guides

**Design Artifacts**:
- SyntaxHighlighter module interface defined
- Marked code renderer integration pattern specified
- CSS theme integration approach documented
- Test structure and requirements defined

**Constitution Check**: ✅ PASS (re-validated after design)

### Phase 2: Task Generation

**Status**: ⏳ Pending (will be generated by `/speckit.tasks` command)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitution requirements are met.
