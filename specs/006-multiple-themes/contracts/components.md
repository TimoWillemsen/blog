# Component Contracts: Multiple Theme Support

**Date**: 2025-11-09  
**Feature**: Multiple Theme Support

## ThemeProvider Component

**Purpose**: Provides theme context to the application, manages theme state and persistence.

**Props**: None (wraps children)

**Context Value**:
```typescript
interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  availableThemes: Theme[]
  isThemeAvailable: (theme: Theme) => boolean
}
```

**Behavior**:
- Initializes theme from localStorage on mount
- Applies theme to document root via data attribute
- Persists theme changes to localStorage
- Filters available themes based on current date (seasonal themes)
- Handles localStorage errors gracefully (fallback to default)

**Dependencies**:
- `lib/theme/storage.ts` - localStorage utilities
- `lib/theme/seasonal.ts` - seasonal theme availability
- `lib/theme/themes.ts` - theme definitions

**Usage**:
```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

## ThemeSelector Component

**Purpose**: UI control for selecting and switching themes.

**Props**:
```typescript
interface ThemeSelectorProps {
  className?: string
  'aria-label'?: string
}
```

**Behavior**:
- Displays dropdown/select with available themes
- Shows current theme selection
- Updates theme immediately on selection
- Accessible (keyboard navigation, screen reader support)
- Responsive (works on mobile and desktop)

**Dependencies**:
- `useTheme()` hook from ThemeContext
- `lib/theme/types.ts` - Theme type definitions

**Usage**:
```tsx
<ThemeSelector aria-label="Select theme" />
```

## useTheme Hook

**Purpose**: Custom hook for consuming theme context in components.

**Returns**:
```typescript
interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  availableThemes: Theme[]
  isThemeAvailable: (theme: Theme) => boolean
}
```

**Behavior**:
- Throws error if used outside ThemeProvider
- Provides read-only access to current theme
- Provides function to change theme
- Provides list of available themes
- Provides helper to check if specific theme is available

**Usage**:
```tsx
function MyComponent() {
  const { theme, setTheme, availableThemes } = useTheme()
  // ...
}
```

## Theme Storage Utilities

**Module**: `lib/theme/storage.ts`

**Exports**:
```typescript
// Save theme preference to localStorage
function saveTheme(theme: Theme): void

// Load theme preference from localStorage
function loadTheme(): Theme | null

// Check if localStorage is available
function isStorageAvailable(): boolean

// Validate theme ID
function isValidTheme(value: unknown): value is Theme
```

**Behavior**:
- `saveTheme`: Saves theme to localStorage, handles errors gracefully
- `loadTheme`: Loads theme from localStorage, returns null if unavailable/invalid
- `isStorageAvailable`: Checks if localStorage is accessible
- `isValidTheme`: Type guard to validate theme ID

**Error Handling**:
- All functions handle localStorage errors (private browsing, quota exceeded)
- Return null/undefined on error rather than throwing
- Log warnings to console for debugging

## Seasonal Theme Utilities

**Module**: `lib/theme/seasonal.ts`

**Exports**:
```typescript
// Get list of available themes based on current date
function getAvailableThemes(): Theme[]

// Check if a theme is currently available
function isThemeAvailable(theme: Theme): boolean

// Get current month (0-indexed)
function getCurrentMonth(): number
```

**Behavior**:
- `getAvailableThemes`: Returns base themes (light, dark) plus seasonal themes if applicable
- `isThemeAvailable`: Checks if specific theme is available based on current month
- `getCurrentMonth`: Returns current month using JavaScript Date API

**Seasonal Rules**:
- Halloween: Available in October (month === 9)
- Christmas: Available in December (month === 11)
- Base themes (light, dark): Always available

## Theme Definitions

**Module**: `lib/theme/themes.ts`

**Exports**:
```typescript
// Theme type
type Theme = 'light' | 'dark' | 'christmas' | 'halloween'

// Theme colors type
type ThemeColors = { ... }

// Get colors for a theme
function getThemeColors(theme: Theme): ThemeColors

// Get all theme definitions
function getAllThemes(): Record<Theme, ThemeColors>

// Apply theme to document
function applyTheme(theme: Theme): void
```

**Behavior**:
- `getThemeColors`: Returns color palette for specified theme
- `getAllThemes`: Returns all theme definitions
- `applyTheme`: Sets data attribute on document root to apply theme

**Theme Structure**:
- Each theme has complete color palette
- Colors defined as hex strings
- All themes have same structure (all required color tokens present)

## Type Definitions

**Module**: `lib/theme/types.ts`

**Exports**:
```typescript
// Theme identifier
type Theme = 'light' | 'dark' | 'christmas' | 'halloween'

// Theme colors structure
interface ThemeColors {
  background: string
  surface: string
  text: {
    primary: string
    secondary: string
  }
  accent: string
  border: string
  header: {
    background: string
    text: string
    border: string
  }
  code: {
    background: string
    text: string
    inline: {
      background: string
      text: string
    }
  }
  tag: {
    background: string
    text: string
    hover: string
  }
  hover: {
    background: string
    border: string
  }
}
```

## Integration Points

### Layout Component

**Changes Required**:
- Wrap children with `ThemeProvider`
- Add `ThemeSelector` to header navigation
- Use theme-aware CSS classes (via data attribute)

**Contract**:
```tsx
<Layout>
  <ThemeProvider>
    <header>
      {/* existing header content */}
      <ThemeSelector />
    </header>
    <main>{children}</main>
  </ThemeProvider>
</Layout>
```

### Existing Components

**No Changes Required** (theming applied via CSS):
- Components continue using existing Tailwind classes
- CSS variables automatically apply based on `data-theme` attribute
- No component code changes needed

**Optional Enhancement**:
- Components can use `useTheme()` hook for theme-aware logic if needed
- Not required for basic theming (CSS handles visual changes)

## Testing Contracts

### ThemeProvider Tests

**Must Verify**:
- Initializes with theme from localStorage
- Falls back to 'light' if localStorage unavailable
- Applies theme to document on mount
- Updates document when theme changes
- Persists theme to localStorage on change
- Filters available themes based on date

### ThemeSelector Tests

**Must Verify**:
- Renders available themes in dropdown
- Shows current theme as selected
- Updates theme on selection
- Accessible (keyboard, screen reader)
- Handles theme unavailability gracefully

### Storage Utilities Tests

**Must Verify**:
- Saves theme to localStorage
- Loads theme from localStorage
- Returns null for invalid data
- Handles localStorage errors gracefully
- Validates theme IDs correctly

### Seasonal Utilities Tests

**Must Verify**:
- Returns base themes always
- Includes Halloween in October
- Includes Christmas in December
- Excludes seasonal themes outside their months
- Handles month boundaries correctly

