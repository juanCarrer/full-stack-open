require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (request) => {
	if (request.method === 'POST') {
		return JSON.stringify(request.body)
	}
	return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const errorHandler = (error, request, response, next) => {

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} 

	next(error)
}

app.get('/api/persons', (request, response) => {
	Person.find({})
		.then(data => {
			response.json(data)
		})
		.catch(error => {
			console.error('error on fetch data', error)
			response.json({ Error: error.message })
		})
})

app.get('/info', (request, response) => {
	Person.find({})
		.then(data => {
			response.send(`
				<p>Phonebook has info for ${data.length} persons</p>
				<p>${new Date()}<p>
			`)
		})
		.catch(error => {
			console.log(error.message)
			response.status(500).end()
		})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(data => {
			if (data) {
				response.json(data)
			}
			else {
				response.status(404).end()
			}
		})
		.catch(error => {
			next(error)
		})
})

app.delete('/api/persons/:id', (request, response) => {

	Person.findByIdAndRemove(request.params.id)
		.then(data => {
			if (data) {
				response.status(204).end()
			}
			else {
				console.log(data)
				response.status(404).end()
			}
		})
		.catch(error => {
			console.log('error', error.message)
			response.status(500).end()
		})
})

app.post('/api/persons', (request, response) => {
	newPersonData = {...request.body}
	
	if (!newPersonData.name || !newPersonData.number) {
		response.status(400).json({ error: 'name and number required' })
		return
	}

	// if (persons.find(item => item.name === newPersonData.name)) {
	// 	response.status(400).json({ error: 'name must be unique' })
	// 	return
	// }

	const newperson = new Person({
		name: newPersonData.name,
		number: newPersonData.number
	})

	newperson.save()
		.then(data => {
			response.status(201).json(data)
		})
		.catch(e => {
			console.error('error:', e.message)
			response.status(500).json(newPerson)
		})

})


app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`server listen on port ${PORT}`)
})