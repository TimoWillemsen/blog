import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <header className="bg-[#faf9f7] border-b border-[#e8e6e3] sticky top-0 z-10" role="banner">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Link to="/" className="block group">
            <h1 className="text-lg font-semibold text-[#2d2d2d] group-hover:text-[#1a1a1a] transition-colors">
              Timo Willemsen
            </h1>
            <p className="text-xs text-[#6b6b6b] mt-0.5">
              Engineering Management & AI-Driven Productivity
            </p>
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6" role="main">
        {children}
      </main>
      <footer className="mt-12 py-4 border-t border-[#e8e6e3]">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-[#8b8b8b]">
          <p>© {new Date().getFullYear()} Timo Willemsen</p>
          <p className="mt-2">Content on this blog is partially written by AI</p>
        </div>
      </footer>
    </div>
  )
}

