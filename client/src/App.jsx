import {useState} from 'react'
import Game from './components/game'
import {StartGame} from './components/startGame'
function App() {
  const [option, setOption] = useState('')
  if (!option) return <StartGame {...{option, setOption}} />
  return <Game option={option} />
}

export default App
