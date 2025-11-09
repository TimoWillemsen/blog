# Research: Multiple Theme Support

**Feature**: Multiple Theme Support  
**Date**: 2025-11-09  
**Status**: Complete

## Research Questions

1. What is the best approach for implementing CSS-based theming in React with Tailwind CSS?
2. How should theme state be managed in a React application (Context API vs other patterns)?
3. What are best practices for persisting theme preferences using localStorage?
4. How should seasonal theme availability be determined (client-side date vs server-side)?
5. How to ensure WCAG AA contrast compliance across all themes?
6. What UI/UX patterns work best for theme selector controls?

## Technology Research

### CSS-Based Theming Approach

**Decision**: ✅ **SELECTED** - CSS Custom Properties (CSS Variables) with data attributes

**Rationale**:
- **Performance**: CSS variables enable instant theme switching without JavaScript DOM manipulation
- **Compatibility**: Supported in all modern browsers (IE11+ with polyfill, but not needed for this project)
- **Maintainability**: Centralized color definitions, easy to add new themes
- **Tailwind Integration**: Can use CSS variables with Tailwind's arbitrary values or extend Tailwind config
- **No Layout Shifts**: CSS-only approach prevents Cumulative Layout Shift (CLS) issues
- **Accessibility**: Can use `prefers-color-scheme` media query as fallback

**Implementation Approach**:
- Define theme colors as CSS custom properties in `:root` or `[data-theme="..."]` selectors
- Use data attribute on document root (`<html>` or `<body>`) to switch themes: `data-theme="dark"`
- Update Tailwind config to use CSS variables for colors
- Apply theme class/data-attribute via React context

**Alternatives Considered**:
- **Tailwind Dark Mode Plugin**: Good for light/dark only, but doesn't support multiple themes easily
- **CSS-in-JS (styled-components, emotion)**: Adds runtime overhead, larger bundle size
- **Class-based switching**: Works but requires managing many classes, harder to maintain
- **Separate CSS files per theme**: Increases bundle size, harder to maintain consistency

**Code Pattern**:
```css
:root[data-theme="light"] {
  --color-bg: #faf9f7;
  --color-text: #2d2d2d;
  --color-accent: #8b7355;
}

:root[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #faf9f7;
  --color-accent: #d4a574;
}
```

### Theme State Management

**Decision**: ✅ **SELECTED** - React Context API with custom hook

**Rationale**:
- **Simplicity**: No external dependencies, built into React
- **Performance**: Theme changes are infrequent, Context API overhead is negligible
- **Scope**: Single feature (theming), doesn't require global state management
- **Pattern Consistency**: Project already uses React hooks (useState, useEffect) for state
- **Type Safety**: TypeScript provides excellent type safety for context values

**Implementation Approach**:
- Create `ThemeContext` with theme state and setter
- Create `ThemeProvider` component that wraps app and manages theme state
- Create `useTheme()` custom hook for consuming theme in components
- Provider handles localStorage persistence and seasonal theme availability

**Alternatives Considered**:
- **Zustand**: Lightweight but unnecessary for single feature
- **Redux**: Overkill for simple theme state
- **Local component state**: Would require prop drilling, breaks persistence requirement
- **URL-based state**: Not appropriate for theme preference (should persist across pages)

**Code Pattern**:
```typescript
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  // ... persistence logic
  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

### localStorage Persistence

**Decision**: ✅ **SELECTED** - localStorage with error handling and fallback

**Rationale**:
- **Persistence**: Survives browser sessions, works across tabs
- **Simplicity**: Native browser API, no dependencies
- **Performance**: Synchronous, no async overhead
- **Privacy**: Client-side only, no server communication needed
- **Fallback**: Graceful degradation to default theme if unavailable

**Implementation Approach**:
- Store theme preference as string in localStorage key: `'blog-theme'`
- Read on app initialization, apply immediately to prevent flash
- Handle errors gracefully (private browsing, storage disabled)
- Validate stored value before applying (handle invalid/corrupted data)
- Fallback to default 'light' theme if storage unavailable or invalid

**Alternatives Considered**:
- **sessionStorage**: Doesn't persist across sessions (violates requirement)
- **Cookies**: Overkill, adds server complexity, privacy concerns
- **IndexedDB**: Overkill for simple string value
- **Server-side storage**: Requires backend, adds complexity, not needed for single-user blog

**Code Pattern**:
```typescript
const STORAGE_KEY = 'blog-theme'

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch (error) {
    // Graceful fallback - theme still applies for current session
    console.warn('Failed to save theme preference:', error)
  }
}

export function loadTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isValidTheme(stored) ? stored : null
  } catch (error) {
    return null
  }
}
```

### Seasonal Theme Availability

**Decision**: ✅ **SELECTED** - Client-side date checking using JavaScript Date API

**Rationale**:
- **Simplicity**: No server dependency, works in static site
- **User Experience**: Uses user's local timezone (more intuitive)
- **Performance**: Instant, no network request
- **Reliability**: Works offline, no server availability concerns
- **Accuracy**: JavaScript Date handles timezone correctly

**Implementation Approach**:
- Check current month using `new Date().getMonth()` (0-indexed: 0=Jan, 9=Oct, 11=Dec)
- Halloween theme available in October (month === 9)
- Christmas theme available in December (month === 11)
- Filter available themes based on current month
- Handle edge case: user with incorrect system clock (acceptable trade-off for static site)

**Alternatives Considered**:
- **Server-side date**: Requires backend, adds complexity, not available in static site
- **UTC date**: Less intuitive for users in different timezones
- **Fixed date ranges**: Less flexible, harder to adjust
- **User preference**: Defeats purpose of seasonal themes

**Code Pattern**:
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
  
  return baseThemes
}
```

