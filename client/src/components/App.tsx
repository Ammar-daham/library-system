import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import { Books } from 'pages/Books'
import { Book } from '../pages/Book'
import Header from './Header'
import BookForm from './BookForm'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/addbook" element={<Book />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
