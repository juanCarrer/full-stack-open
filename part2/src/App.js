import React, { useState, useEffect } from 'react'
import { getAllPersons, addPerson } from './services/phonebook'
import { Filter } from './components/Phonebook/Filter'
import { PersonForm } from './components/Phonebook/PersonForm'
import { Persons } from './components/Phonebook/Persons'

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

		addPerson({ name: newName, number: newNumber })
			.then(response => {
				setPersons([...persons, response])
			})
			.catch(errorMessage => {
				console.error(errorMessage)
			})
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