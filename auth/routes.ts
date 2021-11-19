import { Express, Request, Response } from 'express';
import { createUserHandler, loginUserHandler } from './src/controller/user.controller';
import { NotFoundError } from './src/errors/not-found-error';
const { validateUser, validateLogin } = require('./src/schemas/user.schema')


function routes(app: Express) {



  app.post('/api/users/signup', validateUser, createUserHandler)

  app.post('/api/users/signin', validateLogin, loginUserHandler)


  app.all('*', async (req, res) => {
    throw new NotFoundError();
  });

}

export default routes


