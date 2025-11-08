# Timo Willemsen's Blog

A simple, stateless blog application built with Vite, React, TypeScript, Tailwind CSS, and ShadCN UI. The blog reads markdown files from the file system and displays them as blog posts.

## Features

- 📝 **Markdown-based content** - Write blog posts in Markdown with frontmatter
- 🎨 **Modern UI** - Built with Tailwind CSS and ShadCN UI components
- ⚡ **Fast** - Optimized with Vite for fast development and production builds
- 📱 **Responsive** - Works on desktop and mobile devices
- ♿ **Accessible** - WCAG 2.1 Level AA compliant
- 🧪 **Tested** - Comprehensive test coverage with Vitest

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Markdown**: Marked + Gray-matter
- **Testing**: Vitest + React Testing Library
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the blog.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Adding Blog Posts

Create markdown files in `src/content/posts/` with the following format:

```markdown
---
title: "Your Post Title"
date: "2025-01-27"
author: "Timo Willemsen"
excerpt: "Optional excerpt for the post list"
---

# Your Post Content

Write your blog post content in Markdown here...
```

The blog will automatically:
- Load all `.md` files from `src/content/posts/`
- Parse frontmatter metadata
- Convert Markdown to HTML
- Display posts in reverse chronological order

## Project Structure

```
src/
├── components/       # React components
│   ├── layout/      # Layout components
│   └── post/        # Post-related components
├── lib/             # Utilities and services
│   ├── markdown/    # Markdown parsing utilities
│   └── posts/       # Post loading and processing
├── pages/           # Page components
├── content/posts/   # Markdown blog post files
└── App.tsx          # Main application component

tests/
├── unit/            # Unit tests
├── integration/     # Integration tests
└── contract/        # Component contract tests
```

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## License

MIT

