const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Define a custom token that logs the request body
morgan.token('req-body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
// Configure Morgan to log HTTP requests and responses, including the request body
app.use(morgan(':method :url :status :response-time ms :req-body'))
app.use(cors())

let persons = [
  {
    name: 'Arto Hellas',
    number: '44-3232-4343',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  },
  {
    name: 'Vicente',
    number: '73333499393',
    id: 5
  },
  {
    name: 'Sebastian',
    number: '40394-324324324',
    id: 6
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const currentDate = new Date().toUTCString()
  res.send(
    `<div><p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p></div>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const person = persons.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    persons = persons.filter((note) => note.id !== id)
    console.log(persons)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

const generateRamdomID = () => {
  return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name) return res.json({ error: 'missing name' })
  if (!number) return res.json({ error: 'missing number' })

  const checkNumber = persons.some((person) => person.name === name)
  if (checkNumber) return res.json({ error: 'name must be unique' })

  const person = {
    id: generateRamdomID(),
    name,
    number
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
