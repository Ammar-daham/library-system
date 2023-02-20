import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'

const api = supertest(app)

test('books are returned as json', async () => {
  await api
    .get('/api/v1/books')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})
