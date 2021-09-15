import React, { useState, forwardRef, useImperativeHandle } from 'react'

export const Toggle = forwardRef(({ children, buttonText }, ref) => {
  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {
        !visible 
          ? (
            <button onClick={toggleVisibility}>{buttonText}</button>
          )
          : (
            <div>
              {children}
              <button onClick={toggleVisibility}>
                Cancel
              </button>
            </div>
          )
      }
    </div>
  )
})