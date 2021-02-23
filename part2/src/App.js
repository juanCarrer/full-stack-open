import React, { useState, useEffect } from 'react'
import { getAllPersons } from './services/phonebook'

const Filter = ({ handleChange }) => {
	return (
		<div>
			filter shown with <input onChange={handleChange}/>
		</div>
	)
}

const PersonForm = ({ handleSubmit, handleName, name, handleNumber, number }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input onChange={handleName} value={name}/>
			</div>
			<div>
				number: <input onChange={handleNumber} value={number}/>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}

const Persons = ({ persons = []}) => {

	if (persons.length === 0) {
		return <h3>no persons Found...</h3>
	}

	return (
		<div>
		{
			persons.map(item => ( 
				<p key={item.name}>{item.name} {item.number}</p>
			))
		}
		</div>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterKeyword, setFilterkeyword] = useState('')
	const [filteredPersons, setFilteredPersons] = useState([])

	useEffect(() => {
		getAllPersons()
			.then(data => {
				setPersons(data)
			})
			.catch(errorMessage => {
				console.error(errorMessage)
			}) 
	}, [])

	useEffect(() => {
		if (persons.length === 0 || !Array.isArray(persons)) return

		const filtered = persons.filter(({name}) => {
			return name.includes(filterKeyword)
		})
		setFilteredPersons(filtered)
	}, [persons, filterKeyword])


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
			<Filter handleChange={handleFilterkeywordChange}/>

			<h2>Add a new</h2>
			
			<PersonForm
				handleSubmit={handleSubmit}
				handleName={handleNameChange}
				name={newName}
				handleNumber={handleNumberChange}
				number={newNumber}
			/>

			<h2>Numbers</h2>

			<Persons persons={filteredPersons}/>
		</div>
	)
}

export default App