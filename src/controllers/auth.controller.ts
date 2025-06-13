import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { AuthService } from "../services/auth.service";
import { validate } from "../middlewares/validation.middleware";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * User registration
   */
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.register(email, password);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * User login
   */
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Input validation for registration
   */
  validateRegister = validate([
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ]);

  /**
   * Input validation for login
   */
  validateLogin = validate([
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ]);
}

export const authController = new AuthController();
