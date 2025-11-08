# Feature Specification: Simple Blog Application

**Feature Branch**: `001-blog-app`  
**Created**: 2025-01-27  
**Last Updated**: 2025-01-27  
**Status**: Implemented  
**Input**: User description: "Build a simple blog application for Timo Willemsen. The blog will feature stories and insights about engineering management at RTL, with a focus on AI-driven productivity improvements."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Published Blog Posts (Priority: P1)

Readers can view published blog posts on the blog. When visiting the blog, readers see a list of published posts with titles and publication dates. Clicking on a post displays the full content including title, publication date, and body text. This is the core value proposition - making Timo's insights accessible to readers.

**Why this priority**: This is the fundamental purpose of a blog - allowing readers to access published content. Without this, the blog has no value. This story delivers a complete, usable blog for readers.

**Independent Test**: Can be fully tested by visiting the blog and verifying that published posts are visible with their titles, dates, and full content. This delivers immediate value to readers seeking Timo's insights.

**Acceptance Scenarios**:

1. **Given** the blog has published posts, **When** a reader visits the blog homepage, **Then** they see a list of posts with titles, publication dates, and excerpts
2. **Given** a reader is viewing the post list, **When** they click on a post title, **Then** they see the full post content including title, publication date, and body text
3. **Given** the blog has no published posts, **When** a reader visits the blog homepage, **Then** they see a message indicating no posts are available yet

---

### User Story 2 - Manage Blog Posts via Markdown Files (Priority: P2)

The blog author (Timo) manages blog posts by creating and editing markdown files in a designated storage location. The system automatically reads markdown files and displays them as blog posts to readers. The author can create new posts by adding markdown files, edit existing posts by modifying files, and control publication by organizing files in appropriate directories or using metadata.

**Why this priority**: Content creation is essential for the blog to have any content. While viewing posts (P1) is the reader experience, the file-based management system enables the blog to function. This story enables Timo to share his insights using a simple, file-based workflow.

**Independent Test**: Can be fully tested by creating a new markdown file with post content, placing it in the appropriate location, and then verifying it appears in the reader view. This delivers the ability to add content to the blog through file management.

**Acceptance Scenarios**:

1. **Given** the author creates a new markdown file with post content in the published posts directory, **When** the system scans for posts, **Then** the post becomes visible to readers on the homepage
2. **Given** a markdown file exists in the published posts directory, **When** the author edits the file content, **Then** the updated content is reflected in the reader view after system refresh
3. **Given** a markdown file contains post metadata (title, date) and content, **When** the system processes the file, **Then** the post displays with correct title, publication date, and formatted content
4. **Given** the author removes or moves a markdown file from the published directory, **When** the system scans for posts, **Then** the post is no longer visible to readers

---

### User Story 3 - Browse Posts by Date (Priority: P3)

Readers can browse blog posts chronologically, with the most recent posts appearing first. Readers can navigate through posts to find content from different time periods.

**Why this priority**: While viewing individual posts (P1) provides core value, chronological browsing helps readers discover content and understand the progression of insights over time. This enhances the reading experience but is not essential for MVP.

**Independent Test**: Can be fully tested by verifying that posts are displayed in reverse chronological order (newest first) and that readers can navigate through the list. This delivers improved content discovery.

**Acceptance Scenarios**:

1. **Given** the blog has multiple published posts from different dates, **When** a reader visits the homepage, **Then** posts are displayed with the most recent post first
2. **Given** a reader is viewing the post list, **When** they scroll through the list, **Then** they see posts in reverse chronological order (newest to oldest)

---

### Edge Cases

