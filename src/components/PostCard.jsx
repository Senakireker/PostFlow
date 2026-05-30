function PostCard({ post, likePost, deletePost, setEditingPost }) {
  const getAvatarColor = (name) => {
    const colors = ['#7c3aed', '#2563eb', '#16a34a', '#dc2626', '#ea580c']
    const index = name.length % colors.length

    return colors[index]
  }

  return (
    <article className="post">
      <div
        className="avatar"
        style={{ backgroundColor: getAvatarColor(post.fullName) }}
      >
        {post.fullName.charAt(0).toUpperCase()}
      </div>

      <div className="post-content">
        <div className="post-top">
          <strong>{post.fullName}</strong>
          <span>@{post.username}</span>
          <span>·</span>
          <span>{post.mood}</span>
        </div>

        <p>{post.content}</p>

        <small>{post.createdAt}</small>

        <div className="actions">
          <button onClick={() => likePost(post.id)}>{post.liked ? '❤️' : '🤍'} {post.likes}</button>
          <button onClick={() => setEditingPost(post)}>Edit</button>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      </div>
    </article>
  )
}

export default PostCard