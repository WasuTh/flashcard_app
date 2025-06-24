import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

function App() {

  return (
    <>

    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>

    </>
  )
}

export default App
