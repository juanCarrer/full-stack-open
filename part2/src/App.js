import React, { useState, useEffect } from 'react'
import { getAllPersons, addPerson, updatePerson } from './services/phonebook'
import { Filter } from './components/Phonebook/Filter'
import { PersonForm } from './components/Phonebook/PersonForm'
import { Persons } from './components/Phonebook/Persons'
import { Notification } from './components/Phonebook/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterKeyword, setFilterkeyword] = useState('')
	const [filteredPersons, setFilteredPersons] = useState([])
	const [notificationMessage, setNotificationMessage] = useState(null);

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

	const updateNotificationMessage = (newMessage) => {
		setNotificationMessage(newMessage)

		setTimeout(() => {
			setNotificationMessage(null)
		}, 5000)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const existingPerson = persons.find(item => item.name === newName)
		
		if (existingPerson) {
			if(window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one`)) {
				updatePerson(existingPerson.id, {...existingPerson, number: newNumber})
					.then(data => {
						updateNotificationMessage(`Updated number of ${data.name}`)
						setPersons(persons.map(item => item.id === data.id ? data : item))
					})
					.catch(err => {
						console.error(err)
					})
			}

			setNewName('')
			setNewNumber('')
			return
		} 

		addPerson({ name: newName, number: newNumber })
			.then(response => {
				updateNotificationMessage(`Added ${response.name}`)
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

	const handleUpdatePersons = (newlist) => {
		setPersons(newlist)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notificationMessage} />
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

			<Persons persons={filteredPersons} updatePersons={handleUpdatePersons}/>
		</div>
	)
}

export default App