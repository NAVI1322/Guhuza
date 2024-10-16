import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/SignUp/Signup'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import ProfilePage from './pages/Profile/ProfilePage'
import AboutProfile from './pages/Profile/ProfileAbout'
import HomePage from './pages/Homepage/Homepage'

function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/About" element={<AboutProfile/>} />
      </Routes>
    </>
  )
}

export default App