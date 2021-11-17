import express from 'express'
import 'express-async-errors'
import connect from './utils/connect'
import config from 'config'
import logger from './utils/logger'
import routes from '../routes'
import { errorHandler } from './middlewares/error-handler'
import cookieSession from 'cookie-session'


const port = config.get<number>('port')

const app = express()
app.set('trust proxy', true)







app.listen(port, async () => {
  logger.info('Listening on port 3000!!')

  await connect()
  app.use(express.json())
  app.use(cookieSession({
    signed: false,
    secure: true,

  }))


  routes(app)

  // Error Handling
  app.use(errorHandler)



})

