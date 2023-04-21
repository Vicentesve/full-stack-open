import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './index.css'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const indexPersonExist = checkIfPersonExists()

    if (indexPersonExist) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return
      }

      personService
        .updatePhoneNumber(indexPersonExist.id, personObject)
        .then((personUpdated) => {
          setPersons(
            persons.map((person) =>
              person.id !== indexPersonExist.id ? person : personUpdated
            )
          )
          handleNotification(`Updated ${personUpdated.name}`)
          setNewName('')
          setNewNumber('')
        })
    } else {
      personService
        .createNewPerson(personObject)
        .then((personCreated) => {
          setPersons(persons.concat(personCreated))
          handleNotification(`Added ${personCreated.name}`)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          const { name, number } = error.response.data
          handleNotification(`${name ?? ''}\n${number ?? ''}`)
        })
    }
  }

  const handleNotification = (message, type = false) => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleDelete = ({ name, id }) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((persons) => persons.id !== id))
          handleNotification(`${name} deleted successully!`)
        })
        .catch((error) => {
          handleNotification(
            `Information of ${name} has already been removed from server`,
            true
          )
        })
    }
  }

  const checkIfPersonExists = () => {
    return persons.find((person) => person.name === newName)
  }

  const personsToShow =
    filter.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().startsWith(filter.toLowerCase())
        )
      : persons

  useEffect(() => {
    personService.getAllPersons().then((persons) => setPersons(persons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {message ? (
        <Notification message={message.message} type={message.type} />
      ) : null}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