### WCAG AA Contrast Compliance

**Decision**: ✅ **SELECTED** - Pre-calculated color combinations with validation tool

**Rationale**:
- **Reliability**: Pre-validated colors ensure compliance before deployment
- **Performance**: No runtime validation overhead
- **Developer Experience**: Clear color definitions, easy to maintain
- **Accessibility**: Meets legal and ethical requirements

**Implementation Approach**:
- Use online contrast checker (WebAIM, Contrast Checker) to validate all color combinations
- Define theme colors with sufficient contrast ratios:
  - Normal text: 4.5:1 minimum
  - Large text (18pt+): 3:1 minimum
- Document contrast ratios in theme definitions
- Include contrast validation in development workflow (manual or automated)

**Tools**:
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Built-in contrast ratio display
- Automated: `@axe-core/react` for runtime validation (optional)

**Alternatives Considered**:
- **Runtime validation**: Adds overhead, colors should be validated at design time
- **CSS-only**: No way to programmatically validate without JavaScript
- **Manual testing**: Prone to errors, doesn't scale

### Theme Selector UI/UX

**Decision**: ✅ **SELECTED** - Dropdown/Select menu in header navigation

**Rationale**:
- **Discoverability**: Visible in header, easy to find
- **Accessibility**: Native select or accessible custom dropdown works with keyboard/screen readers
- **Space Efficiency**: Compact, doesn't clutter UI
- **Consistency**: Matches existing navigation pattern (About link in header)
- **Mobile Friendly**: Dropdown works well on small screens

**Implementation Approach**:
- Add theme selector to header navigation (next to "About" link)
- Use native `<select>` for simplicity and accessibility, or custom dropdown with ARIA attributes
- Show current theme selection
- Update immediately on selection (no confirmation needed)
- Visual indicator (icon) optional but helpful

**Alternatives Considered**:
- **Toggle switch**: Only works for light/dark, doesn't scale to multiple themes
- **Modal dialog**: Overkill, adds friction
- **Settings page**: Hidden, reduces discoverability
- **Floating button**: Can be intrusive, doesn't match design aesthetic

**Code Pattern**:
```tsx
<select 
  value={theme} 
  onChange={(e) => setTheme(e.target.value as Theme)}
  aria-label="Select theme"
>
  {availableThemes.map(t => (
    <option key={t} value={t}>{formatThemeName(t)}</option>
  ))}
</select>
```

## Architecture Decisions

### Theme Application Strategy

**Decision**: Apply theme via data attribute on document root

**Rationale**:
- **Performance**: CSS-only switching, no React re-renders needed
- **Simplicity**: Single attribute change affects entire app
- **Compatibility**: Works with existing Tailwind classes
- **SSR-friendly**: Can be applied before React hydration (prevents flash)

**Implementation**:
- Set `data-theme` attribute on `<html>` element
- Use CSS selectors: `[data-theme="dark"] { ... }`
- Update attribute when theme changes via `document.documentElement.setAttribute()`

### Color Definition Structure

**Decision**: Define complete color palette per theme in TypeScript, generate CSS variables

**Rationale**:
- **Type Safety**: TypeScript ensures all themes have required colors
- **Maintainability**: Single source of truth for colors
- **Validation**: Can validate contrast ratios programmatically
- **Extensibility**: Easy to add new themes

**Structure**:
```typescript
type ThemeColors = {
  background: string
  surface: string
  text: {
    primary: string
    secondary: string
  }
  accent: string
  border: string
  // ... all color tokens
}

const themes: Record<Theme, ThemeColors> = {
  light: { ... },
  dark: { ... },
  christmas: { ... },
  halloween: { ... }
}
```

## Performance Considerations

### Theme Switching Performance

**Strategy**: CSS variable updates are synchronous and instant (< 1ms)

**Optimization**:
- No JavaScript calculations during theme switch
- CSS variables update atomically
- No layout recalculation needed (colors only, no size changes)
- Apply theme before React render to prevent flash

### Bundle Size Impact

**Estimate**: < 5KB additional JavaScript, < 2KB additional CSS

**Breakdown**:
- Theme definitions: ~1KB
- Context/hooks: ~1KB
- Theme selector component: ~2KB
- CSS variables: ~1KB
- Total: ~5KB (well within bundle size budget)

## Open Questions Resolved

All research questions resolved. No remaining clarifications needed.

**Key Decisions Summary**:
1. CSS Custom Properties with data attributes for theming
2. React Context API for theme state management
3. localStorage for persistence with graceful fallback
4. Client-side date checking for seasonal themes
5. Pre-validated colors for WCAG compliance
6. Dropdown selector in header navigation

