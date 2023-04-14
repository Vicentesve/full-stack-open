import React from 'react'

const Notification = ({ message, type }) => {
  console.log(message, type)
  return (
    <div className={`notification ${type ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

export default Notification
