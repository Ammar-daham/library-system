import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstname: string
  lastname: string
  email: string
}

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

export default mongoose.model<UserDocument>('User', UserSchema)
