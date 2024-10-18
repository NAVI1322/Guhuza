import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/SignUp/Signup'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import ProfilePage from './pages/Profile/ProfilePage'
import AboutProfile from './pages/Profile/ProfileAbout'
import HomePage from './pages/Homepage/Homepage'
import TestCreator from './pages/TestCreator/TestCreator'
import TestCreator2 from './pages/TestCreator2/TestCreator2'
import TestStructure from './pages/TestStructure/TestStructure'
import Test from './pages/Test/Test'

function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testcreator" element={<TestCreator />} />
        <Route path="/t2" element={<TestCreator2 />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/About" element={<AboutProfile/>} />
        <Route path="/teststructure" element={<TestStructure/>} />
        <Route path="/test" element={<Test/>} />
      </Routes>
    </>
  )
}

export default App