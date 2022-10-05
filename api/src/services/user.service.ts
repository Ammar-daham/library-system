import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const findAllUsers = async (): Promise<UserDocument[]> => {
  return await User.find()
}

export default {
  findAllUsers,
}
