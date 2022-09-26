//import Movie, { MovieDocument } from '../models/Movie'
import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const findByIsbn = async (isbn: string): Promise<BookDocument[]> => {
  const foundBook = await Book.find({ isbn })
  if (!!foundBook) {
    throw new NotFoundError(`Book with isbn ${isbn} not found`)
  }
  return foundBook
}

const findByTitle = async (title: string): Promise<BookDocument[]> => {
  const foundBook = await Book.find({ title })
  if (!!foundBook) {
    throw new NotFoundError(`Book with title ${title} not found`)
  }
  return foundBook
}

const findByStatus = async (status: string): Promise<BookDocument[]> => {
  const foundBook = await Book.find({ status })
  if (!!foundBook) {
    throw new NotFoundError(`Book with status ${status} not found`)
  }
  return foundBook
}

const findAll = async (): Promise<BookDocument[]> => {
  return await Book.find().populate('authors').sort({ title: 1 })
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Author ${bookId} not found`)
  }

  return foundBook
}

export default {
  create,
  findByIsbn,
  findByTitle,
  findByStatus,
  findAll,
  update,
  deleteBook,
}
