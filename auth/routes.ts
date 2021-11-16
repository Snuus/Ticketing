import { Express, Request, Response } from 'express';
import { createUserHandler } from './src/controller/user.controller';
import { NotFoundError } from './src/errors/not-found-error';
const { validateUser } = require('./src/schemas/user.schema')


function routes(app: Express) {

  app.post('/api/users/signup', validateUser, createUserHandler)

  app.all('*', async (req, res) => {
    throw new NotFoundError();
  });

}

export default routes


