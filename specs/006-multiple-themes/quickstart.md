# Quickstart: Multiple Theme Support

**Feature**: Multiple Theme Support  
**Date**: 2025-11-09

## Overview

This feature adds support for multiple themes (light, dark, Christmas, Halloween) to the blog application. Users can switch themes via a selector in the header, and their preference is persisted across sessions. Seasonal themes automatically appear during their respective months.

## Architecture

### Theme System Components

1. **Theme Definitions** (`lib/theme/themes.ts`): Color palettes for each theme
2. **Theme Context** (`lib/theme/context.tsx`): React context for theme state
3. **Theme Storage** (`lib/theme/storage.ts`): localStorage persistence utilities
4. **Seasonal Logic** (`lib/theme/seasonal.ts`): Date-based theme availability
5. **Theme Selector** (`components/layout/ThemeSelector.tsx`): UI control for theme selection
6. **CSS Variables** (`index.css`): CSS custom properties for theme colors

### How It Works

1. **Theme Application**: Themes are applied via `data-theme` attribute on `<html>` element
2. **CSS Variables**: Each theme defines CSS custom properties that components use
3. **State Management**: React Context provides theme state to all components
4. **Persistence**: Theme preference saved to localStorage, loaded on app initialization
5. **Seasonal Themes**: Availability determined by current month (client-side date check)

## Key Files

```
src/
├── lib/theme/
│   ├── types.ts          # TypeScript type definitions
│   ├── themes.ts         # Theme color definitions
│   ├── context.tsx       # ThemeProvider and useTheme hook
│   ├── storage.ts        # localStorage utilities
│   └── seasonal.ts       # Seasonal theme availability
├── components/layout/
│   └── ThemeSelector.tsx # Theme selector UI component
└── index.css             # CSS variables for theming
```

## Usage

### Using Theme in Components

Most components don't need changes - CSS variables automatically apply based on the `data-theme` attribute. However, if you need theme-aware logic:

```tsx
import { useTheme } from '@/lib/theme/context'

function MyComponent() {
  const { theme, setTheme, availableThemes } = useTheme()
  
  // Access current theme
  console.log('Current theme:', theme)
  
  // Check if theme is available
  const isDarkAvailable = availableThemes.includes('dark')
  
  // Change theme programmatically (usually not needed)
  // setTheme('dark')
}
```

### Adding ThemeProvider

Wrap your app with `ThemeProvider`:

```tsx
// App.tsx or main.tsx
import { ThemeProvider } from '@/lib/theme/context'

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  )
}
```

### Adding ThemeSelector

Add theme selector to header:

```tsx
// Layout.tsx
import { ThemeSelector } from '@/components/layout/ThemeSelector'

function Layout() {
  return (
    <header>
      {/* existing header content */}
      <ThemeSelector aria-label="Select theme" />
    </header>
  )
}
```

## Theme Definitions

### Adding a New Theme

1. **Define Colors** in `lib/theme/themes.ts`:
```typescript
const themes: Record<Theme, ThemeColors> = {
  // ... existing themes
  newTheme: {
    background: '#ffffff',
    surface: '#f5f5f5',
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    // ... all required color tokens
  }
}
```

2. **Add CSS Variables** in `index.css`:
```css
:root[data-theme="newTheme"] {
  --color-bg: #ffffff;
  --color-text: #000000;
  /* ... all CSS variables */
}
```

3. **Update Type** in `lib/theme/types.ts`:
```typescript
type Theme = 'light' | 'dark' | 'christmas' | 'halloween' | 'newTheme'
```

4. **Test Contrast**: Validate all color combinations meet WCAG AA requirements

### Making a Theme Seasonal

1. **Update Seasonal Logic** in `lib/theme/seasonal.ts`:
```typescript
export function getAvailableThemes(): Theme[] {
  const month = new Date().getMonth()
  const baseThemes: Theme[] = ['light', 'dark']
  
  if (month === 9) { // October
    return [...baseThemes, 'halloween']
  }
  if (month === 11) { // December
    return [...baseThemes, 'christmas']
  }
  if (month === 2) { // March - example
    return [...baseThemes, 'newSeasonalTheme']
  }
  
  return baseThemes
}
```

## CSS Integration

### Using Theme Colors in CSS

Themes use CSS custom properties (variables). Components can reference them:

```css
.my-component {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
```

### Tailwind Integration

Update `tailwind.config.js` to use CSS variables:

```js
export default {
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        // ... other color tokens
      }
    }
  }
}
```

Then use in components:
```tsx
<div className="bg-bg text-text-primary">
  Content
</div>
```

## Testing

### Unit Tests

Test theme utilities:
```typescript
// tests/unit/theme/storage.test.ts
import { saveTheme, loadTheme } from '@/lib/theme/storage'

test('saves and loads theme', () => {
  saveTheme('dark')
  expect(loadTheme()).toBe('dark')
})
```

### Integration Tests

Test theme switching flow:
```typescript
// tests/integration/theme-switching.test.tsx
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/lib/theme/context'

test('user can switch themes', async () => {
  render(
    <ThemeProvider>
      <ThemeSelector />
    </ThemeProvider>
  )
  
  const selector = screen.getByLabelText('Select theme')
  await userEvent.selectOptions(selector, 'dark')
  
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
})
```

## Common Tasks

### Debugging Theme Issues

1. **Check current theme**:
```tsx
const { theme } = useTheme()
console.log('Current theme:', theme)
```

2. **Check available themes**:
```tsx
const { availableThemes } = useTheme()
console.log('Available themes:', availableThemes)
```

3. **Check localStorage**:
```javascript
// Browser console
localStorage.getItem('blog-theme')
```

4. **Check CSS variables**:
```javascript
// Browser console
getComputedStyle(document.documentElement).getPropertyValue('--color-bg')
```

### Handling Theme Errors

If theme doesn't apply:
1. Check `data-theme` attribute on `<html>` element
2. Verify CSS variables are defined in `index.css`
3. Check browser console for errors
4. Verify localStorage is available (private browsing may disable it)

### Performance Considerations

- Theme switching is instant (< 1ms) - CSS variables update synchronously
- No React re-renders needed for theme changes (CSS-only)
- localStorage operations are synchronous and fast
- Seasonal theme checking is O(1) operation

## Next Steps

1. **Implementation**: Follow TDD approach - write tests first
2. **Color Selection**: Choose colors that meet WCAG AA contrast requirements
3. **Testing**: Test all themes across all pages and components
4. **Accessibility**: Verify keyboard navigation and screen reader support
5. **Documentation**: Update component documentation with theme usage

## References

- [Specification](./spec.md) - Full feature specification
- [Data Model](./data-model.md) - Data structures and relationships
- [Component Contracts](./contracts/components.md) - API contracts
- [Research](./research.md) - Technology decisions and rationale

