import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import  ClientPage from '../pages/ClientPage'
import  Dashboard  from '../pages/Dashboard'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { Container, Typography } from "@mui/material";
import background from "../books.jpg";





const App = () => {

  window.onbeforeunload = function() {
    localStorage.clear();
  }

  return (
    <Container
    className='loginFormContainer'
    maxWidth={false}
    style={{ 
     
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      rowGap: '100px',
      minHeight: '100vh',
      position: 'absolute',
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
   }}
  >
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/singup" element={<SignupForm />} />
        <Route path="/books" element={<ClientPage />} />
      </Routes>
    </Router>
    </Container> 
  )
}
export default App
