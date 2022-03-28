const http = require('http')
const socketIO = require('socket.io')

const server = http.createServer()
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
})

const PORT = process.env.PORT || 8080
let game = {}
io.on('connection', socket => {
  socket.join('room')
  socket.on('createGame', room => {
    console.log(room)
    game = room
  })
  socket.on('joinGame', room => {
    if (game.id === room.id) {
      console.log(
        `this is game ${game} and this room ${room} this is condition ${
          game.id === room.id
        }`,
      )
      game['player1'] = room['player1']
      console.log(`info about game ${JSON.stringify(game)}`)
      io.to('room').emit('startGame', {
        status: true,
        ...game,
        id: undefined,
      })
    } else {
      socket.emit('startGame', {
        status: false,
      })
    }
  })
  socket.on('play', ({prev_player, xo, history}) => {
    console.log({prev_player, xo, history})
    io.to('room').emit('change', {
      history: history,
      xo: xo,
      next_player: prev_player == game.player1 ? game.player : game.player1,
    })
    // io.to('room').emit('role', who == game.player1 ? game.player : game.player1)
  })
  socket.on('finishedGame', () => {})
  //TODO: show winner and loser or draw
})

server.listen(PORT, () => {
  console.log(`Server is ready to play on port ${PORT}`)
})
