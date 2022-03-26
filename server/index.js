const http = require('http')
const socketIO = require('socket.io')

const server = http.createServer()
const io = socketIO(server)

const PORT = process.env.PORT || 8080

io.on('connection', socket => {
  socket.on('disconnect', () => {
    const player = getPlayer(socket.id)
    if (player) {
      removePlayer(player.id)
    }
  })

  // Player create new game
})

server.listen(PORT, () => {
  console.log(`Server is ready to play on port ${PORT}`)
})
