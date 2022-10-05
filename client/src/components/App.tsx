import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import { Books } from 'pages/Books'
import { Book } from '../pages/Book'
import Header from './Header'
import  Dashboard  from '../pages/Dashboard'




const App = () => {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add-book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
