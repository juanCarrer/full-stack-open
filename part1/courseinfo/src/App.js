import React, { useState } from 'react'


const Anecdote = ({ anecdotes, votes, index }) => {
	return (
		<div>
			<p>{anecdotes[index]}</p>
			<p>has {votes[index]} votes</p>
		</div>
	)
}

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

	const mostVotedIndex = votes.indexOf(Math.max(...votes))

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<Anecdote anecdotes={anecdotes} votes={votes} index={selected}/>
			<button onClick={handleVotes}>vote</button>
			<button onClick={handleAnecdote}>next anecdote</button>
			<h1>Anecdote with most votes</h1>
			<Anecdote anecdotes={anecdotes} votes={votes} index={mostVotedIndex}/>
		</div>
	)
}
