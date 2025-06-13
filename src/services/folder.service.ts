import { Folder } from '../entities/Folder';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { HttpError } from '../middlewares/error.middleware';

export class FolderService {
  private folderRepository: Repository<Folder>;

  constructor() {
    this.folderRepository = AppDataSource.getRepository(Folder);
  }

  /**
   * Get all folders for a user
   */
  async getFolders(user: User): Promise<Folder[]> {
    return await this.folderRepository.find({
      where: { owner: { id: user.id } },
      relations: ['parent']
    });
  }

  /**
   * Get folders by parent ID
   */
  async getFoldersByParent(parentId: number | null, user: User): Promise<Folder[]> {
    const whereCondition: any = {
      owner: { id: user.id }
    };

    if (parentId === null) {
      whereCondition.parent = null;
    } else {
      whereCondition.parent = { id: parentId };
    }

    return await this.folderRepository.find({
      where: whereCondition,
      relations: ['parent']
    });
  }

  /**
   * Create a new folder
   */
  async createFolder(name: string, parentId: number | null, user: User): Promise<Folder> {
    const folderData: Partial<Folder> = {
      name,
      owner: user
    };

    // If parent ID provided, find parent folder
    if (parentId !== null) {
      const parentFolder = await this.folderRepository.findOne({
        where: {
          id: parentId,
          owner: { id: user.id }
        }
      });
      
      if (!parentFolder) {
        throw HttpError.notFound('Parent folder not found');
      }
      folderData.parent = parentFolder;
    }

    const folder = this.folderRepository.create(folderData);
    return await this.folderRepository.save(folder);
  }

  /**
   * Update a folder
   */
  async updateFolder(id: number, data: { name?: string; parentId?: number | null }, user: User): Promise<Folder> {
    const folder = await this.folderRepository.findOne({
      where: {
        id,
        owner: { id: user.id }
      },
      relations: ['parent']
    });

    if (!folder) {
      throw HttpError.notFound('Folder not found');
    }

    // Update name if provided
    if (data.name) {
      folder.name = data.name;
    }

    // Update parent if provided
    if (data.parentId !== undefined) {
      if (data.parentId === null) {
        folder.parent = null;
      } else {
        // Check if parent ID is valid
        if (data.parentId === id) {
          throw HttpError.badRequest('A folder cannot be its own parent');
        }

        const parentFolder = await this.folderRepository.findOne({
          where: {
            id: data.parentId,
            owner: { id: user.id }
          }
        });
        
        if (!parentFolder) {
          throw HttpError.notFound('Parent folder not found');
        }
        folder.parent = parentFolder;
      }
    }

    return await this.folderRepository.save(folder);
  }

  /**
   * Delete a folder
   */
  async deleteFolder(id: number, user: User): Promise<void> {
    const folder = await this.folderRepository.findOne({
      where: {
        id,
        owner: { id: user.id }
      },
      relations: ['children', 'valuts']
    });

    if (!folder) {
      throw HttpError.notFound('Folder not found');
    }

    // Check if folder has children or valuts
    if (folder.children && folder.children.length > 0) {
      throw HttpError.badRequest('Cannot delete folder with subfolders');
    }

    if (folder.valuts && folder.valuts.length > 0) {
      throw HttpError.badRequest('Cannot delete folder with valuts');
    }

    await this.folderRepository.remove(folder);
  }

  /**
   * Get a single folder by ID
   */
  async getFolderById(id: number, user: User): Promise<Folder> {
    const folder = await this.folderRepository.findOne({
      where: {
        id,
        owner: { id: user.id }
      },
      relations: ['parent']
    });
    
    if (!folder) {
      throw HttpError.notFound('Folder not found');
    }
    return folder;
  }
}
