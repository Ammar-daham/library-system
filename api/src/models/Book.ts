import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  publisher: string
  authors: {}
  status: string
  borrowerId: number
  publishedDate: string
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
  publishedDate: {
    type: String,
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
