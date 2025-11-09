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
      <div className="py-8">
        <p className="text-[#6b6b6b]">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4 text-[#2d2d2d]">Error</h1>
        <p className="text-[#6b6b6b]">{error}</p>
      </div>
    )
  }

  if (!aboutPage) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4 text-[#2d2d2d]">About page not found</h1>
        <p className="text-[#6b6b6b]">The about page content could not be loaded.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[#2d2d2d]">{aboutPage.title}</h1>
      <MarkdownRenderer content={aboutPage.content} />
    </div>
  )
}

