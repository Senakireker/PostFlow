import { useEffect, useState } from 'react'
import { createPost } from '../interfaces/postModel'

function PostForm({ addPost, updatePost, editingPost, setEditingPost }) {
  const [fullName, setFullName] = useState('')
  const [mood, setMood] = useState('')
  const [postText, setPostText] = useState('')

  useEffect(() => {
    if (editingPost) {
      setFullName(editingPost.fullName)
      setMood(editingPost.mood)
      setPostText(editingPost.content)
    }
  }, [editingPost])

  const handleSubmit = () => {
    if (fullName.trim() === '' || mood === '' || postText.trim() === '') {
      alert('Please fill in all fields.')
      return
    }

    if (postText.length > 280) {
      alert('Post cannot be longer than 280 characters.')
      return
    }

    if (editingPost) {
      const updatedPost = {
        ...editingPost,
        fullName,
        username: fullName.toLowerCase().replaceAll(' ', ''),
        mood,
        content: postText
      }

      updatePost(updatedPost)
    } else {
      const newPost = createPost(fullName, mood, postText)
      addPost(newPost)
    }

    setFullName('')
    setMood('')
    setPostText('')
  }

  const cancelEdit = () => {
    setFullName('')
    setMood('')
    setPostText('')
    setEditingPost(null)
  }

  return (
    <section className="composer">
      {editingPost && <p className="editing-message">Editing post...</p>}

      <input
        type="text"
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">Mood</option>
        <option value="😊 Happy">😊 Happy</option>
        <option value="😢 Sad">😢 Sad</option>
        <option value="😎 Cool">😎 Cool</option>
        <option value="😍 Excited">😍 Excited</option>
        <option value="😴 Tired">😴 Tired</option>
        <option value="🤔 Thoughtful">🤔 Thoughtful</option>
        <option value="🥳 Celebrating">🥳 Celebrating</option>
      </select>

      <textarea
        maxLength="280"
        placeholder="What's on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      ></textarea>

      <div className="composer-bottom">
        <span className={postText.length > 260 ? 'limit danger' : 'limit'}>
          {postText.length} / 280
        </span>

        <div className="composer-buttons">
          {editingPost && (
            <button className="cancel-button" onClick={cancelEdit}>
              Cancel
            </button>
          )}

          <button onClick={handleSubmit}>
            {editingPost ? 'Update' : 'Post'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default PostForm