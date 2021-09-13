import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs'
import Blog from './Blog'

export const ListOfBlogs = ({ user, handleLogOut }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>{user.userName} logged in</h2>
      <button onClick={handleLogOut}>logout</button>
      <div>
        <h1>blogs</h1>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}