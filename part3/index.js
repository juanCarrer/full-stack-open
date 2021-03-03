const express = require('express')
const app = express()

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Maty Poppendick',
		number: '39-23-6423122',
	}
]

app.get('/api/persons', (require, response) => {
	response.json(persons)
})

app.get('/info', (require, response) => {
	response.send(`
		<p>Phonebook has info for ${persons.length} persons</p>
		<p>${new Date()}<p>
	`)
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`server listen on port ${PORT}`)
})