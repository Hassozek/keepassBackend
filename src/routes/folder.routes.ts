import { Router } from 'express';
import { folderController } from '../controllers/folder.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Apply auth middleware to all folder routes
router.use('/folders', authenticate);

// Get all folders (with optional parentId query param)
router.get('/folders', folderController.getFolders);

// Create a new folder
router.post(
  '/folders',
  folderController.validateCreateFolder,
  folderController.createFolder
);

// Update a folder
router.patch(
  '/folders/:id',
  folderController.validateUpdateFolder,
  folderController.updateFolder
);

// Delete a folder
router.delete(
  '/folders/:id',
  folderController.validateDeleteFolder,
  folderController.deleteFolder
);

export default router;
