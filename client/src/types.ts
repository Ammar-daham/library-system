// Action types
export type Book = {
  _id: string
  isbn: string
  title: string  
  description: string
  borrowerId: number
  authors: []
  publishedDate: string
  borrowDate: string
  returnDate: string
  status: string
}
