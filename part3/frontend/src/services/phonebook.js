import axios from 'axios'

export const getAllPersons = () => {
	return axios.get('http://localhost:3001/api/persons')
}

export const addPerson = (data) => {
	return axios.post('http://localhost:3001/api/persons', data)
}

export const deletePerson = (id) => {
	return axios.delete(`http://localhost:3001/api/persons/${id}`)
}

export const updatePerson = (id, newData) => {
	return axios.put(`http://localhost:3001/api/persons/${id}`, newData)
}