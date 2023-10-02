import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} /> 
          <Route path="/sign-up" element={<SignUpForm />} />
        </Routes>
      </Router>
  )
}
export default App
