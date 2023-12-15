import { NextFunction, Request, Response } from "express";
import {
  CustomValidationError, NotFoundError, InvalidRequestError
} from "../../../utils/errors.util";
import { APIResponse } from "../../../utils/response.util";
import logger from "../../../utils/logger.util";

export async function error(error: Error, request: Request, response: Response, next: NextFunction) { // eslint-disable-line @typescript-eslint/no-unused-vars
  let status: number;
  let message: string;
  let errors: any | undefined;

  if (error instanceof NotFoundError) {
    status = 404;
    message = error.message || "Not found";
  } else if (error instanceof InvalidRequestError) {
    status = 400;
    message = error.message || "Invalid request";
  } else if (error instanceof CustomValidationError) {
    status = 422;
    message = error.message || "Validation error";
    errors = error.err;
  } else {
    logger.error(error);
    status = 500;
    message = "Server error";
  }

  return response.status(status).json(APIResponse.error(status, message, errors));
}
