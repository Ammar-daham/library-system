import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import Footer from './Footer'
import Header from './Header'
import { Link } from 'react-router-dom'
import Logo from '../header-logo.png'

const App = () => {
  window.onbeforeunload = function () {
    localStorage.clear()
  }
  return (
    <Router>
      <div className="app-container">
        <Link to={`/`}>
          <img src={Logo} width="100" alt="logo" />
        </Link>
      </div>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>
      <Footer />
    </Router>
  )
}
export default App