- What happens when a markdown file has very long content? (System should handle long-form articles without performance degradation)
- How does the system handle special characters or formatting in markdown files? (System should preserve and display markdown formatting accurately)
- What happens when a markdown file is malformed or missing required metadata? (System should handle gracefully, either skip the file or show appropriate error)
- How does the system handle multiple posts published on the same date? (Posts should be ordered consistently, e.g., by filename, modification time, or metadata)
- What happens when a reader accesses a post whose markdown file no longer exists? (System should show appropriate message or redirect)
- How does the system handle markdown files that are being edited (temporary files, backup files)? (System should ignore temporary or backup files)
- What happens when markdown files are added, modified, or removed while the system is running? (System should detect changes and update the displayed posts accordingly)
- What happens when a markdown file contains an H1 heading that matches the frontmatter title? (System should only display title from frontmatter, not from markdown content)
- How does the system handle markdown libraries that require Node.js APIs in the browser? (System must provide polyfills for required APIs like Buffer)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display published blog posts to readers on the homepage
- **FR-002**: System MUST allow readers to view individual post details including title, publication date, and full content
- **FR-013**: System MUST display post excerpts on the homepage when available in frontmatter
- **FR-014**: System MUST use clean URLs without /post/ prefix (e.g., /slug instead of /post/slug)
- **FR-003**: System MUST read markdown files from a designated storage location
- **FR-004**: System MUST parse markdown files to extract post metadata (title, publication date) and content
- **FR-005**: System MUST convert markdown content to formatted HTML for display to readers
- **FR-006**: System MUST display posts in reverse chronological order (newest first) on the homepage
- **FR-007**: System MUST detect changes to markdown files and update displayed posts accordingly
- **FR-008**: System MUST handle markdown files with standard frontmatter metadata (title, date, etc.)
- **FR-009**: System MUST display the publication date for each published post (from file metadata or modification date)
- **FR-010**: System MUST handle long-form markdown content without truncation or performance issues
- **FR-011**: System MUST ignore temporary files, backup files, and hidden files when scanning for posts
- **FR-012**: System MUST gracefully handle malformed markdown files or missing metadata
- **FR-015**: System MUST preserve line breaks in markdown content (single newlines converted to <br> tags)
- **FR-016**: System MUST display post title only from frontmatter metadata, not from markdown H1 headings
- **FR-017**: System MUST provide browser polyfills for Node.js APIs (e.g., Buffer) required by markdown parsing libraries

### Key Entities *(include if feature involves data)*

- **Blog Post**: Represents a single blog post entry, derived from a markdown file. Key attributes:
  - Title (extracted from markdown frontmatter or filename, required)
  - Content/body (markdown text, converted to HTML for display, can be long-form)
  - Publication date (extracted from markdown frontmatter or file modification date)
  - Source file (reference to the markdown file location)
  - Author (Timo Willemsen - single author for this blog, may be specified in frontmatter)
  - Excerpt (optional, extracted from frontmatter, displayed on homepage)
  - Slug (URL-friendly identifier generated from title)

- **Markdown File**: Source file containing blog post content. Structure:
  - Frontmatter metadata (YAML or similar format) containing title, date, and optional fields
  - Markdown content body (the actual post content)
  - Stored in designated directory for published posts

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Readers can view the blog homepage and see published posts in under 2 seconds
- **SC-002**: Readers can open and read a full blog post in under 1 second after clicking
- **SC-003**: Author can create a new blog post by creating a markdown file, and it becomes visible to readers within 30 seconds of file creation
- **SC-004**: Blog supports at least 100 published posts without performance degradation
- **SC-005**: Blog posts display correctly with formatting preserved (paragraphs, line breaks, special characters)
- **SC-006**: 95% of readers can successfully view and read blog posts on first visit without errors
- **SC-007**: Blog layout uses clean, minimal design with brown/beige color scheme for professional readability
- **SC-008**: Markdown content preserves formatting including line breaks and special characters

## Post-Implementation Updates

### Bug Fixes (2025-01-27)

**Buffer Polyfill Issue**: The `gray-matter` library requires Node.js `Buffer` API which is not available in browser environments. Fixed by adding `buffer` polyfill package and configuring Vite to provide global Buffer access.

**Frontmatter Parsing**: Enhanced frontmatter parsing to ensure complete separation of frontmatter from markdown body, with additional safeguards to remove any frontmatter markers that might remain in the body content.

**Newline Handling**: Configured `marked` library with `breaks: true` option to preserve single newlines in markdown content, converting them to `<br>` tags for better readability.

**Duplicate Title Display**: Fixed issue where post title appeared twice (once from frontmatter, once from markdown H1). Solution: Post title is only displayed from frontmatter metadata, markdown content should not include H1 with the same title.

### Layout & Design Changes (2025-01-27)

**Design System Update**: Changed from blue/indigo color scheme to warm brown/beige palette inspired by Claude.ai and Cursor.com for a clean, professional appearance.

**Layout Improvements**:
- Compact spacing throughout (reduced padding and margins)
- Narrower max-width (max-w-3xl instead of max-w-5xl)
- Minimal header with smaller text sizes
- Simple border separators instead of card shadows
- Added footer with copyright information

**Typography Enhancements**:
- Improved font sizes and line heights for better readability
- Enhanced markdown prose styling (code blocks, blockquotes, lists)
- Better spacing between paragraphs and headings
- System font stack for native feel

**URL Structure**: Changed from `/post/:slug` to `/:slug` for cleaner, more SEO-friendly URLs.

**Excerpt Display**: Added excerpt display on homepage post cards when available in frontmatter metadata.
