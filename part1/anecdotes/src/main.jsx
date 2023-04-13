import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { votes: 0, text: 'If it hurts, do it more often.' },
    {
      votes: 0,
      text: 'Adding manpower to a late software project makes it later!'
    },
    {
      votes: 0,
      text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'
    },
    {
      votes: 0,
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'
    },
    { votes: 0, text: 'Premature optimization is the root of all evil.' },
    {
      votes: 0,
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    },
    {
      votes: 0,
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    },
    { votes: 0, text: 'The only way to go fast, is to go well.' }
  ])

  const [selected, setSelected] = useState(0)
  const [maxSelected, setMaxSelected] = useState(0)

  const getNextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const newAnecdotes = [...anecdotes]
    newAnecdotes[selected].votes += 1

    setAnecdotes(newAnecdotes)

    const maxIndex = anecdotes.reduce(
      (maxIndex, currentObj, currentIndex, array) => {
        const currentValue = currentObj.votes
        if (currentValue > array[maxIndex].votes) {
          return currentIndex
        } else {
          return maxIndex
        }
      },
      0
    )

    setMaxSelected(maxIndex)
  }

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected].text}</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={getNextAnecdote}>next anecdotes</button>
      </div>

      <h1>Anecdotes with most votes</h1>
      <p>{anecdotes[maxSelected].text}</p>
      <p>has {anecdotes[maxSelected].votes} votes</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
