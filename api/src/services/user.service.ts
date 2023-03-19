import User, { UserDocument } from '../models/user'

const findAllUsers = async (): Promise<UserDocument[]> => {
  return await User.find()
}

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

export default {
  findAllUsers,
  create,
}
