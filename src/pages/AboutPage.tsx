import { useEffect, useState } from 'react'
import { MarkdownRenderer } from '../components/post/MarkdownRenderer'
import { aboutLoader } from '../lib/about/aboutLoader'
import type { AboutPage as AboutPageType } from '../lib/about/types'

export function AboutPage() {
  const [aboutPage, setAboutPage] = useState<AboutPageType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAboutPage() {
      try {
        setLoading(true)
        setError(null)
        const loaded = await aboutLoader.loadAboutPage()
        setAboutPage(loaded)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load about page')
      } finally {
        setLoading(false)
      }
    }

    loadAboutPage()
  }, [])

  if (loading) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-semibold mb-4 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>Error</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
      </div>
    )
  }

  if (!aboutPage) {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-semibold mb-4 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>About page not found</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>The about page content could not be loaded.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{aboutPage.title}</h1>
      <div className="prose max-w-none">
        <MarkdownRenderer content={aboutPage.content} />
      </div>
    </div>
  )
}

