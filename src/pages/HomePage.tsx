import { useEffect, useState, useRef } from 'react'
import { PostList } from '../components/post/PostList'
import { postLoader } from '../lib/posts/loader'
import type { BlogPost } from '../lib/posts/types'

export function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const watchCleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        setError(null)
        const loadedPosts = await postLoader.loadAllPosts()
        setPosts(loadedPosts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()

    // Set up file watching in development mode
    if (import.meta.env.DEV) {
      watchCleanupRef.current = postLoader.watchForChanges((updatedPosts) => {
        setPosts(updatedPosts)
      })
    }

    // Cleanup on unmount
    return () => {
      if (watchCleanupRef.current) {
        watchCleanupRef.current()
      }
    }
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-sm font-medium text-[#6b6b6b] uppercase tracking-wide mb-1">Latest Posts</h1>
      </div>
      <PostList posts={posts} loading={loading} error={error} />
    </div>
  )
}

