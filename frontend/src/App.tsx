import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/SignUp/Signup'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import ProfilePage from './pages/Profile/ProfilePage'
import HomePage from './pages/Homepage/Homepage'
import TestCreator from './pages/TestCreator/TestCreator'
import TestStructure from './pages/TestStructure/TestStructure'
import Test from './pages/Test/Test'
import Recruiter from './pages/Recruiter/Recruiter'
import Applications from './pages/Applications/Applications'

function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testcreator" element={<TestCreator />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/teststructure" element={<TestStructure/>} />
        <Route path="/test" element={<Test/>} />
      </Routes>
    </>
  )
}

export default App