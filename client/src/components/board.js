import React from 'react'
import Square from './square'

const Board = ({squares, onClick}) => {
  return (
    <div className="p-4 rounded shadow inline-grid grid-cols-3 gap-2">
      {squares.map((square, i) => (
        <Square key={`square-${i}`} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  )
}
export default Board
