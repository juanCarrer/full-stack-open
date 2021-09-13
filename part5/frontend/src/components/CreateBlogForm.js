import React, { useState } from 'react'
import blogService from '../services/blogs'

export const CreateBlogForm = ({ onNewpost, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [likes, setLikes] = useState('')
  const [url, setUrl] = useState('')

  const handleCreatePost = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title,
        author,
        likes,
        url
      })

      onNewpost(newBlog)
      setNotification('new blog added')
    } catch (error) {
      setNotification(error.message, true)
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreatePost}>
        title
        <input
          type="text"
          value={title}
          placeholder='title'
          onChange={event => setTitle(event.target.value)}
        />
        <br />
        Author
        <input
          type="text"
          value={author}
          placeholder='author'
          onChange={event => setAuthor(event.target.value)}
        />
        <br />
        likes
        <input
          type="number"
          value={likes}
          placeholder='0'
          onChange={event => setLikes(event.target.value)}
        />
        <br />
        url
        <input
          type="text"
          value={url}
          placeholder='url'
          onChange={event => setUrl(event.target.value)}
        />
        <br />
        <button>create</button>
      </form>
    </div>
  )
}

