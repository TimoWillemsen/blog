import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MarkdownRenderer } from '../../../src/components/post/MarkdownRenderer'

describe('MarkdownRenderer Component Contract', () => {
  it('should render HTML content safely', () => {
    const htmlContent = '<p>Test content</p>'
    const { container } = render(<MarkdownRenderer content={htmlContent} />)
    
    expect(container.querySelector('p')).toBeInTheDocument()
    expect(container.textContent).toContain('Test content')
  })

  it('should display code blocks with syntax highlighting when language is provided', () => {
    // HTML content with Prism.js highlighted code block
    const htmlContent = '<pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> x = <span class="token number">1</span>;</code></pre>'
    const { container } = render(<MarkdownRenderer content={htmlContent} />)
    
    const codeBlock = container.querySelector('pre.language-javascript')
    expect(codeBlock).toBeInTheDocument()
    expect(codeBlock?.querySelector('code.language-javascript')).toBeInTheDocument()
    expect(codeBlock?.querySelector('.token')).toBeInTheDocument()
  })

  it('should display code blocks without highlighting when no language is provided', () => {
    const htmlContent = '<pre><code>const x = 1;</code></pre>'
    const { container } = render(<MarkdownRenderer content={htmlContent} />)
    
    const codeBlock = container.querySelector('pre')
    expect(codeBlock).toBeInTheDocument()
    expect(codeBlock?.querySelector('code')).toBeInTheDocument()
    // Should not have language classes
    expect(codeBlock?.classList.contains('language-javascript')).toBe(false)
  })

  it('should handle empty content gracefully', () => {
    const { container } = render(<MarkdownRenderer content="" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should preserve existing prose styling classes', () => {
    const htmlContent = '<p>Test</p>'
    const { container } = render(<MarkdownRenderer content={htmlContent} />)
    
    const proseElement = container.querySelector('.prose')
    expect(proseElement).toBeInTheDocument()
  })

  it('should maintain accessibility features', () => {
    const htmlContent = '<pre><code>const x = 1;</code></pre>'
    const { container } = render(<MarkdownRenderer content={htmlContent} />)
    
    const codeBlock = container.querySelector('pre')
    expect(codeBlock).toBeInTheDocument()
    // Code blocks should have proper semantic structure
    expect(codeBlock?.querySelector('code')).toBeInTheDocument()
  })
})

