import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  name: string
  email: string
  books: []
}

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book',
  },
})

authorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
