import Category, { CategoryDocument } from '../models/category'
import { NotFoundError } from '../helpers/apiError'

const create = async (
  category: CategoryDocument
): Promise<CategoryDocument> => {
  return category.save()
}

const findAllCategories = async (): Promise<CategoryDocument[]> => {
  return await Category.find()
}

const updateCategory = async (
  categoryId: string,
  update: Partial<CategoryDocument>
): Promise<CategoryDocument | null> => {
  const foundCategory = await Category.findByIdAndUpdate(categoryId, update, {
    new: true,
  })

  if (!foundCategory) {
    throw new NotFoundError(`Author ${categoryId} not found`)
  }
  return foundCategory
}

const deleteCategory = async (
  categoryId: string
): Promise<CategoryDocument | null> => {
  const foundCategory = Category.findByIdAndDelete(categoryId)

  if (!foundCategory) {
    throw new NotFoundError(`Movie ${categoryId} not found`)
  }
  return foundCategory
}

export default {
  create,
  findAllCategories,
  updateCategory,
  deleteCategory,
}
