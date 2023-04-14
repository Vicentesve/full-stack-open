import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue.exercises)
  }, 0)

  return <strong>Total of {total} exercises</strong>
}

export default Total
