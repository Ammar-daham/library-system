import category, { CategoryDocument } from '../models/category'
import { NotFoundError } from '../helpers/apiError'

const create = async (
  category: CategoryDocument
): Promise<CategoryDocument> => {
  return category.save()
}

const findAll = async (): Promise<CategoryDocument[]> => {
  return await category.find()
}

export default {
  create,
  findAll,
}
