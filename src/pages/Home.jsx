import { useEffect, useState } from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

function Home() {
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [moodFilter, setMoodFilter] = useState('All')

  useEffect(() => {
    const savedPosts = localStorage.getItem('postflow_posts')

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }

    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('postflow_posts', JSON.stringify(posts))
    }
  }, [posts, isLoaded])

  const addPost = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const updatePost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    )

    setPosts(updatedPosts)
    setEditingPost(null)
  }

  const deletePost = (id) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this post?'
    )

    if (!isConfirmed) {
      return
    }

    setPosts(posts.filter((post) => post.id !== id))
  }

  const likePost = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id !== id) return post

      if (post.liked) {
        return {
          ...post,
          liked: false,
          likes: post.likes - 1
        }
      }

      return {
        ...post,
        liked: true,
        likes: post.likes + 1
      }
    })

    setPosts(updatedPosts)
  }

  const totalLikes = posts.reduce((total, post) => total + post.likes, 0)

  const filteredPosts = posts.filter((post) => {
    const searchValue = searchText.toLowerCase()

    const matchesSearch =
      post.fullName.toLowerCase().includes(searchValue) ||
      post.username.toLowerCase().includes(searchValue) ||
      post.content.toLowerCase().includes(searchValue) ||
      post.mood.toLowerCase().includes(searchValue)

    const matchesMood = moodFilter === 'All' || post.mood === moodFilter

    return matchesSearch && matchesMood
  })

  return (
    <div className="app">
      <header className="header">
        <h1>PostFlow</h1>
        <p>Share your mood, thoughts and daily moments</p>

        <div className="stats">
          <span>Posts: {posts.length}</span>
          <span>Likes: {totalLikes}</span>
        </div>
      </header>

      <PostForm
        addPost={addPost}
        updatePost={updatePost}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      />

      <section className="tools">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={moodFilter}
          onChange={(e) => setMoodFilter(e.target.value)}
        >
          <option value="All">All moods</option>
          <option value="😊 Happy">😊 Happy</option>
          <option value="😢 Sad">😢 Sad</option>
          <option value="😎 Cool">😎 Cool</option>
          <option value="😍 Excited">😍 Excited</option>
          <option value="😴 Tired">😴 Tired</option>
          <option value="🤔 Thoughtful">🤔 Thoughtful</option>
          <option value="🥳 Celebrating">🥳 Celebrating</option>
        </select>
      </section>

      <section className="feed-title">
        <h2>Latest Posts ({filteredPosts.length})</h2>
      </section>

      <section className="feed">
        {posts.length === 0 && (
          <div className="empty-feed">
            <h2>No posts yet.</h2>
            <p>Be the first person to share something.</p>
          </div>
        )}

        {posts.length > 0 && filteredPosts.length === 0 && (
          <div className="empty-feed">
            <h2>No matching posts.</h2>
            <p>Try changing your search or mood filter.</p>
          </div>
        )}

        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            likePost={likePost}
            deletePost={deletePost}
            setEditingPost={setEditingPost}
          />
        ))}
      </section>
    </div>
  )
}

export default Home