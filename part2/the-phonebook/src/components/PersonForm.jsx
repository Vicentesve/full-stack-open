import React from 'react'

const PersonForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => {
  return (
    <form className="form-person" onSubmit={handleSubmit}>
      <input value={newName} onChange={handleNameChange} placeholder="Name" />
      <input
        value={newNumber}
        onChange={handleNumberChange}
        placeholder="Phone number"
      />
      <button className="button add" type="submit">
        Add
      </button>
    </form>
  )
}

export default PersonForm
