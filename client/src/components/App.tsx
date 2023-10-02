import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { Container } from '@mui/material'
import background from '../books.jpg'
import Header from './Header'

const App = () => {
  window.onbeforeunload = function () {
    localStorage.clear()
  }
  return (
      <Router>
        <div className='app-container' />
        <Header />
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashb" element={<LoginForm />} />
          <Route path="/singup" element={<SignupForm />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
  )
}
export default App
