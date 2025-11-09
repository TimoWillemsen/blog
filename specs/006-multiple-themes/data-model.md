# Data Model: Multiple Theme Support

**Date**: 2025-11-09  
**Feature**: Multiple Theme Support

## Entities

### Theme

Represents a visual theme configuration containing color definitions for all UI elements.

**Attributes**:
- `id` (string, required): Theme identifier - one of: `'light'`, `'dark'`, `'christmas'`, `'halloween'`
- `name` (string, required): Human-readable display name (e.g., "Light", "Dark", "Christmas", "Halloween")
- `colors` (ThemeColors, required): Complete color palette for the theme
- `isSeasonal` (boolean, required): Whether theme is seasonal (only available during specific months)
- `availableMonths` (number[], optional): Months when theme is available (0-indexed: 0=Jan, 9=Oct, 11=Dec). Only present if `isSeasonal` is true.

**Validation Rules**:
- Theme ID must be one of the valid theme identifiers
- All color values must be valid hex color codes (format: `#RRGGBB` or `#RRGGBBAA`)
- All required color tokens must be present in `colors` object
- Contrast ratios must meet WCAG AA requirements (validated at design time)

**State Transitions**:
- **Available → Unavailable**: Seasonal theme becomes unavailable when current month changes (e.g., Halloween in November)
- **Unavailable → Available**: Seasonal theme becomes available when current month matches `availableMonths`

### ThemeColors

Complete color palette for a theme, defining all UI element colors.

**Attributes**:
- `background` (string, required): Main page background color
- `surface` (string, required): Surface/container background color (e.g., cards, code blocks)
- `text` (TextColors, required): Text color definitions
- `accent` (string, required): Primary accent color (links, highlights)
- `border` (string, required): Border color
- `header` (HeaderColors, required): Header-specific colors
- `code` (CodeColors, required): Code block and syntax highlighting colors
- `tag` (TagColors, required): Tag component colors
- `hover` (HoverColors, required): Hover state colors

**Structure**:
```typescript
type ThemeColors = {
  background: string      // e.g., '#faf9f7' (light), '#1a1a1a' (dark)
  surface: string        // e.g., '#ffffff' (light), '#2d2d2d' (dark)
  text: {
    primary: string      // Main text color
    secondary: string    // Secondary/muted text color
  }
  accent: string          // Link and accent color
  border: string          // Border color
  header: {
    background: string    // Header background
    text: string          // Header text
    border: string       // Header border
  }
  code: {
    background: string    // Code block background
    text: string          // Code block text
    inline: {
      background: string // Inline code background
      text: string       // Inline code text
    }
  }
  tag: {
    background: string   // Tag background
    text: string         // Tag text
    hover: string        // Tag hover background
  }
  hover: {
    background: string   // Hover background (e.g., post cards)
    border: string      // Hover border color
  }
}
```

### ThemePreference

Represents a user's stored theme selection in browser storage.

**Attributes**:
- `theme` (string, required): Theme identifier (must be valid Theme ID)
- `timestamp` (number, optional): Unix timestamp of when preference was saved (for debugging/analytics)

**Storage Format**:
- Stored in localStorage as JSON string
- Key: `'blog-theme'`
- Value: Theme ID string (simple format) or JSON object with timestamp (extended format)

**Validation Rules**:
- Theme ID must be valid (one of: 'light', 'dark', 'christmas', 'halloween')
- If stored theme is seasonal and no longer available, system falls back to last non-seasonal theme or 'light'

**State Transitions**:
- **Set**: User selects new theme → preference saved to localStorage
- **Load**: App initialization → preference loaded from localStorage
- **Invalidate**: Stored theme is invalid/corrupted → fallback to 'light'
- **Expire**: Seasonal theme selected, season ends → fallback to non-seasonal theme

### AvailableThemes

Represents the list of themes currently available to the user based on current date.

**Attributes**:
- `themes` (Theme[], required): Array of available theme objects
- `currentMonth` (number, required): Current month (0-indexed: 0=Jan, 11=Dec)
- `hasSeasonal` (boolean, required): Whether any seasonal themes are currently available

**Derivation**:
- Base themes (light, dark) are always available
- Seasonal themes added based on current month:
  - Halloween: Available in October (month === 9)
  - Christmas: Available in December (month === 11)

**Validation Rules**:
- Always includes at least 'light' and 'dark' themes
- Seasonal themes only included if current month matches their availability period

## Relationships

- **Theme → ThemeColors**: One-to-one (each theme has exactly one color palette)
- **ThemePreference → Theme**: References theme by ID (may reference unavailable seasonal theme)
- **AvailableThemes → Theme**: Contains array of available themes based on date

## Data Flow

1. **App Initialization**:
   - Load `ThemePreference` from localStorage
   - Determine `AvailableThemes` based on current date
   - Validate stored theme is available
   - Apply theme (fallback to 'light' if invalid/unavailable)

2. **Theme Selection**:
   - User selects theme from `AvailableThemes`
   - Create/update `ThemePreference` with selected theme
   - Save to localStorage
   - Apply theme to document (set data attribute)

3. **Seasonal Theme Expiration**:
   - User has seasonal theme selected
   - Month changes, theme no longer available
   - System detects unavailable theme
   - Fallback to last non-seasonal theme or 'light'
   - Update `ThemePreference` with fallback theme

## Edge Cases

- **Invalid localStorage data**: Corrupted or invalid theme ID → fallback to 'light'
- **localStorage unavailable**: Private browsing, storage disabled → use default 'light', no persistence
- **Seasonal theme selected, season ends**: Halloween selected in October, user visits in November → fallback to 'light' or last non-seasonal preference
- **System clock incorrect**: User's device has wrong date → seasonal themes may appear/disappear incorrectly (acceptable trade-off for static site)
- **Timezone differences**: User travels across timezones → uses local date (acceptable behavior)

