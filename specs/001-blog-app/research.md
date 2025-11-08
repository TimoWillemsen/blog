# Research: Simple Blog Application

**Date**: 2025-01-27  
**Feature**: Simple Blog Application

## Technology Stack Decisions

### Build Tool: Vite

**Decision**: Use Vite as the build tool and development server.

**Rationale**:
- Fast development experience with HMR (Hot Module Replacement)
- Optimized production builds with code splitting
- Native TypeScript support
- Minimal configuration required
- Excellent performance for static site generation

**Alternatives Considered**:
- **Webpack**: More complex configuration, slower builds
- **Parcel**: Good zero-config option but less flexible
- **Rollup**: Better for libraries, less optimized for applications

### Styling: Tailwind CSS

**Decision**: Use Tailwind CSS for utility-first styling.

**Rationale**:
- Rapid UI development with utility classes
- Small production bundle size (tree-shaking unused styles)
- Consistent design system through configuration
- Excellent integration with component frameworks
- Responsive design utilities built-in

**Alternatives Considered**:
- **CSS Modules**: More verbose, requires separate CSS files
- **Styled Components**: Runtime overhead, larger bundle
- **Plain CSS**: Too verbose for rapid development

### UI Components: ShadCN UI

**Decision**: Use ShadCN UI component library.

**Rationale**:
- Copy-paste component model (no npm dependency bloat)
- Built on Radix UI primitives (accessibility built-in)
- Tailwind CSS integration
- Fully customizable and themeable
- WCAG 2.1 Level AA compliance out of the box

**Alternatives Considered**:
- **Material UI**: Larger bundle size, opinionated design
- **Ant Design**: Heavy, less customizable
- **Chakra UI**: Good but requires runtime dependency

### Markdown Parser

**Decision**: Use `marked` or `remark` (to be determined based on bundle size).

**Rationale**:
- Need lightweight markdown parser
- Must support frontmatter parsing (YAML)
- Should handle common markdown features (headers, lists, code blocks, links)
- Bundle size consideration: `marked` (~20KB) vs `remark` ecosystem (~50KB+)

**Alternatives Considered**:
- **markdown-it**: Similar to marked, slightly larger
- **unified/remark**: More powerful but larger ecosystem
- **Custom parser**: Too complex for MVP

**Recommendation**: Start with `marked` + `gray-matter` for frontmatter. If more features needed, migrate to `remark`.

### Framework Choice

**Decision**: Use React (assumed from ShadCN UI compatibility).

**Rationale**:
- ShadCN UI is React-based
- Large ecosystem and community
- Excellent TypeScript support
- Good performance with modern React patterns

**Alternatives Considered**:
- **Vue**: Would require different UI library
- **Svelte**: Smaller bundle but less ecosystem
- **Vanilla JS**: Too verbose for component-based UI

### Routing

**Decision**: Use React Router or Vite's file-based routing (depending on framework choice).

**Rationale**:
- Need client-side routing for SPA
- React Router is standard for React apps
- Vite supports file-based routing plugins if preferred

**Alternatives Considered**:
- **Next.js**: Overkill for static blog, adds complexity
- **Remix**: Server-side features not needed
- **Vanilla routing**: Too manual, error-prone

### State Management

**Decision**: Use React hooks (useState, useEffect) - no external state management library.

**Rationale**:
- Fully stateless application (reads files, no server state)
- Simple data flow: load markdown → parse → display
- No need for Redux, Zustand, or similar
- Minimal dependencies aligns with project goals

**Alternatives Considered**:
- **Redux**: Unnecessary complexity for read-only blog
- **Zustand**: Lightweight but still unnecessary
- **Context API**: Could work but hooks are simpler

### File Reading Strategy

**Decision**: Read markdown files at build time (static generation) or at runtime via fetch.

**Rationale**:
- **Build-time**: Better performance, all posts bundled
- **Runtime**: More flexible, easier content updates without rebuild
- For MVP: Runtime fetch is simpler and allows content updates without redeployment

**Alternatives Considered**:
- **Static Site Generation (SSG)**: Better performance but requires build step for content
- **Server-side rendering**: Not needed, no server
- **Hybrid**: Could pre-render popular posts, fetch others

**Recommendation**: Start with runtime fetch. If performance becomes issue, migrate to build-time generation.

### Frontmatter Format

**Decision**: Use YAML frontmatter (standard in markdown ecosystem).

**Rationale**:
- Widely supported format
- Human-readable
- Supports nested data structures
- Libraries like `gray-matter` handle parsing

**Alternatives Considered**:
- **JSON frontmatter**: Less readable, more error-prone
- **TOML frontmatter**: Less common, smaller ecosystem
- **No frontmatter**: Would need filename-based metadata (less flexible)

## Architecture Decisions

### Stateless Design

**Decision**: Fully stateless application with no database or server state.

**Rationale**:
- Aligns with user requirement for simplicity
- No backend infrastructure needed
- Content managed through file system
- Easy to deploy (static hosting)
- No operational overhead

### Markdown File Organization

**Decision**: Store markdown files in `src/content/posts/` directory (or configurable path).

**Rationale**:
- Co-located with source code for development
- Easy to version control
- Simple file system access
- Can be moved to separate directory later if needed

**Alternatives Considered**:
- **External directory**: More flexible but requires path configuration
- **Public directory**: Files would be accessible via URL (security concern)
- **Separate repository**: Overkill for single-author blog

## Performance Considerations

### Bundle Size Optimization

**Decision**: Target < 200KB gzipped initial bundle.

**Strategies**:
- Code splitting by route
- Lazy load markdown parser if possible
- Tree-shake unused Tailwind classes
- ShadCN components are copy-paste (no runtime dependency)
- Use dynamic imports for heavy dependencies

### Markdown Processing

**Decision**: Parse markdown on-demand (when post is viewed) or pre-process at build time.

**Rationale**: 
- Pre-processing: Faster runtime, larger build output
- On-demand: Smaller bundle, slight runtime cost
- For 100+ posts: Pre-processing at build time is better
- For MVP: On-demand is simpler

**Recommendation**: Start on-demand, migrate to build-time if performance degrades.

## Security Considerations

### File System Access

**Decision**: Only read from designated posts directory, ignore hidden/temp files.

**Rationale**:
- Prevents reading sensitive files
- Filters out editor backup files
- Whitelist approach is safer than blacklist

### Content Sanitization

**Decision**: Sanitize HTML output from markdown to prevent XSS.

**Rationale**:
- Markdown can contain raw HTML
- Need to sanitize user-authored content
- Use library like `DOMPurify` for sanitization

## Testing Strategy

### Unit Tests

**Decision**: Use Vitest for unit testing markdown parsing and utilities.

**Rationale**:
- Native Vite integration
- Fast execution
- TypeScript support
- Jest-compatible API

### Integration Tests

**Decision**: Use React Testing Library for component integration tests.

**Rationale**:
- Tests user interactions, not implementation
- Works well with React components
- Accessible queries encourage good practices

### E2E Tests

**Decision**: Use Playwright for end-to-end user journey tests.

**Rationale**:
- Modern, fast E2E testing
- Cross-browser support
- Good developer experience
- Can test markdown file → display flow

## Deployment Strategy

**Decision**: Deploy as static site to hosting service (Vercel, Netlify, GitHub Pages).

**Rationale**:
- No server infrastructure needed
- Free tier available
- Automatic deployments from git
- CDN distribution for fast global access

**Alternatives Considered**:
- **Self-hosted**: Operational overhead not needed
- **Docker container**: Overkill for static site
- **Cloud storage + CDN**: More complex than needed

