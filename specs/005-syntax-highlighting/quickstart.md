# Quickstart: Syntax Highlighting for Code Blocks

**Feature**: Syntax Highlighting for Code Blocks  
**Date**: 2025-01-27

## Overview

This feature adds syntax highlighting to code blocks in markdown blog posts using Prism.js. Code blocks with language identifiers (e.g., ```javascript) are automatically highlighted with color-coded syntax elements.

## Quick Start

### For Developers

1. **Install Dependencies**:
   ```bash
   npm install prismjs @types/prismjs
   ```

2. **Import Prism.js**:
   ```typescript
   import Prism from 'prismjs';
   import 'prismjs/components/prism-javascript';
   import 'prismjs/components/prism-typescript';
   // ... import other required languages
   ```

3. **Configure Marked Renderer**:
   ```typescript
   import { marked } from 'marked';
   import { highlightCode } from './lib/markdown/highlighter';

   marked.use({
     renderer: {
       code: (code: string, language?: string) => {
         return highlightCode(code, language);
       }
     }
   });
   ```

4. **Add Prism.js CSS**:
   ```typescript
   import 'prismjs/themes/prism-dark.css'; // or custom theme
   ```

### For Content Authors

**Using Syntax Highlighting in Blog Posts**:

Simply add a language identifier to your code fences:

````markdown
```javascript
function hello() {
  console.log('Hello, world!');
}
```

```python
def hello():
    print('Hello, world!')
```

```bash
echo "Hello, world!"
```
````

**Supported Languages**:
- JavaScript (`javascript` or `js`)
- TypeScript (`typescript` or `ts`)
- Python (`python` or `py`)
- Bash (`bash` or `sh` or `shell`)
- JSON (`json`)
- Markdown (`markdown` or `md`)
- HTML (`html`)
- CSS (`css`)
- SQL (`sql`)

**Code Blocks Without Language**:

Code blocks without language identifiers render without syntax highlighting:

````markdown
```
This code block has no syntax highlighting
```
````

## Architecture

### Component Flow

```
Markdown Source
    ↓
marked.parse() (with custom code renderer)
    ↓
SyntaxHighlighter.highlight() (if language provided)
    ↓
Prism.js highlighting
    ↓
HTML with syntax classes
    ↓
MarkdownRenderer component
    ↓
Rendered in browser
```

### Key Files

- `src/lib/markdown/highlighter.ts` - Syntax highlighting logic
- `src/lib/markdown/renderer.ts` - Markdown to HTML conversion (updated)
- `src/components/post/MarkdownRenderer.tsx` - React component (no changes needed)
- `src/index.css` - Prism.js theme CSS overrides

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run syntax highlighting tests specifically
npm test highlighter

# Run with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: `tests/unit/markdown/highlighter.test.ts`
  - Tests syntax highlighting logic
  - Tests language detection
  - Tests edge cases

- **Integration Tests**: `tests/integration/post-detail.test.tsx`
  - Tests full rendering pipeline
  - Tests with actual blog post content

- **Contract Tests**: `tests/contract/components/MarkdownRenderer.test.tsx`
  - Tests component behavior
  - Tests accessibility

## Development Workflow

### Adding a New Language

1. Install Prism.js language component:
   ```bash
   npm install prismjs
   ```

2. Import language in `src/lib/markdown/highlighter.ts`:
   ```typescript
   import 'prismjs/components/prism-{language}';
   ```

3. Add language to supported languages list
4. Test with sample code block
5. Update documentation

### Customizing Theme

1. Import Prism.js theme CSS
2. Override colors in `src/index.css`:
   ```css
   .language-javascript .token.keyword {
     color: #your-color;
   }
   ```
3. Ensure WCAG AA contrast compliance
4. Test with multiple languages

## Troubleshooting

### Code Blocks Not Highlighting

1. Check language identifier is correct and supported
2. Verify Prism.js language component is imported
3. Check browser console for errors
4. Verify CSS is loaded

### Performance Issues

1. Check bundle size - ensure only required languages are imported
2. Measure render time - should be < 100ms
3. Consider lazy loading languages if needed

### Styling Issues

1. Verify Prism.js CSS is imported
2. Check CSS specificity - Prism.js classes may need `!important`
3. Ensure theme colors complement dark background
4. Test contrast ratios for accessibility

## Performance Considerations

- **Bundle Size**: Only import required language definitions
- **Render Time**: Target < 100ms for code block highlighting
- **Lazy Loading**: Consider lazy loading languages if bundle size becomes an issue
- **Caching**: Prism.js highlighting is deterministic - can be cached if needed

## Accessibility

- Syntax highlighting colors must meet WCAG AA contrast requirements
- Code blocks must maintain proper semantic HTML structure
- Screen readers should still be able to read code content
- Keyboard navigation must work with code blocks

## Related Documentation

- [Specification](./spec.md) - Full feature specification
- [Research](./research.md) - Technology decisions and rationale
- [Data Model](./data-model.md) - Data structures and flow
- [Component Contracts](./contracts/components.md) - Detailed component interfaces

