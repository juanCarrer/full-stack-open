import axios from 'axios'
const baseURl = '/api/login'

const login = async (userName, password) => {
  const { data } = await axios.post(baseURl, { userName, password })
  return data
}

export default login