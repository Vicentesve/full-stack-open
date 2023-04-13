import React from 'react'
import ReactDOM from 'react-dom/client'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((part, i) => (
        <Part key={i} part={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((acc, part) => part.exercises + acc, 0)
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
