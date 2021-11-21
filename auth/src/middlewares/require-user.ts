import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt.utils'


//FUTURE FEATURE
// THIS IS A REQUIRE USER, IF THERE IS NO USER WE WILL MAKE A GUEST TOKEN FOR ANALYTICS


declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}
interface UserPayload {
  id: string;
  email: string;
}


export const requireUser = (req: Request, res: Response, next: NextFunction) => {



  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = verifyJwt(req.session.jwt) as UserPayload
    req.user = payload
  } catch (e) {

  }
  next()
}

export default requireUser