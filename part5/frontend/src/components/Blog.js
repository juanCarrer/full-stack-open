import React from 'react'
const Blog = ({ blog }) => {

  return (
  <div>
    <h3>
      • {blog.title} | {blog.user.userName}
    </h3>
  </div>
  )
}

export default Blog
