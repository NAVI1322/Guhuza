import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import Signup from './components/SignUp/Signup'
import Login from './components/Login/Login'
import Verify2FA from './components/Verify2FA/Verify2FA'
import Dashboard from './components/Dashboard/Dashboard'

function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/HomePage" />} />
        <Route path='/HomePage' element={<HomePage></HomePage>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App