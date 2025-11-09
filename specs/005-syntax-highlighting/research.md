# Research: Syntax Highlighting for Code Blocks

**Feature**: Syntax Highlighting for Code Blocks  
**Date**: 2025-01-27  
**Status**: Complete

## Research Questions

1. Which well-used, well-known syntax highlighting library should be used?
2. How to integrate syntax highlighting with the existing `marked` markdown renderer?
3. How to ensure performance targets (100ms render time) are met?
4. How to preserve existing dark theme styling while adding syntax highlighting?
5. How to handle edge cases (missing language identifiers, special characters, long lines)?

## Technology Research

### Syntax Highlighting Library Options

#### Option 1: Prism.js

**Decision**: ✅ **SELECTED**

**Rationale**:
- Extremely popular and well-established (2M+ weekly downloads on npm)
- Lightweight core (~2KB minified + gzipped for core, ~15KB for common languages)
- Excellent browser compatibility
- Works seamlessly with `marked` via custom renderer
- Extensive language support (200+ languages)
- Active maintenance and large community
- Can be used standalone or with React wrapper
- Supports custom themes that can complement existing dark theme

**Integration Approach**:
- Use `prismjs` core library with language definitions
- Integrate with `marked` via custom `code` renderer
- Apply highlighting during HTML generation in `renderMarkdown()`
- Load only required language definitions to minimize bundle size

**Performance**:
- Fast highlighting algorithm
- Can be optimized by loading only needed languages
- Minimal runtime overhead

**Alternatives Considered**:
- Highlight.js: Similar popularity but slightly larger bundle size
- react-syntax-highlighter: React wrapper, but adds unnecessary React overhead for our use case (we render HTML strings)
- Shiki: Modern but less well-known, uses VS Code TextMate grammars (larger bundle)

**Package**: `prismjs` (core) + `@types/prismjs` (TypeScript types)

#### Option 2: Highlight.js

**Decision**: ❌ **REJECTED**

**Rationale**:
- Also very popular (1.5M+ weekly downloads)
- Slightly larger bundle size than Prism.js
- Good language support
- Less flexible theme customization compared to Prism.js

**Why Not Selected**:
- Prism.js has better performance characteristics for our use case
- Prism.js theme system is more flexible for matching our dark theme
- Prism.js has slightly better TypeScript support

### Integration with Marked

**Decision**: Custom `code` renderer in `marked` configuration

**Rationale**:
- `marked` supports custom renderers for code blocks
- Allows us to intercept code block rendering and apply syntax highlighting
- Preserves existing markdown processing pipeline
- Minimal changes to existing code structure

**Implementation Approach**:
1. Configure `marked` with custom `code` renderer
2. In renderer, check if language identifier exists
3. If language exists, use Prism.js to highlight code
4. Return highlighted HTML with appropriate CSS classes
5. If no language, return plain code block (existing behavior)

**Code Pattern**:
```typescript
marked.use({
  renderer: {
    code(code: string, language?: string): string {
      if (language && Prism.languages[language]) {
        return `<pre class="language-${language}"><code class="language-${language}">${Prism.highlight(code, Prism.languages[language], language)}</code></pre>`
      }
      return `<pre><code>${escapeHtml(code)}</code></pre>`
    }
  }
})
```

### Theme Integration

**Decision**: Custom Prism.js theme that complements existing dark theme

**Rationale**:
- Existing code blocks use dark background (#2d2d2d) with light text (#faf9f7)
- Prism.js themes can be customized via CSS
- Will create custom theme or adapt existing dark theme to match blog colors
- Syntax highlighting colors must be visible and readable on dark background

**Approach**:
- Use Prism.js CSS classes for syntax tokens
- Override Prism.js default theme colors to match blog's color scheme
- Ensure sufficient contrast for accessibility (WCAG AA)
- Test with multiple languages to ensure color consistency

### Performance Optimization

**Decision**: Lazy load language definitions, optimize bundle size

**Rationale**:
- Performance target: 100ms render time
- Must minimize bundle size impact
- Only load languages that are actually used in blog posts

**Approach**:
1. Import Prism.js core
2. Dynamically import only required language definitions (JavaScript, TypeScript, Python, Bash, JSON, Markdown, HTML, CSS, SQL)
3. Use tree-shaking to exclude unused languages
4. Consider code splitting if bundle size becomes an issue
5. Measure and monitor bundle size impact

**Bundle Size Estimate**:
- Prism.js core: ~2KB gzipped
- 8-10 language definitions: ~10-15KB gzipped
- CSS theme: ~2-3KB
- Total: ~15-20KB additional bundle size (acceptable)

### Edge Case Handling

**Decision**: Graceful fallback for all edge cases

**Rationale**:
- Must handle missing language identifiers
- Must handle invalid/unsupported languages
- Must handle special characters and HTML entities
- Must handle very long code blocks

**Approach**:
1. **Missing language**: Return plain code block (no highlighting)
2. **Invalid language**: Return plain code block (no highlighting)
3. **Special characters**: Prism.js handles HTML escaping automatically
4. **Long lines**: Existing CSS handles horizontal scrolling
5. **Long code blocks**: Prism.js handles efficiently, no special handling needed

## Dependencies

### New Dependencies

- `prismjs`: ^1.29.0 (syntax highlighting core)
- `@types/prismjs`: ^1.26.3 (TypeScript types)

### Existing Dependencies (No Changes)

- `marked`: ^17.0.0 (markdown rendering)
- `react`: ^18.2.0 (UI framework)
- `tailwindcss`: ^3.4.1 (styling)

## Implementation Notes

1. **Language Detection**: Use language identifier from markdown code fence (e.g., ```javascript)
2. **CSS Classes**: Prism.js adds `language-{lang}` classes automatically
3. **Theme CSS**: Import Prism.js theme CSS and override colors to match blog theme
4. **Testing**: Test with actual blog post content to verify highlighting works correctly
5. **Performance**: Measure render time before and after implementation

## Open Questions Resolved

✅ **Library Choice**: Prism.js selected for popularity, performance, and flexibility  
✅ **Integration Method**: Custom `marked` renderer for code blocks  
✅ **Theme Approach**: Custom CSS overrides to match existing dark theme  
✅ **Performance Strategy**: Lazy load languages, monitor bundle size  
✅ **Edge Cases**: Graceful fallbacks for all identified edge cases

## References

- Prism.js Documentation: https://prismjs.com/
- Marked Custom Renderers: https://marked.js.org/using_advanced#renderer
- Prism.js Language Support: https://prismjs.com/#supported-languages
- Prism.js Themes: https://github.com/PrismJS/prism-themes

