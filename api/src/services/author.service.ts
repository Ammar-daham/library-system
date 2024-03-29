import Author, { AuthorDocument } from '../models/author'
import { NotFoundError } from '../helpers/apiError'

const create = async (author: AuthorDocument): Promise<AuthorDocument> => {
  return author.save()
}

const findById = async (authorId: string): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findById({ _id: authorId }).populate('books')
  if (!foundAuthor) {
    throw new NotFoundError(`Book ${authorId} not found`)
  }
  return foundAuthor
}

const findAll = async (): Promise<AuthorDocument[]> => {
  return await Author.find().populate('books').sort({ name: 1 })
}

const update = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  })

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const foundAuthor = Author.findByIdAndDelete(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Movie ${authorId} not found`)
  }

  return foundAuthor
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteAuthor,
}
