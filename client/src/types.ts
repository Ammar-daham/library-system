// Action types
export type Book = {
  _id: string
  isbn: string
  title: string  
  description: string
  publisher: string
  borrowerId: number
  authors: []
  published_Date: Date
  borrow_Date: Date
  return_Date: Date
  status: string
  category: string
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
