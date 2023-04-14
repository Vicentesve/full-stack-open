import React from 'react'

const Note = ({ content, important, toggleImportance }) => {
  const label = important ? 'make not important' : 'make important'
  return (
    <li className="note">
      <span>{content}</span>
      <button style={{ marginLeft: '10px' }} onClick={toggleImportance}>
        {label}
      </button>
    </li>
  )
}

export default Note
