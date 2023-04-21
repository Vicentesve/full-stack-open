require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./db')
const Person = require('./models/Person.model')
const { default: mongoose } = require('mongoose')

// Unknowpoint function
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Init app
const app = express()

// Databse
connectDB()

// Middlewares
app.use(express.static('dist'))
morgan.token('req-body', (req, res) => JSON.stringify(req.body))
app.use(express.json())
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
  Person.find().then((persons) => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {
  const currentDate = new Date().toUTCString()

  Person.countDocuments({})
    .then((count) => {
      res.send(
        `<div><p>Phonebook has info for ${count} people</p><p>${currentDate}</p></div>`
      )
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('Internal Server Error')
    })
})

app.get('/api/persons/:id', (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id)

    Person.findById(id)
      .then((person) => res.json(person))
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Invalid ID' })
  }
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result)
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const person = {
    name: name,
    number: number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.status(200).json(updatedPerson)
    })
    .catch((error) => next(error))
})

const generateRamdomID = () => {
  return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name) return res.json({ error: 'missing name' })
  if (!number) return res.json({ error: 'missing number' })

  Person.findOne({ name: name }).then((person) => {
    if (person) {
      res.json({ error: 'name must be unique' })
    } else {
      const person = new Person({
        name,
        number
      })
      persons = persons.concat(person)
      person
        .save()
        .then((result) => {
          res.json(result)
        })
        .catch((error) => {
          console.log(error)
          res.json({ error: 'Internal server error' })
        })
    }
  })
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
