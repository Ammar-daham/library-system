// Action types
export type Book = {
  _id: string
  isbn: string
  title: string  
  description: string
  publisher: string
  borrowerId: {}
  authors: {}
  published_Date: string
  borrow_Date: string
  return_Date: string
  status: string
  category: string
}


export type Author = {
  _id: string
  name: string
  email: string
  books: []
}

export type User = {
  _id: string
  username: string
  first_name: string
  last_name: string
  email: string
  isAdmin: boolean,
}

export type DecodedUser = {
    userId: string,
    isAdmin: boolean,
    iat: number,
    exp: number
}
