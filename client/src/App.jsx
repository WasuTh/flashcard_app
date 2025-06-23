import { useState } from 'react'
import Navbar from './components/navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
      <div className='text-red-500'>
        hello flashcard
      </div>
    </>
  )
}

export default App
