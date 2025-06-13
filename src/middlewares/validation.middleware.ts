import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { HttpError } from "./error.middleware";

/**
 * Middleware to validate request data
 */
export function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const formattedErrors = errors.array().map((error) => {
      const errorObj = error as any;
      return {
        field: errorObj.param || errorObj.path || "unknown",
        message: error.msg,
      };
    });

    return next(
      new HttpError(400, "Validation error", { errors: formattedErrors }),
    );
  };
}
