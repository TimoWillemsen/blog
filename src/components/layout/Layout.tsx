import { Link } from 'react-router-dom'
import { ReactNode } from 'react'
import { ThemeSelector } from './ThemeSelector'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <header 
        className="border-b sticky top-0 z-10 backdrop-blur-sm bg-opacity-95" 
        style={{ 
          backgroundColor: 'var(--color-header-bg)',
          borderColor: 'var(--color-header-border)'
        }}
        role="banner"
      >
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="block group">
              <h1 
                className="text-xl font-semibold transition-colors tracking-tight"
                style={{ color: 'var(--color-header-text)' }}
              >
                Timo Willemsen
              </h1>
              <p 
                className="text-xs mt-1 leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Engineering Management & AI-Driven Productivity
              </p>
            </Link>
            <nav className="flex items-center gap-4">
              <div className="relative">
                <ThemeSelector 
                  aria-label="Toggle theme" 
                  className="text-sm font-medium transition-colors"
                  style={{ 
                    color: 'var(--color-text-secondary)',
                  }}
                />
              </div>
              <Link 
                to="/about" 
                className="text-sm font-medium transition-colors relative group"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                About
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-200"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                ></span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-8" role="main">
        {children}
      </main>
      <footer 
        className="mt-16 py-8 border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          <p>© {new Date().getFullYear()} Timo Willemsen</p>
          <p className="mt-2">Content on this blog is partially written by AI</p>
        </div>
      </footer>
    </div>
  )
}

