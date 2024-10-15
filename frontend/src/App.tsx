import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/SignUp/Signup'
import Login from './components/Login/Login'
import Verify2FA from './components/Verify2FA/Verify2FA'
import Dashboard from './components/Dashboard/Dashboard'
import ProfilePage from './components/Profile/ProfilePage'
import AboutProfile from './components/Profile/ProfileAbout'
import HomePage from './components/Homepage/Homepage'

function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/About" element={<AboutProfile/>} />
      </Routes>
    </>
  )
}

export default App