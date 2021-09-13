import React, { useState } from 'react'
import loginService from '../services/login'

export const LoginForm = ({ handleLoginUser }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService(userName, password)
      handleLoginUser(user)
    } catch (error) {
      setNotification('invalid username or password')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }
  
  return (
    <div>
      <h1>Login in blog aplication</h1>
      <form onSubmit={handleSubmit}>
        <span>Username  </span>
        <input
          type="text"
          placeholder='Username'
          value={userName}
          onChange={(event) => { setUserName(event.target.value) }}
        />
        <br />
        <span>Password </span>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => { setPassword(event.target.value) }}
        />
        <br />
        <button>login</button>
      </form>
      <p>{notification}</p>
    </div>
  )
}