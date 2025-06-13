import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  errors?: any[];
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  // Prepare error response
  const errorResponse = {
    message: err.message || "Internal Server Error",
    errors: err.errors || undefined,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  // Log error in development mode
  if (process.env.NODE_ENV === "development") {
    console.error(`[ERROR] ${err.message}`);
    console.error(err.stack);
  }

  res.status(statusCode).json(errorResponse);
};

// Custom error class that can be used throughout the application
export class HttpError extends Error {
  statusCode: number;
  errors?: any;

  constructor(statusCode: number, message: string, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    Object.setPrototypeOf(this, HttpError.prototype);
  }

  static badRequest(message: string, errors?: any) {
    return new HttpError(400, message, errors);
  }

  static unauthorized(message: string = "Unauthorized") {
    return new HttpError(401, message);
  }

  static forbidden(message: string = "Forbidden") {
    return new HttpError(403, message);
  }

  static notFound(message: string = "Not Found") {
    return new HttpError(404, message);
  }

  static internalServerError(message: string = "Internal Server Error") {
    return new HttpError(500, message);
  }
}
