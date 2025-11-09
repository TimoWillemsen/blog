import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <header className="bg-[#faf9f7] border-b border-[#e8e6e3] sticky top-0 z-10 backdrop-blur-sm bg-opacity-95" role="banner">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="block group">
              <h1 className="text-xl font-semibold text-[#2d2d2d] group-hover:text-[#1a1a1a] transition-colors tracking-tight">
                Timo Willemsen
              </h1>
              <p className="text-xs text-[#6b6b6b] mt-1 leading-relaxed">
                Engineering Management & AI-Driven Productivity
              </p>
            </Link>
            <nav>
              <Link 
                to="/about" 
                className="text-sm font-medium text-[#6b6b6b] hover:text-[#2d2d2d] transition-colors relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8b7355] group-hover:w-full transition-all duration-200"></span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-8" role="main">
        {children}
      </main>
      <footer className="mt-16 py-8 border-t border-[#e8e6e3]">
        <div className="max-w-3xl mx-auto px-6 text-center text-xs text-[#8b8b8b] leading-relaxed">
          <p>© {new Date().getFullYear()} Timo Willemsen</p>
          <p className="mt-2">Content on this blog is partially written by AI</p>
        </div>
      </footer>
    </div>
  )
}

