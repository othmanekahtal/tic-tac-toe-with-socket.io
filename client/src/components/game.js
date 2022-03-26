import React, {useState} from 'react'
import {calculateWinner} from '../helper'
import Board from './board'

const Game = () => {
  // create a matrix for store the steps
  const [history, setHistory] = useState(Array(9).fill(null))
  // to get the winner
  const winner = calculateWinner(history)
  // to know who is the next player :
  const [xO, setXo] = useState('x')

  const handleClick = i => {
    console.log(i)
    if (history[i]) return
    setHistory(previous => {
      previous[i] = xO
      return previous
    })
    setXo(previous => (previous === 'x' ? 'o' : 'x'))
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Board squares={history} onClick={handleClick} />
      <div className="info-wrapper">
        <h3>{winner ? 'Winner: ' + winner : 'Next Player: ' + xO}</h3>
      </div>
    </>
  )
}

export default Game