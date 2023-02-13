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
  publishedDate: Date
  borrowDate: Date
  returnDate: Date
  url: string
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
  publishedDate: {
    type: Date,
    required: true,
  },
  borrowDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
  url: {
    type: String,
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
