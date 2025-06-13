import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../config/data-source";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HttpError } from "../middlewares/error.middleware";

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * Register a new user
   */
  async register(
    email: string,
    password: string,
  ): Promise<{ user: Partial<User>; token: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpError(400, "User with this email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    // Generate JWT token
    const token = this.generateToken(user);

    // Return user (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * User login
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ user: Partial<User>; token: string }> {
    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpError(401, "Invalid email or password");
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid email or password");
    }

    // Generate JWT token
    const token = this.generateToken(user);

    // Return user (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Generate JWT token
   */
  private generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
    };

    // Make sure JWT_SECRET is properly handled
    const secret = process.env.JWT_SECRET || "fallback_secret_for_development";

    // Sign the token with the payload and secret
    // @ts-ignore - Ignoring type checking for jwt.sign
    // Parse JWT_EXPIRES_IN to ensure it's treated as a number (seconds)
    const expiresIn = process.env.JWT_EXPIRES_IN
      ? parseInt(process.env.JWT_EXPIRES_IN)
      : 3600;
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }
}
