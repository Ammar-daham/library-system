// Action types
export type Book = {
  _id: string
  isbn: string
  title: string  
  description: string
  borrowerId: number
  authors: []
  published_Date: Date
  borrow_Date: Date
  return_Date: Date
  status: string
}

export type User = {
  name: string
  firstname: string
  lastname: string
  email: string
  password: string
}

export type DecodedUser = {
    userId: string,
    isAdmin: boolean,
    iat: number,
    exp: number
}
