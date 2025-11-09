import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PostDetail } from '../components/post/PostDetail'
import { postLoader } from '../lib/posts/loader'
import type { BlogPost } from '../lib/posts/types'
import { findRelatedPosts } from '../lib/posts/relatedPosts'

export function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
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
        
        // Load all posts for related posts calculation
        const loadedAllPosts = await postLoader.loadAllPosts()
        setAllPosts(loadedAllPosts)
        
        // Load the specific post
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

  // Calculate related posts
  const relatedPosts = useMemo(() => {
    if (!post || allPosts.length === 0) {
      return []
    }
    return findRelatedPosts(post, allPosts, 5)
  }, [post, allPosts])

  // Handle tag click - navigate to homepage with tag filter
  const handleTagClick = (tag: string) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`)
  }

  return <PostDetail post={post} loading={loading} error={error} relatedPosts={relatedPosts} onTagClick={handleTagClick} />
}

