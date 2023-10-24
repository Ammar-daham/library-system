import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  publisher: string
  status: string
  categories: []
  authors: []
  borrowerId: []
  cover: string
  publishedDate: string
  borrowDate: Date
  returnDate: Date
  language: string
  pages: number
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
    default: 'available',
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  ],
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cover: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  borrowDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
  language: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
