import React, { useState } from 'react'

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas' }
	]) 
	const [ newName, setNewName ] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		setPersons([...persons, { name: newName }])
		setNewName('')
	}

	const handleChange = (event) => {
		setNewName(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input onChange={handleChange} value={newName}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{
					persons && persons.map(item => {
						return <p key={item.name}>{item.name}</p>
					})
				}   
			</div>
		</div>
	)
}

export default App