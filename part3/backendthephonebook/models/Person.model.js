const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (doc, retObj, options) => {
    retObj.id = retObj._id.toString()
    delete retObj._id, delete retObj.__v
  }
})

const Person = mongoose.model('persons', personSchema)

module.exports = Person
