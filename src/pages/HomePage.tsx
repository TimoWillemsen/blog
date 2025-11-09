import { useEffect, useState, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PostList } from '../components/post/PostList'
import { postLoader } from '../lib/posts/loader'
import type { BlogPost } from '../lib/posts/types'
import { filterPostsByTag } from '../lib/posts/filter'

export function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
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
      watchCleanupRef.current = postLoader.watchForChanges((updatedPosts: BlogPost[]) => {
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

  // Read tag from URL params on mount and when params change
  // URL params are the single source of truth
  const tagFromUrl = searchParams.get('tag')
  const selectedTag = tagFromUrl || null

  // Filter posts by selected tag
  const filteredPosts = useMemo(() => {
    if (selectedTag === null) {
      return posts
    }
    return filterPostsByTag(posts, selectedTag)
  }, [posts, selectedTag])

  const handleTagClick = (tag: string) => {
    // If clicking the same tag, clear the filter
    if (selectedTag && selectedTag.toLowerCase() === tag.toLowerCase()) {
      // Remove tag from URL
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)
        newParams.delete('tag')
        return newParams
      })
    } else {
      // Update URL with tag parameter
      setSearchParams({ tag })
    }
  }

  const handleClearFilter = () => {
    // Remove tag from URL
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.delete('tag')
      return newParams
    })
  }

  return (
    <div>
      <PostList 
        posts={filteredPosts} 
        loading={loading} 
        error={error}
        activeTag={selectedTag}
        onTagClick={handleTagClick}
        onClearFilter={handleClearFilter}
      />
    </div>
  )
}

