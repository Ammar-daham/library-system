import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import { Books } from 'pages/Books'
import Header from './Header'
import BookForm from './BookForm'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <BookForm />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
