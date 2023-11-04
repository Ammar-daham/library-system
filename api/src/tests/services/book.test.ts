import Book from '../../models/book'
import bookService from '../../services/book.service'

import connect, { MongodHelper } from '../../helpers/db-helper'

const createBook = async () => {
  const book = new Book({
    isbn: '3231GFA4',
    title: 'Game of Thrones',
    description:
      'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    publisher: 'Bantam Spectra',
    publishedDate: new Date('2022-12-01'),
  })

  return await bookService.create(book)
}

describe('Book service', () => {
  let mongodHelper: MongodHelper

  const book = new Book({
    isbn: '3231GFABD4',
    title: 'The Lord Of the Rings',
    description:
      'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    publisher: 'Bantam Spectra',
    publishedDate: new Date('2022-12-01'),
  })

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterAll(async () => {
    await mongodHelper.clearDatabase()
    await mongodHelper.closeDatabase()
  })

  it('should create a book', async () => {
    const book = await createBook()
    console.log('book ', book)
    expect(book).toHaveProperty('_id')
    expect(book).toHaveProperty('title', 'Game of Thrones')
  })

  it('should get all books', async () => {
    const getAllBooks = await bookService.findAll()
    console.log('All books: ', getAllBooks)
  })
})
