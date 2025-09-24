import React from 'react'

const Dialog = ({ children, visible }) => {
  if (!visible) return
  return (
    <div className='dialog-container'>
      {children}
    </div>
  )
}

export default Dialog
