import { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import { ValutService } from "../services/valut.service";
import { validate } from "../middlewares/validation.middleware";
import { HttpError } from "../middlewares/error.middleware";

export class ValutController {
  private valutService: ValutService;

  constructor() {
    this.valutService = new ValutService();
  }

  /**
   * Get all valuts for the authenticated user
   * Optional query param: folderId to filter by folder
   */
  getValuts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const folderId = req.query.folderId
        ? parseInt(req.query.folderId as string, 10)
        : null;

      if (req.user) {
        let valuts;

        if (folderId !== null) {
          valuts = await this.valutService.getValutsByFolder(
            folderId,
            req.user,
          );
        } else {
          valuts = await this.valutService.getValuts(req.user);
        }

        // Map valuts to response format
        const response = valuts.map((valut) => valut.toResponseObject());
        return res.json(response);
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get a single valut by ID
   */
  getValutById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!req.user) {
        throw HttpError.unauthorized();
      }

      const valut = await this.valutService.getValutById(
        parseInt(id, 10),
        req.user,
      );
      return res.json(valut.toResponseObject());
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a new valut
   */
  createValut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, description, customFields, folderId } =
        req.body;

      if (!req.user) {
        throw HttpError.unauthorized();
      }

      const valut = await this.valutService.createValut(
        {
          name,
          email,
          password,
          description,
          customFields,
          folderId:
            folderId === undefined
              ? undefined
              : folderId === null
                ? null
                : parseInt(folderId, 10),
        },
        req.user,
      );

      return res.status(201).json(valut.toResponseObject());
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update a valut
   */
  updateValut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, email, password, description, customFields, folderId } =
        req.body;

      if (!req.user) {
        throw HttpError.unauthorized();
      }

      const valut = await this.valutService.updateValut(
        parseInt(id, 10),
        {
          name,
          email,
          password,
          description,
          customFields,
          folderId:
            folderId === undefined
              ? undefined
              : folderId === null
                ? null
                : parseInt(folderId, 10),
        },
        req.user,
      );

      return res.json(valut.toResponseObject());
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a valut
   */
  deleteValut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!req.user) {
        throw HttpError.unauthorized();
      }

      await this.valutService.deleteValut(parseInt(id, 10), req.user);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * Validate valut creation input
   */
  validateCreateValut = validate([
    body("name")
      .notEmpty()
      .withMessage("Valut name is required")
      .isLength({ max: 255 })
      .withMessage("Valut name must be less than 255 characters"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isLength({ max: 255 })
      .withMessage("Email must be less than 255 characters"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ max: 255 })
      .withMessage("Password must be less than 255 characters"),
    body("description")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Description must be less than 1000 characters"),
    body("customFields")
      .optional()
      .isArray()
      .withMessage("Custom fields must be an array"),
    body("customFields.*.name")
      .optional()
      .isString()
      .withMessage("Custom field name must be a string"),
    body("customFields.*.value")
      .optional()
      .isString()
      .withMessage("Custom field value must be a string"),
    body("folderId")
      .optional({ nullable: true })
      .custom((value) => {
        if (value !== null && !Number.isInteger(Number(value))) {
          throw new Error("Folder ID must be an integer or null");
        }
        return true;
      }),
  ]);

  /**
   * Validate valut update input
   */
  validateUpdateValut = validate([
    param("id").isInt().withMessage("Valut ID must be an integer"),
    body("name")
      .optional()
      .isLength({ max: 255 })
      .withMessage("Valut name must be less than 255 characters"),
    body("email")
      .optional()
      .isLength({ max: 255 })
      .withMessage("Email must be less than 255 characters"),
    body("password")
      .optional()
      .isLength({ max: 255 })
      .withMessage("Password must be less than 255 characters"),
    body("description")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Description must be less than 1000 characters"),
    body("customFields")
      .optional()
      .isArray()
      .withMessage("Custom fields must be an array"),
    body("folderId")
      .optional({ nullable: true })
      .custom((value) => {
        if (value !== null && !Number.isInteger(Number(value))) {
          throw new Error("Folder ID must be an integer or null");
        }
        return true;
      }),
  ]);

  /**
   * Validate valut deletion input
   */
  validateDeleteValut = validate([
    param("id").isInt().withMessage("Valut ID must be an integer"),
  ]);
}

export const valutController = new ValutController();
