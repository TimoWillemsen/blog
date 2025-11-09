# Component Contracts: Syntax Highlighting for Code Blocks

**Date**: 2025-01-27  
**Feature**: Syntax Highlighting for Code Blocks

## Component Interface Contracts

### SyntaxHighlighter Module

**Purpose**: Apply syntax highlighting to code blocks using Prism.js.

**Interface**:
```typescript
interface SyntaxHighlighter {
  /**
   * Highlight code with syntax highlighting if language is supported
   * @param code - Raw code content
   * @param language - Optional language identifier (e.g., "javascript", "python")
   * @returns Highlighted HTML string with Prism.js classes, or plain HTML if language not supported
   */
  highlight(code: string, language?: string): string;

  /**
   * Check if a language is supported by Prism.js
   * @param language - Language identifier
   * @returns true if language is supported, false otherwise
   */
  isLanguageSupported(language: string): boolean;

  /**
   * Initialize Prism.js with required language definitions
   * Should be called once during application startup
   */
  initialize(): void;
}
```

**Behavior Contract**:
- MUST return highlighted HTML when language is supported and valid
- MUST return plain HTML (no highlighting) when language is missing or unsupported
- MUST properly escape HTML entities in code content
- MUST add Prism.js CSS classes (`language-{lang}`) to highlighted code blocks
- MUST preserve code content exactly (no data loss)
- MUST handle special characters and edge cases gracefully
- MUST not throw errors - always return valid HTML (fallback on error)
- MUST log warnings in development mode if highlighting fails

**Performance Requirements**:
- MUST complete highlighting within 50ms for typical code blocks (< 100 lines)
- MUST not block main thread during highlighting
- MUST support code blocks up to 1000 lines without performance degradation

**Error Handling**:
- Invalid language: Return plain HTML, no error thrown
- Highlighting failure: Return plain HTML, log warning in development
- Empty code: Return empty HTML string
- Null/undefined code: Return empty HTML string

### MarkdownRenderer Component (Updated)

**Purpose**: Safely render markdown content as HTML with syntax highlighting support.

**Props Interface**:
```typescript
interface MarkdownRendererProps {
  content: string; // HTML content (already processed by renderMarkdown with syntax highlighting)
  className?: string;
}
```

**Behavior Contract**:
- MUST render HTML content safely using `dangerouslySetInnerHTML`
- MUST preserve existing prose styling classes
- MUST display code blocks with syntax highlighting (if applied during markdown rendering)
- MUST maintain accessibility features
- MUST handle empty content gracefully

**Changes from Previous Contract**:
- No interface changes - component receives pre-highlighted HTML
- Code blocks now include Prism.js CSS classes and highlighted syntax
- Visual appearance enhanced with syntax highlighting colors

**Accessibility Requirements**:
- MUST preserve existing accessibility features
- Code blocks MUST have proper semantic HTML structure
- Syntax highlighting colors MUST meet WCAG AA contrast requirements

### Marked Code Renderer Integration

**Purpose**: Custom renderer for code blocks in marked markdown processor.

**Interface**:
```typescript
interface MarkedCodeRenderer {
  /**
   * Render a code block with optional syntax highlighting
   * @param code - Raw code content
   * @param language - Optional language identifier from markdown code fence
   * @returns HTML string for the code block
   */
  (code: string, language?: string): string;
}
```

**Behavior Contract**:
- MUST be registered as custom renderer in marked configuration
- MUST call SyntaxHighlighter.highlight() for code blocks with language identifiers
- MUST return plain code block HTML for code blocks without language identifiers
- MUST preserve existing code block structure (`<pre><code>`)
- MUST add appropriate CSS classes for Prism.js styling
- MUST handle language identifier normalization (case-insensitive)

**Integration Pattern**:
```typescript
marked.use({
  renderer: {
    code: (code: string, language?: string): string => {
      return syntaxHighlighter.highlight(code, language);
    }
  }
});
```

## Function Contracts

### renderMarkdown Function (Updated)

**Purpose**: Convert markdown to HTML with syntax highlighting applied to code blocks.

**Signature**:
```typescript
function renderMarkdown(markdown: string): string
```

**Behavior Contract**:
- MUST process markdown content using marked library
- MUST apply syntax highlighting to code blocks during rendering
- MUST preserve all existing markdown rendering behavior
- MUST return valid HTML string
- MUST handle errors gracefully (return original markdown or error message)

**Changes from Previous Contract**:
- Now includes syntax highlighting for code blocks
- Code blocks with language identifiers are highlighted
- Code blocks without language identifiers render as before

## Data Contracts

### Code Block HTML Structure

**Highlighted Code Block**:
```html
<pre class="language-{lang}"><code class="language-{lang}">
  <!-- Prism.js highlighted content with <span> tags for syntax tokens -->
</code></pre>
```

**Unhighlighted Code Block**:
```html
<pre><code>
  <!-- Plain escaped HTML content -->
</code></pre>
```

**Contract Requirements**:
- MUST use `<pre><code>` structure for all code blocks
- MUST include `language-{lang}` classes when highlighting is applied
- MUST escape HTML entities in code content
- MUST preserve whitespace and line breaks

## CSS Contract

### Prism.js Theme Integration

**Purpose**: Customize Prism.js theme to match blog's dark theme.

**Requirements**:
- MUST complement existing code block styling (dark background #2d2d2d, light text #faf9f7)
- MUST provide sufficient color contrast for all syntax tokens (WCAG AA minimum)
- MUST be consistent across all supported languages
- MUST not override existing prose styling for other elements

**CSS Classes**:
- `.language-{lang}`: Applied to code blocks with language identifier
- Prism.js token classes (`.token.keyword`, `.token.string`, etc.): Applied by Prism.js during highlighting

## Testing Contracts

### Unit Test Requirements

**SyntaxHighlighter Tests**:
- MUST test highlighting with supported languages
- MUST test fallback behavior for unsupported languages
- MUST test edge cases (empty code, special characters, long lines)
- MUST test error handling (invalid input, highlighting failures)
- MUST verify performance (highlighting completes within 50ms)

**MarkdownRenderer Tests**:
- MUST test rendering of highlighted code blocks
- MUST test rendering of unhighlighted code blocks
- MUST test accessibility features are preserved

**Integration Tests**:
- MUST test full markdown-to-HTML pipeline with syntax highlighting
- MUST test with actual blog post content
- MUST verify visual consistency across posts

## Notes

- All contracts maintain backward compatibility with existing markdown rendering
- Syntax highlighting is additive - existing functionality is preserved
- Performance is critical - highlighting must not degrade user experience
- Accessibility must be maintained - syntax highlighting colors must meet contrast requirements

