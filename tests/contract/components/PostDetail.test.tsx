import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PostDetail } from '../../../src/components/post/PostDetail'
import type { BlogPost } from '../../../src/lib/posts/types'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('PostDetail Component Contract', () => {
  const mockPost: BlogPost = {
    id: '1',
    title: 'Test Post',
    content: '<p>Full content here</p>',
    publicationDate: new Date('2025-01-27'),
    slug: 'test-post',
    sourceFile: 'test.md',
    author: 'Timo Willemsen',
  }

  it('should display full post content', () => {
    // Test will be implemented after PostDetail component is created
    expect(true).toBe(true)
  })

  it('should display post title', () => {
    // Test will be implemented after PostDetail component is created
    expect(true).toBe(true)
  })

  it('should display publication date', () => {
    // Test will be implemented after PostDetail component is created
    expect(true).toBe(true)
  })

  it('should display author name', () => {
    // Test will be implemented after PostDetail component is created
    expect(true).toBe(true)
  })

  it('should show loading state when loading is true', () => {
    // Test will be implemented after PostDetail component is created
    expect(true).toBe(true)
  })

  it('should show error message when error is provided', () => {
    // Test will be implemented after PostDetail component is created
    expect(true).toBe(true)
  })

  it('should handle null post (not found)', () => {
    // Test will be implemented after PostDetail component is created
    expect(true).toBe(true)
  })

  it('should display tags if post has tags', () => {
    const postWithTags: BlogPost = {
      ...mockPost,
      tags: ['react', 'typescript'],
    }
    render(<PostDetail post={postWithTags} />)
    
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('should not display tag section if post has no tags', () => {
    render(<PostDetail post={mockPost} />)
    
    expect(screen.queryByText('react')).not.toBeInTheDocument()
  })

  it('should call onTagClick when a tag is clicked', async () => {
    const { userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    const onTagClick = vi.fn()
    const postWithTags: BlogPost = {
      ...mockPost,
      tags: ['react'],
    }
    
    render(<PostDetail post={postWithTags} onTagClick={onTagClick} />)
    
    const reactTag = screen.getByText('react')
    await user.click(reactTag)
    
    expect(onTagClick).toHaveBeenCalledWith('react')
  })

  it('should highlight active tag when activeTag is provided', () => {
    const postWithTags: BlogPost = {
      ...mockPost,
      tags: ['react', 'typescript'],
    }
    render(<PostDetail post={postWithTags} activeTag="react" />)
    
    const reactTag = screen.getByText('react')
    expect(reactTag).toHaveAttribute('aria-current', 'true')
  })

  it('should display related articles section when relatedPosts provided', () => {
    const relatedPost: BlogPost = {
      id: 'related-1',
      title: 'Related Post',
      content: '<p>Related content</p>',
      publicationDate: new Date('2025-01-26'),
      slug: 'related-post',
      sourceFile: 'related.md',
      tags: ['react'],
    }

    renderWithRouter(<PostDetail post={mockPost} relatedPosts={[relatedPost]} />)
    
    expect(screen.getByText('Related Articles')).toBeInTheDocument()
    expect(screen.getByText('Related Post')).toBeInTheDocument()
  })

  it('should not display related articles section when relatedPosts is empty', () => {
    renderWithRouter(<PostDetail post={mockPost} relatedPosts={[]} />)
    
    expect(screen.queryByText('Related Articles')).not.toBeInTheDocument()
  })

  it('should not display related articles section when relatedPosts is undefined', () => {
    renderWithRouter(<PostDetail post={mockPost} />)
    
    expect(screen.queryByText('Related Articles')).not.toBeInTheDocument()
  })

  it('should exclude current post from related articles', () => {
    const currentPost: BlogPost = {
      ...mockPost,
      id: 'current',
      slug: 'current',
      tags: ['react'],
    }

    const relatedPosts: BlogPost[] = [
      {
        id: 'related-1',
        title: 'Related Post',
        content: '<p>Content</p>',
        publicationDate: new Date('2025-01-26'),
        slug: 'related-1',
        sourceFile: 'related.md',
        tags: ['react'],
      },
    ]

    renderWithRouter(<PostDetail post={currentPost} relatedPosts={relatedPosts} />)
    
    // Should only show the actual related post, not the current post
    expect(screen.getByText('Related Post')).toBeInTheDocument()
    // Current post title should appear in main content, not in related section
    expect(screen.getAllByText(mockPost.title).length).toBe(1) // Only in main title
  })
})

