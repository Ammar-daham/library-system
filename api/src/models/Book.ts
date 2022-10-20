import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  publisher: string
  status: string
  category: string
  authors: []
  borrowerId: []
  publishedDate: Date
  borrowDate: string
  returnDate: string
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
  publishedDate: {
    type: Date,
    required: true,
  },
  borrowDate: {
    type: String,
  },
  returnDate: {
    type: String,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
