import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  name: string
  email: string
  isAdmin: boolean
}

const UserSchema = new mongoose.Schema({
  name: {
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
})

export default mongoose.model<UserDocument>('User', UserSchema)
