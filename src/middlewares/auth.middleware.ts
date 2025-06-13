import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { HttpError } from "./error.middleware";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

/**
 * Middleware to authenticate JWT token
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new HttpError(401, "No token provided"));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
    };
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      return next(new HttpError(401, "Invalid token"));
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new HttpError(401, "Invalid token"));
    }
    next(error);
  }
};
