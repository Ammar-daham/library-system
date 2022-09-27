import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  username: string
  firstname: string
  lastname: string
  email: string
  isAdmin: boolean
  password: string
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
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
    unique: true,
  },
  isAdmin: {
    type: Boolean,
  },
  password: {
    type: String,
  },
})

export default mongoose.model<UserDocument>('User', UserSchema)
