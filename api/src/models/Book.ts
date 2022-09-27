import mongoose, { Document, STATES } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  publisher: string
  authors: {}
  status: string
  borrowerId: number
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
  },
  authors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Author',
  },
  status: {
    type: String,
    require: true,
  },
  borrowerId: {
    type: Number,
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
