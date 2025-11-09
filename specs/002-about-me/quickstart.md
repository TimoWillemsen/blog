# Quickstart Guide: About Me Page

**Date**: 2025-01-27  
**Feature**: About Me Page

## Prerequisites

- Existing blog application (from feature 001-blog-app)
- Node.js 18+ and npm/yarn/pnpm
- Code editor (VS Code recommended)

## Implementation Steps

### 1. Create About Page Content File

Create the markdown file for the about page:

```bash
mkdir -p src/content
touch src/content/about.md
```

Add content to `src/content/about.md`:

```markdown
---
title: "About"
lastUpdated: "2025-01-27"
---

# About Timo Willemsen

I'm an engineering manager focused on AI-driven productivity and building great teams.

## Background

[Your background information here]

## Interests

- Engineering Management
- AI-Driven Productivity
- [Add your interests]

## Contact

[Add contact information or social links]
```

### 2. Create About Page Loader

Create the loader service:

```bash
mkdir -p src/lib/about
touch src/lib/about/aboutLoader.ts
```

Implement `src/lib/about/aboutLoader.ts`:

```typescript
import { parseFile, parseMarkdown } from '../markdown/parser'
import type { AboutPage } from './types'

export interface AboutLoader {
  loadAboutPage(): Promise<AboutPage>
}

class AboutLoaderImpl implements AboutLoader {
  async loadAboutPage(): Promise<AboutPage> {
    // Use import.meta.glob to load about.md
    const modules = import.meta.glob('/src/content/about.md', {
      query: '?raw',
      eager: false
    })
    
    const module = await modules['/src/content/about.md']()
    const content = typeof module === 'string' 
      ? module 
      : (module as { default?: string })?.default || String(module || '')
    
    const { frontmatter, body } = parseFile(content)
    const htmlContent = parseMarkdown(body)
    
    return {
      title: (frontmatter.title as string) || 'About',
      content: htmlContent,
      metadata: frontmatter
    }
  }
}

export const aboutLoader = new AboutLoaderImpl()
```

### 3. Create About Page Types

Create `src/lib/about/types.ts`:

```typescript
export interface AboutPage {
  title: string
  content: string
  rawContent?: string
  metadata?: Record<string, unknown>
}
```

### 4. Create About Page Component

Create `src/pages/AboutPage.tsx`:

```typescript
import { useEffect, useState } from 'react'
import { MarkdownRenderer } from '../components/post/MarkdownRenderer'
import { aboutLoader } from '../lib/about/aboutLoader'
import type { AboutPage } from '../lib/about/types'

export function AboutPage() {
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAboutPage() {
      try {
        setLoading(true)
        setError(null)
        const loaded = await aboutLoader.loadAboutPage()
        setAboutPage(loaded)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load about page')
      } finally {
        setLoading(false)
      }
    }

    loadAboutPage()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!aboutPage) {
    return <div>About page not found</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{aboutPage.title}</h1>
      <MarkdownRenderer content={aboutPage.content} />
    </div>
  )
}
```

### 5. Add Route to App

Update `src/App.tsx` to include the about route:

```typescript
import { AboutPage } from './pages/AboutPage'

// In the Routes component, add BEFORE the /:slug route:
<Route path="/about" element={<AboutPage />} />
<Route path="/:slug" element={<PostPage />} />
```

**Important**: The `/about` route must come before `/:slug` to ensure it's matched first.

### 6. Add Navigation Link

Update `src/components/layout/Layout.tsx` to add navigation:

```typescript
// In the header, add:
<nav>
  <Link to="/about" className="text-sm text-[#6b6b6b] hover:text-[#2d2d2d]">
    About
  </Link>
</nav>
```

## Development

### Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/about` to see the about page.

### Edit About Page Content

1. Edit `src/content/about.md`
2. Save file
3. Refresh browser to see changes

## Testing

### Run Tests

```bash
npm run test
```

### Create Unit Test for Loader

Create `tests/unit/about/loader.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { aboutLoader } from '../../src/lib/about/aboutLoader'

describe('AboutLoader', () => {
  it('should load about page', async () => {
    const aboutPage = await aboutLoader.loadAboutPage()
    expect(aboutPage).toBeDefined()
    expect(aboutPage.title).toBeDefined()
    expect(aboutPage.content).toBeDefined()
  })
})
```

### Create Integration Test

Create `tests/integration/about-page.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AboutPage } from '../../src/pages/AboutPage'

describe('AboutPage Integration', () => {
  it('should render about page', async () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    )
    
    // Wait for content to load
    await screen.findByText(/About/i)
    
    // Verify content is displayed
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
```

## Building for Production

### Build Static Site

```bash
npm run build
```

The about page will be included in the build output.

### Preview Production Build

```bash
npm run preview
```

Visit `http://localhost:4173/about` to preview.

## Common Tasks

### Updating About Page Content

1. Edit `src/content/about.md`
2. Save file
3. Changes appear after refresh (or automatically if file watching is enabled)

### Changing About Page Title

Edit the frontmatter in `src/content/about.md`:

```yaml
---
title: "About Me"  # Change this
---
```

### Adding Metadata

Add custom fields to frontmatter:

```yaml
---
title: "About"
lastUpdated: "2025-01-27"
email: "your@email.com"
social:
  twitter: "@yourhandle"
  github: "yourusername"
---
```

Access metadata in component via `aboutPage.metadata`.

## Troubleshooting

### About Page Not Loading

- Check `src/content/about.md` exists
- Verify file has valid markdown content
- Check browser console for errors
- Verify route is defined before `/:slug` in App.tsx

### Route Conflict with Blog Posts

- Ensure `/about` route is defined before `/:slug` route
- Check that no blog post has slug "about"
- Verify route order in App.tsx

### Markdown Not Rendering

- Verify `MarkdownRenderer` is imported correctly
- Check markdown syntax is valid
- Verify HTML sanitization isn't blocking content

### Navigation Link Not Working

- Check `Link` component is imported from `react-router-dom`
- Verify route path matches link `to` prop
- Check Layout component is inside `BrowserRouter`

## Validation Checklist

After implementation, verify:

- [ ] About page loads at `/about` route
- [ ] Content from `about.md` is displayed
- [ ] Markdown formatting renders correctly
- [ ] Navigation link works from header
- [ ] Page styling matches rest of blog
- [ ] Loading state displays while fetching
- [ ] Error handling works for missing file
- [ ] Tests pass
- [ ] Build completes successfully
- [ ] No console errors in browser

## Next Steps

1. **Customize Content**: Edit `about.md` with your personal information
2. **Add Styling**: Customize about page layout if needed
3. **Add Metadata**: Include social links, contact info in frontmatter
4. **Enhance Navigation**: Add more navigation links if needed

