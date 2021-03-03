const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

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

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/info', (request, response) => {
	response.send(`
		<p>Phonebook has info for ${persons.length} persons</p>
		<p>${new Date()}<p>
	`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)

	const person = persons.find(item => item.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(item => item.id !== id)

	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	newPerson = request.body
	
	if (!newPerson.name || !newPerson.number) {
		response.status(400).json({ error: 'name and number required' })
		return
	}

	if (persons.find(item => item.name === newPerson.name)) {
		response.status(400).json({ error: 'name must be unique' })
		return
	}

	newPerson.id = Math.floor(Math.random() * 10000)
	persons.push(newPerson)

	response.status(201).json(newPerson)
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`server listen on port ${PORT}`)
})