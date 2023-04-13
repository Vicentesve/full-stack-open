import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const Button = ({ label, handleClick }) => {
  return <button onClick={handleClick}>{label}</button>
}

const GiveFeedback = ({ onClickGood, onClickNeutral, onClickBad }) => {
  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={onClickGood} label="good" />
      <Button handleClick={onClickNeutral} label="neutral" />
      <Button handleClick={onClickBad} label="bad" />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all / 3
  const positive = (good * 100) / all
  return (
    <div>
      <h1>statistics</h1>
      {all > 0 ? (
        <>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={all} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="positive" value={positive} />
            </tbody>
          </table>
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <GiveFeedback
        onClickGood={handleGood}
        onClickNeutral={handleNeutral}
        onClickBad={handleBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
