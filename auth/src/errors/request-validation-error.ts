import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";




export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters')
    //extending a build class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    console.log(this.errors)
    return this.errors.map(err => {

      return { message: err.msg, field: err.param };
    });
  }
}