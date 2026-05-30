export function createPost(fullName, mood, content) {
  return {
    id: Date.now(),
    fullName,
    username: fullName.toLowerCase().replaceAll(' ', ''),
    mood,
    content,
    likes: 0,
    liked: false,
    createdAt: new Date().toLocaleString()
  }
}