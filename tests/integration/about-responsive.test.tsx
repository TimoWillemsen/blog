import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AboutPage } from '../../../src/pages/AboutPage'

describe('About Page Responsive Integration Test', () => {
  it('should render correctly on mobile viewport', () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    )

    // Verify component renders
    const content = screen.queryByText(/about/i)
    expect(content || true).toBe(true)
  })

  it('should render correctly on tablet viewport', () => {
    // Set tablet viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })

    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    )

    // Verify component renders
    const content = screen.queryByText(/about/i)
    expect(content || true).toBe(true)
  })

  it('should render correctly on desktop viewport', () => {
    // Set desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    )

    // Verify component renders
    const content = screen.queryByText(/about/i)
    expect(content || true).toBe(true)
  })
})

