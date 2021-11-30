import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator';
import { RequestValidationError } from '@tickis/common'

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


exports.validateLogin = [
  check('email')
    .isEmail()
    .withMessage('Email must be valid'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('You must provide a password'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    next();

  },
];