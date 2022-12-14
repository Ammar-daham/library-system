import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import { Books } from 'pages/Books'
import { Book } from '../pages/Book'
import Header from './Header'
import LoginForm from './LoginForm'



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/addbook" element={<Book />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
