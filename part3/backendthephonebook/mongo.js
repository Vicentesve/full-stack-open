const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.madiwye.mongodb.net/db-the-phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('persons', personSchema)

if (process.argv.length < 4) {
  console.log('Phonebook:')
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person
    .save()
    .then((result) => {
      console.log(`added ${result.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error('Error saving person:', err.message)
      mongoose.connection.close()
    })
}
