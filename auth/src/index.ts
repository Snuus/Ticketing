import connect from './utils/connect'
import config from 'config'
import logger from './utils/logger'

import createServer from './app'


const port = config.get<number>('port')




const app = createServer()
app.listen(port, async () => {
  logger.info('Listening on port 3000!!')
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not defined')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }
  await connect()







})

