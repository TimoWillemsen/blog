# Quickstart Guide: Simple Blog Application

**Date**: 2025-01-27  
**Feature**: Simple Blog Application

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- Code editor (VS Code recommended)

## Initial Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

**Expected Dependencies**:
- `vite` - Build tool and dev server
- `react` / `react-dom` - UI framework (if using React)
- `tailwindcss` - Styling
- `marked` or `remark` - Markdown parser
- `gray-matter` - Frontmatter parser
- `vitest` - Testing framework
- ShadCN UI components (copy-paste, not npm package)

### 2. Create Content Directory

```bash
mkdir -p src/content/posts
```

### 3. Create Your First Blog Post

Create a file `src/content/posts/my-first-post.md`:

```markdown
---
title: "My First Blog Post"
date: "2025-01-27"
author: "Timo Willemsen"
excerpt: "This is my first blog post about engineering management."
---

# My First Blog Post

This is the content of my first blog post. I can use **markdown** formatting here.

## Section

- List item 1
- List item 2

[Link to external site](https://example.com)
```

### 4. Configure Post Directory

Update configuration to point to your posts directory (if configurable):

```typescript
// src/lib/posts/config.ts
export const POSTS_DIRECTORY = 'src/content/posts';
```

## Development

### Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:5173` (or port shown in terminal).

### Add More Posts

1. Create new `.md` files in `src/content/posts/`
2. Add frontmatter with title and date
3. Write markdown content
4. Save file - changes should appear automatically (if file watching enabled)

### File Structure Example

```
src/content/posts/
├── 2025-01-27-my-first-post.md
├── 2025-01-28-engineering-management.md
└── 2025-01-29-ai-productivity-tips.md
```

## Building for Production

### Build Static Site

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Output will be in `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Testing

### Run Unit Tests

```bash
npm run test
# or
yarn test
# or
pnpm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Integration Tests

```bash
npm run test:integration
```

## Common Tasks

### Adding a New Post

1. Create new `.md` file in `src/content/posts/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   date: "2025-01-27"
   ---
   ```
3. Write markdown content
4. Save file

### Editing an Existing Post

1. Open `.md` file in `src/content/posts/`
2. Edit content
3. Save file
4. Changes appear in browser (if file watching enabled)

### Removing a Post

1. Delete the `.md` file from `src/content/posts/`
2. Post disappears from blog (after refresh or file watch)

### Customizing Styles

1. Edit `tailwind.config.js` for Tailwind customization
2. Edit component files for ShadCN component customization
3. Add custom CSS in `src/index.css` if needed

## Troubleshooting

### Posts Not Appearing

- Check file is in correct directory (`src/content/posts/`)
- Verify file has `.md` extension
- Check frontmatter is valid YAML
- Check browser console for errors
- Verify file watching is working (check terminal for file change logs)

### Markdown Not Rendering

- Verify markdown parser is installed
- Check markdown syntax is valid
- Verify HTML sanitization isn't too aggressive

### Build Errors

- Check all dependencies are installed
- Verify Node.js version is 18+
- Check for syntax errors in source files
- Review build output for specific errors

### Performance Issues

- Check bundle size (`npm run build` shows sizes)
- Verify code splitting is working
- Check if too many posts loaded at once (consider pagination)

## Next Steps

1. **Customize Design**: Edit Tailwind config and ShadCN components
2. **Add Features**: Search, tags, categories (see spec for requirements)
3. **Deploy**: Push to GitHub and deploy to Vercel/Netlify
4. **Optimize**: Add image optimization, lazy loading, etc.

## File Watching (Optional)

For automatic updates when files change, configure file watching:

```typescript
// src/lib/posts/loader.ts
import { watch } from 'fs';

// Watch for file changes
watch(POSTS_DIRECTORY, (eventType, filename) => {
  if (filename.endsWith('.md')) {
    // Reload posts
    loadAllPosts();
  }
});
```

Note: File watching may not work in all deployment environments. For production, use build-time generation instead.

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Configure build command: `npm run build`
4. Configure output directory: `dist`
5. Deploy

### Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Configure build command: `npm run build`
4. Configure publish directory: `dist`
5. Deploy

### GitHub Pages

1. Build project: `npm run build`
2. Push `dist/` contents to `gh-pages` branch
3. Configure GitHub Pages to serve from `gh-pages` branch

## Validation Checklist

After setup, verify:

- [ ] Development server starts without errors
- [ ] Homepage displays list of posts
- [ ] Clicking a post shows full content
- [ ] Posts are sorted newest first
- [ ] Markdown formatting renders correctly
- [ ] Build completes successfully
- [ ] Tests pass
- [ ] No console errors in browser

