import React from 'react'

const Square = ({value, onClick}) => {
  return (
    <button className="bg-gray-100 p-1 w-10 h-10 block" onClick={onClick}>
      {value}
    </button>
  )
}

export default Square
