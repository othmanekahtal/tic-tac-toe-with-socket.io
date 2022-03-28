export const StartGame = ({setOption}) => {
  return (
    <div className="h-1/2 w-1/2 bg-gray-100 rounded-lg p-10 flex flex-col justify-center items-center gap-y-10">
      <h1 className="font-bold text-2xl capitalize">let's start the game !</h1>
      <div className="flex gap-x-4">
        <button
          className="bg-blue-400 text-white rounded-md px-8 py-3 transition hover:bg-blue-500"
          onClick={() => setOption('friend')}
        >
          Start
        </button>
      </div>
    </div>
  )
}
