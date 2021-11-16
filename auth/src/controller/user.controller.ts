
import { Request, Response } from 'express'

import { createUser } from '../services/user.service'
import logger from '../utils/logger'


export async function createUserHandler(req: Request, res: Response) {
  try {

    const { email, password } = req.body
    const user = await createUser(req.body) // call create user service 

    return res.send(user)
  } catch (e: any) {
    logger.error(e)
    return res.status(409).send(e.message)

  }
}