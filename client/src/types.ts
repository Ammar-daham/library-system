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
