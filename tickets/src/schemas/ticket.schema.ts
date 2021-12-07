import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator';
import { RequestValidationError } from '@tickis/common'

export const validateTicket = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
  check('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater the 0'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    next();

  },
];


