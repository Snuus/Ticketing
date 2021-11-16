import express from 'express'
import 'express-async-errors'
import connect from './utils/connect'
import config from 'config'
import logger from './utils/logger'
import routes from '../routes'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'


const port = config.get<number>('port')

const app = express()

app.use(express.json())







app.listen(port, async () => {
  logger.info('Listening on port 3000!!')

  await connect()

  routes(app)

  // Error Handling
  app.use(errorHandler)



})

