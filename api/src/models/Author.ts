import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  name: string
  email: string
}

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
