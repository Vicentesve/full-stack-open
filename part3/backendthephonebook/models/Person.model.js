const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Minimum length for name is 3'],
    required: [true, 'Name is required'],
    unique: true
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    minLength: [8, 'Minimum length for a number is 8'],
    validate: {
      validator: function (value) {
        return /^[0-9]{2,3}-[0-9]{6,}$/.test(value)
      },
      message: (props) => `${props.value} is not a valid phone number!`
    }
  }
})

personSchema.set('toJSON', {
  transform: (doc, retObj, options) => {
    retObj.id = retObj._id.toString()
    delete retObj._id, delete retObj.__v
  }
})

const Person = mongoose.model('persons', personSchema)

module.exports = Person
