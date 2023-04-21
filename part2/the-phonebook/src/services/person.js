import axios from 'axios'

// const baseUrl = 'api/persons'
const baseUrl = 'http://localhost:3001/api/persons'

const getAllPersons = async () => {
  const response = await axios.get(`${baseUrl}`)

  return response.data
}

const createNewPerson = async (personObject) => {
  const response = await axios.post(`${baseUrl}`, personObject)
  return response.data
}

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)

  return response.status
}

const updatePhoneNumber = async (id, newPerson) => {
  const response = await axios.put(`${baseUrl}/${id}`, newPerson)
  return response.data
}

export default {
  getAllPersons,
  createNewPerson,
  deletePerson,
  updatePhoneNumber
}
