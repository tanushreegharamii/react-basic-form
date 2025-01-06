import { Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import WelcomePage from './Components/WelcomePage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/welcome' element={<WelcomePage/>} />
    </Routes>
    </>
  )
}

export default App
