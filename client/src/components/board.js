import React from 'react'
import Square from './square'

const Board = ({squares, onClick}) => {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={`square-${i}`} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  )
}

export default Board
