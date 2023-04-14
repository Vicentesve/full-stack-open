import React from 'react'

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul className="ul-list-persons">
      {persons.map((persons, i) => (
        <li key={`${persons.name}_${i}`}>
          <span>
            {persons.name} {persons.number}
          </span>
          <button
            className="button delete"
            onClick={() => handleDelete({ name: persons.name, id: persons.id })}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Persons
