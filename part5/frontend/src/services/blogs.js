import axios from 'axios'
const baseUrl = '/api/blogs'

let TOKEN = null

const setToken = (token) => {
  TOKEN = token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  }

  try {
    const { data } = await axios.post(baseUrl, newBlog, config)
    return data
  } catch ({ response }) {
    return Promise.reject(new Error(response.data.error)) 
  }
}

export default {
  getAll,
  create,
  setToken
}