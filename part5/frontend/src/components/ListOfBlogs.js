import React, { useEffect, useState, useRef } from 'react';
import blogService from '../services/blogs'
import Blog from './Blog'
import { CreateBlogForm } from './CreateBlogForm';
import { Toggle, } from './Toggle'

export const ListOfBlogs = ({ user, handleLogOut, setNotification }) => {
  const [blogs, setBlogs] = useState([])
  const toggleRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleAddNewBlog = (newBlog) => {
    setBlogs([...blogs, {title: newBlog.title, user: {userName: user.userName }}])
    toggleRef.current.toggleVisibility()
  }

  return (
    <div>
        <h1>blogs</h1>
      <div>
        <h2>{user.userName} logged in</h2>
        <button onClick={handleLogOut}>logout</button>
      </div>
      <Toggle buttonText='New blog' ref={toggleRef}>
        <CreateBlogForm onNewpost={handleAddNewBlog} setNotification={setNotification}/>
      </Toggle>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}