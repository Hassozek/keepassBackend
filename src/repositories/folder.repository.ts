import { Repository } from 'typeorm';
import { Folder } from '../entities/Folder';
import { User } from '../entities/User';
import { AppDataSource } from '../config/data-source';
import { HttpError } from '../middlewares/error.middleware';

export class FolderRepository {
  private repository: Repository<Folder>;

  constructor() {
    this.repository = AppDataSource.getRepository(Folder);
  }

  /**
   * Find all folders for a user
   */
  async findByOwner(user: User): Promise<Folder[]> {
    return this.repository.find({
      where: { owner: { id: user.id } },
      relations: ['parent']
    });
  }

  /**
   * Find folders by parent ID
   */
  async findByParent(parentId: number | null, user: User): Promise<Folder[]> {
    return this.repository.find({
      where: {
        owner: { id: user.id },
        parent: parentId ? { id: parentId } : null
      },
      relations: ['parent']
    });
  }

  /**
   * Find a folder by ID and owner
   */
  async findByIdAndOwner(id: number, user: User): Promise<Folder | null> {
    return this.repository.findOne({
      where: {
        id,
        owner: { id: user.id }
      },
      relations: ['parent']
    });
  }

  /**
   * Create a new folder
   */
  async create(folderData: Partial<Folder>): Promise<Folder> {
    const folder = this.repository.create(folderData);
    await this.repository.save(folder);
    return folder;
  }

  /**
   * Update a folder
   */
  async update(id: number, folderData: Partial<Folder>, user: User): Promise<Folder> {
    const folder = await this.findByIdAndOwner(id, user);
    if (!folder) {
      throw HttpError.notFound('Folder not found');
    }

    // Update folder properties
    Object.assign(folder, folderData);
    await this.repository.save(folder);
    return folder;
  }

  /**
   * Delete a folder
   */
  async delete(id: number, user: User): Promise<void> {
    const folder = await this.findByIdAndOwner(id, user);
    if (!folder) {
      throw HttpError.notFound('Folder not found');
    }

    await this.repository.remove(folder);
  }
}
