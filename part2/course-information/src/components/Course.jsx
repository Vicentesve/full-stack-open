import React from 'react'
import Total from './Total'

const Course = ({ course }) => {
  const { name, parts } = course
  return (
    <div>
      <h1>{name}</h1>

      <ul>
        {parts.map((part) => (
          <li key={part?.id}>
            {part?.name} {part?.exercises}
          </li>
        ))}
      </ul>

      <Total parts={parts} />
    </div>
  )
}

export default Course
