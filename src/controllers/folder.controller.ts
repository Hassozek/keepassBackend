import { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import { FolderService } from "../services/folder.service";
import { validate } from "../middlewares/validation.middleware";
import { HttpError } from "../middlewares/error.middleware";
import { Folder } from "../entities/Folder";

export class FolderController {
  private folderService: FolderService;

  constructor() {
    this.folderService = new FolderService();
  }

  /**
   * Get all folders for the authenticated user
   * Optional query param: parentId to filter by parent
   */
  getFolders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parentId = req.query.parentId
        ? parseInt(req.query.parentId as string, 10)
        : null;

      if (req.user) {
        let folders: Folder[];

        if (parentId !== null) {
          folders = await this.folderService.getFoldersByParent(
            parentId,
            req.user,
          );
        } else {
          folders = await this.folderService.getFolders(req.user);
        }

        const response = folders.map((folder) => folder.toResponseObject());
        return res.json(response);
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a new folder
   */
  createFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, parentId } = req.body;

      if (!req.user) {
        throw HttpError.unauthorized();
      }

      const folder = await this.folderService.createFolder(
        name,
        parentId || null,
        req.user,
      );

      return res.status(201).json(folder.toResponseObject());
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update a folder
   */
  updateFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, parentId } = req.body;

      if (!req.user) {
        throw HttpError.unauthorized();
      }

      const folder = await this.folderService.updateFolder(
        parseInt(id, 10),
        {
          name,
          parentId:
            parentId === undefined
              ? undefined
              : parentId === null
                ? null
                : parseInt(parentId, 10),
        },
        req.user,
      );

      return res.json(folder.toResponseObject());
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a folder
   */
  deleteFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!req.user) {
        throw HttpError.unauthorized();
      }

      await this.folderService.deleteFolder(parseInt(id, 10), req.user);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * Validate folder creation input
   */
  validateCreateFolder = validate([
    body("name")
      .notEmpty()
      .withMessage("Folder name is required")
      .isLength({ max: 255 })
      .withMessage("Folder name must be less than 255 characters"),
    body("parentId")
      .optional({ nullable: true })
      .isInt()
      .withMessage("Parent ID must be an integer"),
  ]);

  /**
   * Validate folder update input
   */
  validateUpdateFolder = validate([
    param("id").isInt().withMessage("Folder ID must be an integer"),
    body("name")
      .optional()
      .isLength({ max: 255 })
      .withMessage("Folder name must be less than 255 characters"),
    body("parentId")
      .optional({ nullable: true })
      .custom((value) => {
        if (value !== null && !Number.isInteger(Number(value))) {
          throw new Error("Parent ID must be an integer or null");
        }
        return true;
      }),
  ]);

  /**
   * Validate folder deletion input
   */
  validateDeleteFolder = validate([
    param("id").isInt().withMessage("Folder ID must be an integer"),
  ]);
}

export const folderController = new FolderController();
