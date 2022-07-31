import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if error is one of custom error instance
  // if (err instanceof RequestValidationError){
  //   const formattedErrors = err.errors.map(error => {
  //     return { message: error.msg, field: error.param };
  //   });
  //   console.log("Handling this error as a request validation error");
  //   return res.status(400).send({ errors: formattedErrors });
  // }
  // if (err instanceof DatabaseConnectionError) {
  //   console.log("Handling this error as a db connection error");
  //   return res.status(500).send({ errors: [{message: err.reason }] });
  // }

  if (err instanceof CustomError) {
    console.log("Handling this error now ");
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });        // statusCode and serializeErrors() are all abstract
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong"}],     //generic error: 
  })
  // res.status(400).send({message: err.message});
}