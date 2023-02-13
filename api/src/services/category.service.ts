import Category, { CategoryDocument } from '../models/category'
import { NotFoundError } from '../helpers/apiError'

const create = async (
  category: CategoryDocument
): Promise<CategoryDocument> => {
  return category.save()
}

const findAll = async (): Promise<CategoryDocument[]> => {
  return await Category.find()
}

export default {
  create,
  findAll,
}
