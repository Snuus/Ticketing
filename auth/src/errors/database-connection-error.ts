import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";


export class DatabaseConectionError extends CustomError {

  statusCode = 500
  reason = 'Error connecting to database'
  constructor() {
    super('Error connectiong to db')
    //extending a build class
    Object.setPrototypeOf(this, DatabaseConectionError.prototype)
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
        status: this.statusCode
      }
    ]
  }

}