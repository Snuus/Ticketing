import express, { Request, Response } from 'express'
import { DatabaseConectionError } from '../errors/database-connection-error';

const { validateUser } = require('../schemas/user.schema')
const router = express.Router();




router.post('/api/users/signup', validateUser, (req: Request, res: Response) => {



  res.send({})
})


export { router as signupRouter };