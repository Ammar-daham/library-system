import errorHandler from 'errorhandler'
import mongoose from 'mongoose'
import cors from 'cors'
import app from './app'
import { MONGODB_URI } from './util/secrets'
import logger from './util/logger'
import express from 'express'

const mongoUrl = MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

app.use(cors())
app.use(express.static('build'))
/**
 * Error Handler. Provides error handing middleware
   only use in development
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})
