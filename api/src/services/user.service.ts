import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const findById = async (userId: string): Promise<UserDocument[]> => {
  const foundUser = await User.find({ _id: userId })
  if (!foundUser) {
    throw new NotFoundError(`User with id ${userId} not found`)
  }
  return foundUser
}

export default {
  findById,
}
