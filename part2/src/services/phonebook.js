import axios from 'axios'

export const getAllPersons = () => {
	return axios.get('http://localhost:3001/persons')
		.then(response => {
			return response.data
		})
		.catch(err => {
			return err.message
		}) 
}

export const addPerson = (data) => {
	return axios.post('http://localhost:3001/persons', data)
		.then(response => {
			return response.data
		})
		.catch(err => {
			return err.message
		}) 
}

export const deletePerson = (id) => {
	return axios.delete(`http://localhost:3001/persons/${id}`)
		.then(response => {
			return response.data
		})
		.catch(err => {
			return err.message
		})
}