import React, { useState, useEffect } from 'react'
import { ListOfBlogs } from './components/ListOfBlogs'
import { LoginForm } from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userDataJSON = window.localStorage.getItem('user-blogAplication')
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON)
      blogService.setToken(userData.token)
      setUser(userData)
    }
  }, [])
 
  const handleUpdateUser = (newUser) => {
    setUser(newUser)
    blogService.setToken(newUser.token)
    window.localStorage.setItem('user-blogAplication', JSON.stringify(newUser))
  }

  const handleDeleteUser = () => {
    window.localStorage.removeItem('user-blogAplication')
    blogService.setToken('')
    setUser(null)
  }

  return (
    user
      ? <ListOfBlogs user={user} handleLogOut={handleDeleteUser}/>
      : <LoginForm handleLoginUser={handleUpdateUser} />
  )
}

export default App