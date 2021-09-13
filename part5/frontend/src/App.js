import React, { useState, useEffect } from 'react'
import { ListOfBlogs } from './components/ListOfBlogs'
import { LoginForm } from './components/LoginForm'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [notification, setNotification] = useState('')
  const [user, setUser] = useState(null)

  const newNotification = (message, error = false) => {
    setNotification({message, error})
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

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
    <div>
      {
        notification && (
          <h1
            className={`mainNotification ${notification.error ? 'mainNotification--error' : ''}`}
          >
            {notification.message}
          </h1>
        )
      }
    {
      user 
        ? <ListOfBlogs user={user} handleLogOut={handleDeleteUser} setNotification={newNotification}/>
        : <LoginForm handleLoginUser={handleUpdateUser} setNotification={newNotification}/>
    }
    </div>
  )
}

export default App