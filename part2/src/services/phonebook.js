import axios from 'axios'

export const getAllPersons = () => {
	return axios.get('http://localhost:3001/persons')
}

export const addPerson = (data) => {
	return axios.post('http://localhost:3001/persons', data)
}

export const deletePerson = (id) => {
	return axios.delete(`http://localhost:3001/persons/${id}`)
}

export const updatePerson = (id, newData) => {
	return axios.put(`http://localhost:3001/persons/${id}`, newData)
}