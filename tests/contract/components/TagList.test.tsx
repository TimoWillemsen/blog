import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TagList } from '../../../src/components/post/TagList'

describe('TagList Component Contract', () => {
  it('should display all tags in the array', () => {
    const tags = ['react', 'typescript', 'web-development']
    render(<TagList tags={tags} />)
    
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('typescript')).toBeInTheDocument()
    expect(screen.getByText('web-development')).toBeInTheDocument()
  })

  it('should render nothing for empty tags array', () => {
    const { container } = render(<TagList tags={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('should call onTagClick when a tag is clicked', async () => {
    const user = userEvent.setup()
    const onTagClick = vi.fn()
    const tags = ['react', 'typescript']
    
    render(<TagList tags={tags} onTagClick={onTagClick} />)
    
    const reactTag = screen.getByText('react')
    await user.click(reactTag)
    
    expect(onTagClick).toHaveBeenCalledWith('react')
    expect(onTagClick).toHaveBeenCalledTimes(1)
  })

  it('should highlight active tag when activeTag matches', () => {
    const tags = ['react', 'typescript']
    render(<TagList tags={tags} activeTag="react" />)
    
    const reactTag = screen.getByText('react')
    expect(reactTag).toHaveAttribute('aria-current', 'true')
  })

  it('should have proper ARIA labels for each tag', () => {
    const tags = ['react', 'typescript']
    render(<TagList tags={tags} />)
    
    expect(screen.getByLabelText('Tag: react')).toBeInTheDocument()
    expect(screen.getByLabelText('Tag: typescript')).toBeInTheDocument()
  })

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup()
    const onTagClick = vi.fn()
    const tags = ['react']
    
    render(<TagList tags={tags} onTagClick={onTagClick} />)
    
    const tag = screen.getByText('react')
    tag.focus()
    expect(tag).toHaveFocus()
    
    await user.keyboard('{Enter}')
    expect(onTagClick).toHaveBeenCalledWith('react')
  })

  it('should apply provided className to container', () => {
    const tags = ['react']
    const { container } = render(<TagList tags={tags} className="custom-class" />)
    
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('custom-class')
  })

  it('should handle case-insensitive active tag matching', () => {
    const tags = ['react', 'typescript']
    render(<TagList tags={tags} activeTag="React" />)
    
    const reactTag = screen.getByText('react')
    // The component should normalize for comparison
    expect(reactTag).toHaveAttribute('aria-current', 'true')
  })
})

