import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  publisher: string
  status: string
  category: string
  authors: {}
  borrowerId: {}
  published_Date: Date
  borrow_Date: string
  return_Date: string
}

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    index: true,
    required: true,
  },
  description: {
    type: String,
    index: true,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  authors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Author',
  },
  borrowerId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  published_Date: {
    type: Date,
    required: true,
  },
  borrow_Date: {
    type: String,
  },
  return_Date: {
    type: String,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
