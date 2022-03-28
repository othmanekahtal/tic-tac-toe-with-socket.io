import React, {useState, useEffect, useRef} from 'react'
import toast, {Toaster} from 'react-hot-toast'

import io from 'socket.io-client'
import {calculateWinner} from '../helper'
import Board from './board'
import {v4} from 'uuid'
const SERVER_ENDPOINT = 'http://localhost:8080/'
const socket = new io(SERVER_ENDPOINT)

const Game = ({option}) => {
  // create a matrix for store the steps
  const [history, setHistory] = useState(Array(9).fill(null))
  // to get the winner
  const winner = calculateWinner(history)
  // to know who is the next player :
  const [xO, setXo] = useState('x')
  const me = useRef(null)
  const [play, setPlay] = useState(true)
  const [room, setRoom] = useState({
    id: null,
    type: null,
    player: null,
    player1: null,
  })
  const [start, setStart] = useState(false)
  const handleClick = i => {
    if (!play) return
    if (history[i] || winner) return
    setHistory(previous => {
      previous[i] = xO
      socket.emit('play', {
        prev_player: me.current,
        xo: xO === 'x' ? 'o' : 'x',
        history: previous,
      })
      return previous
    })
    setXo(previous => (previous === 'x' ? 'o' : 'x'))
  }
  const joinGame = e => {
    e.preventDefault()
    setRoom(previous => ({
      ...previous,
      id: e.target.children[0].value,
      player1: e.target.children[1].value,
    }))
    me.current = e.target.children[1].value
    console.log(me.current)
  }
  useEffect(() => {
    if (!room.id) return
    if (room.type === 'create') {
      socket.emit('createGame', {...room, type: undefined})
    } else {
      socket.emit('joinGame', {...room, type: undefined})
    }
  }, [room])
  useEffect(() => {
    socket.on('startGame', ({status, ...room}) => {
      console.log(`this is response ${status}`)
      !status && toast.error('No room with this id!')
      setStart(status)
    })
    socket.on('change', ({history, xo, next_player}) => {
      console.log({history, xo, next_player})
      console.log(`this ${me.current},this next player ${next_player}`)
      console.log(next_player === me.current)
      setPlay(next_player === me.current)
      setXo(xo)
      setHistory(history)
    })
  }, [])

  const createGame = e => {
    e.preventDefault()
    me.current = e.target.children[0].value
    console.log(e.target.children[0].value)
    setRoom(previous => ({
      ...previous,
      player: e.target.children[0].value,
    }))
    // TODO:todo create room
  }
  if ((option === 'friend') & (start === false))
    return (
      <div className="h-1/2 w-1/2 bg-gray-100 rounded-lg p-10 flex flex-col justify-center items-center gap-y-10">
        <Toaster />
        <h1 className="font-bold text-2xl capitalize">Choose one !</h1>
        <div className="flex gap-x-4">
          <button
            className="bg-blue-400 text-white rounded-md px-8 py-3 transition hover:bg-blue-500"
            onClick={() => setRoom({id: v4(), type: 'create'})}
          >
            create new room
          </button>
          <button
            className="bg-blue-400 text-white rounded-md px-8 py-3 transition hover:bg-blue-500"
            onClick={() => setRoom({id: '', type: 'join'})}
          >
            join to room
          </button>
        </div>
        {room.id && room.type === 'create' && !room.player && (
          <form className="flex gap-x-4" onSubmit={createGame}>
            <input
              type="text"
              className="input rounded"
              placeholder="Enter your name"
              required
            />
            <button
              type="submit"
              className="bg-blue-400 text-white rounded-md px-8 py-3 transition hover:bg-blue-500"
            >
              create
            </button>
          </form>
        )}
        {room.id && room.player && (
          <div>
            room id:
            <span className="inline-block bg-slate-200 rounded-md p-2 font-italic">
              {room.id}
            </span>
          </div>
        )}
        {room.type === 'join' && (
          <form className="flex gap-x-4" onSubmit={joinGame}>
            <input
              type="text"
              className="input rounded"
              placeholder="Enter room id"
              required
              name="code"
            />
            <input
              type="text"
              className="input rounded"
              placeholder="Enter your name"
              required
              name="player_name"
            />
            <button
              type="submit"
              className="bg-blue-400 text-white rounded-md px-8 py-3 transition hover:bg-blue-500"
            >
              join
            </button>
          </form>
        )}
        {room.player && <div>we waiting your friend 🥲 ...</div>}
      </div>
    )
  return (
    <div className="py-12 text-center space-y-4">
      <h1 className=" text-lg font-bold">Tic Tac Toe</h1>
      <Board squares={history} onClick={handleClick} />
      <div className="info-wrapper">
        <h3 className="font-medium">
          {winner ? 'Winner: ' + winner : 'Next Player: ' + xO}
        </h3>
      </div>
    </div>
  )
}

export default Game
