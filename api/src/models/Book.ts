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
  cover: {
    small: string
    large: string
  }
  publishedDate: string
  borrowDate: Date
  returnDate: Date
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
    small: {
      type: String,
      required: true,
    },
    large: {
      type: String,
    },
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
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
