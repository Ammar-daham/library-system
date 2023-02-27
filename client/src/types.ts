// Action types
export type Book = {
  _id: string
  isbn: string
  title: string  
  description: string
  publisher: string
  borrowerId: string[]
  authors: Author[]
  publishedDate: string
  borrowDate: string
  returnDate: string
  status: string
  category: string
}


export type Author = {
  _id: string
  name: string
  email: string
  books: Book[]
}

export type User = {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  isAdmin: boolean
  password: string
}

export const initialUser: User = {
  id: '',
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  isAdmin: false,
  password: '',
}

export type DecodedUser = {
    userId: string,
    isAdmin: boolean,
    iat: number,
    exp: number
}
