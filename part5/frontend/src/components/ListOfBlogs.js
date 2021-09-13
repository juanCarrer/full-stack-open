import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs'
import Blog from './Blog'
import { CreateBlogForm } from './CreateBlogForm';

export const ListOfBlogs = ({ user, handleLogOut }) => {
  const [blogs, setBlogs] = useState([])
  console.log(blogs)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleAddNewBlog = (newBlog) => {
    setBlogs([...blogs, newBlog])
  }

  return (
    <div>
        <h1>blogs</h1>
      <div>
        <h2>{user.userName} logged in</h2>
        <button onClick={handleLogOut}>logout</button>
      </div>
      <CreateBlogForm onNewpost={handleAddNewBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}