import React, { useState, useEffect } from 'react'
import { ListOfBlogs } from './components/ListOfBlogs'
import { LoginForm } from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userDataJSON = window.localStorage.getItem('user-blogAplication')
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON)
      setUser(userData)
    }
  }, [])
 
  const handleUpdateUser = (newUser) => {
    setUser(newUser)
    window.localStorage.setItem('user-blogAplication', JSON.stringify(newUser))
  }

  const handleDeleteUser = () => {
    window.localStorage.removeItem('user-blogAplication')
    setUser(null)
  }

  return (
    user
      ? <ListOfBlogs user={user} handleLogOut={handleDeleteUser}/>
      : <LoginForm handleLoginUser={handleUpdateUser} />
  )
}

export default App