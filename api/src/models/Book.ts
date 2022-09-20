import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  ISBN: number
  title: string
  description: string
  publisher: string
  authors: string
  status: string
  borrowerId: number
  publishedDate: Date
  borrowDate: Date
  returnDate: Date
}

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: Number,
    required: true,
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
  authors: {
    type: String,
    required: true,
  },
  borrowerId: {
    type: Number,
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
})

// export type MovieDocument = Document & {
//   name: string
//   publishedYear: number
//   genres: string[]
//   duration: number
//   rating: number
//   characters: string[]
// }

// const movieSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     index: true,
//   },
//   publishedYear: {
//     type: Number,
//     required: true,
//     min: 1900,
//   },
//   genres: [String],
//   duration: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   rating: {
//     type: Number,
//     min: 0,
//   },
//   characters: [String],
// })

export default mongoose.model<BookDocument>('Book', bookSchema)
