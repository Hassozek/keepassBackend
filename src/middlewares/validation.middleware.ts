import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { HttpError } from "./error.middleware";

/**
 * Middleware to validate request data
 */
export function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Execute all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format validation errors
    const formattedErrors = errors.array().map((error) => {
      // Handle different error shapes in express-validator
      const errorObj = error as any;
      return {
        field: errorObj.param || errorObj.path || "unknown",
        message: error.msg,
      };
    });

    // Return error response
    return next(
      new HttpError(400, "Validation error", { errors: formattedErrors }),
    );
  };
}
