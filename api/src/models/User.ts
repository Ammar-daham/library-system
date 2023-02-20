import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  username: string
  first_name: string
  last_name: string
  email: string
  isAdmin: boolean
  password: string
}

const userSchema = new mongoose.Schema({
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
    default: false,
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
