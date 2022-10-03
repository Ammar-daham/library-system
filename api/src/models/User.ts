import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  username: string
  first_name: string
  last_name: string
  email: string
  isAdmin: boolean
  password: string
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
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
