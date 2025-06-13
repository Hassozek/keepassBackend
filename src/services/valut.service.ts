import { Valut } from "../entities/Valut";
import { User } from "../entities/User";
import { Folder } from "../entities/Folder";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { HttpError } from "../middlewares/error.middleware";

export class ValutService {
  private valutRepository: Repository<Valut>;
  private folderRepository: Repository<Folder>;

  constructor() {
    this.valutRepository = AppDataSource.getRepository(Valut);
    this.folderRepository = AppDataSource.getRepository(Folder);
  }

  /**
   * Get all valuts for a user
   */
  async getValuts(user: User): Promise<Valut[]> {
    const valuts = await this.valutRepository.find({
      where: { owner: { id: user.id } },
      relations: ["folder"],
    });

    return valuts.map((valut) => valut.decryptPassword());
  }

  /**
   * Get valuts by folder ID
   */
  async getValutsByFolder(
    folderId: number | null,
    user: User,
  ): Promise<Valut[]> {
    const whereCondition: any = {
      owner: { id: user.id },
    };

    if (folderId === null) {
      whereCondition.folder = null;
    } else {
      whereCondition.folder = { id: folderId };
    }

    const valuts = await this.valutRepository.find({
      where: whereCondition,
      relations: ["folder"],
    });

    return valuts.map((valut) => valut.decryptPassword());
  }

  /**
   * Create a new valut
   */
  async createValut(
    data: {
      name: string;
      email: string;
      password: string;
      description?: string;
      customFields?: Array<{ name: string; value: string }>;
      folderId?: number | null;
    },
    user: User,
  ): Promise<Valut> {
    const valutData: Partial<Valut> = {
      name: data.name,
      email: data.email,
      password: data.password,
      description: data.description || null,
      customFields: data.customFields || null,
      owner: user,
    };

    // If folder ID provided, find folder
    if (data.folderId !== undefined && data.folderId !== null) {
      const folder = await this.folderRepository.findOne({
        where: {
          id: data.folderId,
          owner: { id: user.id },
        },
      });
      if (!folder) {
        throw HttpError.notFound("Folder not found");
      }
      valutData.folder = folder;
    } else {
      valutData.folder = null;
    }

    // Create the valut and encrypt the password
    const valut = this.valutRepository.create(valutData);
    valut.encryptPassword();

    // Set customFields explicitly
    if (data.customFields) {
      valut.customFields = data.customFields;
    }


    // Save and return with decrypted password for response
    const savedValut = await this.valutRepository.save(valut);

    return savedValut.decryptPassword();
  }

  /**
   * Update a valut
   */
  async updateValut(
    id: number,
    data: {
      name?: string;
      email?: string;
      password?: string;
      description?: string;
      customFields?: Array<{ name: string; value: string }>;
      folderId?: number | null;
    },
    user: User,
  ): Promise<Valut> {
    // Find valut by ID and verify ownership
    const valut = await this.valutRepository.findOne({
      where: {
        id,
        owner: { id: user.id },
      },
      relations: ["folder"],
    });

    if (!valut) {
      throw HttpError.notFound("Valut not found");
    }

    // Update fields if provided
    if (data.name !== undefined) {
      valut.name = data.name;
    }

    if (data.email !== undefined) {
      valut.email = data.email;
    }

    if (data.password !== undefined) {
      valut.password = data.password;
    }

    if (data.description !== undefined) {
      valut.description = data.description;
    }

    if (data.customFields !== undefined) {
      valut.customFields = data.customFields;
    }

    // Update folder if provided
    if (data.folderId !== undefined) {
      if (data.folderId === null) {
        valut.folder = null;
      } else {
        // Verify that folder exists and belongs to user
        const folder = await this.folderRepository.findOne({
          where: {
            id: data.folderId,
            owner: { id: user.id },
          },
        });

        if (!folder) {
          throw HttpError.notFound("Folder not found");
        }
        valut.folder = folder;
      }
    }

    const savedValut = await this.valutRepository.save(valut);
    return savedValut;
  }

  /**
   * Delete a valut
   */
  async deleteValut(id: number, user: User): Promise<void> {
    const valut = await this.valutRepository.findOne({
      where: {
        id,
        owner: { id: user.id },
      },
    });

    if (!valut) {
      throw HttpError.notFound("Valut not found");
    }

    await this.valutRepository.remove(valut);
  }

  async getValutById(id: number, user: User): Promise<Valut> {
    const valut = await this.valutRepository.findOne({
      where: {
        id,
        owner: { id: user.id },
      },
      relations: ["folder"],
    });

    if (!valut) {
      throw HttpError.notFound("Valut not found");
    }
    return valut.decryptPassword();
  }
}
