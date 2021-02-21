import React, { useState } from 'react'

export const App = ({ anecdotes = [] }) => {
	const empyVotes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(empyVotes)
	
	const handleAnecdote = () => {
		setSelected(Math.floor(Math.random() * anecdotes.length))
	}

	const handleVotes = () => {
		const newState = [...votes]
		newState[selected]++
		setVotes(newState)
	}

	return (
		<div>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<button onClick={handleVotes}>vote</button>
			<button onClick={handleAnecdote}>next anecdote</button>
		</div>
	)
}
