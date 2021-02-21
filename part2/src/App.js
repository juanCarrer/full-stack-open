import React, { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterKeyword, setFilterkeyword] = useState('')
	
	const filteredPersons = persons.filter(({name}) => {
		return name.includes(filterKeyword)
	}) 

	const handleSubmit = (event) => {
		event.preventDefault()
		if (persons.some(item => item.name === newName)) {
			alert(`${newName} is already added to phonebook`)
			setNewName('')
			setNewNumber('')
			return
		}

		setPersons([...persons, { name: newName, number: newNumber }])
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterkeywordChange = (event) => {
		setFilterkeyword(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with <input onChange={handleFilterkeywordChange}/>
			</div>
			<h2>Add a new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input onChange={handleNameChange} value={newName}/>
				</div>
				<div>
					number: <input onChange={handleNumberChange} value={newNumber}/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{
					filteredPersons && filteredPersons.map(item => {
						return <p key={item.name}>{item.name} {item.number}</p>
					})
				}   
			</div>
		</div>
	)
}

export default App