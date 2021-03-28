import axios from 'axios'

const baseUrl = 'https://blooming-earth-71059.herokuapp.com/api'

export const getAllPersons = () => {
	
	return axios.get(`${baseUrl}/persons`)
}

export const addPerson = (data) => {
	return axios.post(`${baseUrl}/persons`, data)
}

export const deletePerson = (id) => {
	return axios.delete(`${baseUrl}/persons/${id}`)
}

export const updatePerson = (id, newData) => {
	return axios.put(`${baseUrl}/persons/${id}`, newData)
}