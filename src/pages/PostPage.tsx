import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostDetail } from '../components/post/PostDetail'
import { postLoader } from '../lib/posts/loader'
import type { BlogPost } from '../lib/posts/types'

export function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        setError('Invalid post slug')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const loadedPost = await postLoader.loadPost(slug)
        if (!loadedPost) {
          setError('Post not found')
        } else {
          setPost(loadedPost)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  return <PostDetail post={post} loading={loading} error={error} />
}

