import axios from 'axios'
const baseUrl = '/api/notes'

/* const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
} */

const getAll = async () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  }
  const response = await request
  return response.data.concat(nonExisting)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default {
  getAll,
  create,
  update
}
