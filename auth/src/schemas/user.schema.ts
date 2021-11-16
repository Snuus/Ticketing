import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error'

exports.validateUser = [
  check('email')
    .isEmail()
    .withMessage('Email must be valid'),
  check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    next();

  },
];