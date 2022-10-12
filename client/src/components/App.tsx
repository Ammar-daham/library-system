import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import  ClientPage from '../pages/ClientPage'
import  Dashboard  from '../pages/Dashboard'




const App = () => {

  // window.onbeforeunload = function() {
  //   localStorage.clear();
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<ClientPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
