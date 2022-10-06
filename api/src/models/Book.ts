import mongoose, { Document, STATES } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  publisher: string
  status: string
  category: string
  authors: {}
  borrowerId: string
  published_Date: Date
  borrow_Date: Date
  return_Date: Date
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  published_Date: {
    type: Date,
    required: true,
  },
  borrow_Date: {
    type: Date,
  },
  return_Date: {
    type: Date,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
