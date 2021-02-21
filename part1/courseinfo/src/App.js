import React, { useState } from 'react'

export const App = ({ anecdotes = [] }) => {
  const [selected, setSelected] = useState(0)

  const handelClick = () => {
  	setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      {anecdotes[selected]}
      <br/>
    	<button onClick={handelClick}>next anecdote</button>
    </div>
  )
}
