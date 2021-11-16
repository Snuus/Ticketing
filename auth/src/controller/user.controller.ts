
import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../errors/bad-request-error'

import { createUser } from '../services/user.service'
import logger from '../utils/logger'


export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  try {

    const user = await createUser(req.body) // call create user service 

    return res.send(user)
  } catch (e: any) {
    //custom console log
    logger.error(e)
    // send error to client 
    throw new BadRequestError(e)


  }
}