import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Valut } from "../entities/Valut";
import { User } from "../entities/User";

export class ValutRepository {
  private repository: Repository<Valut>;

  constructor() {
    this.repository = AppDataSource.getRepository(Valut);
  }

  async findById(id: number): Promise<Valut | null> {
    const valut = await this.repository.findOne({
      where: { id },
      relations: ["folder", "owner"],
    });

    if (valut) {
      valut.decryptPassword();
    }

    return valut;
  }

  async findByOwner(owner: User): Promise<Valut[]> {
    const valuts = await this.repository.find({
      where: { owner: { id: owner.id } },
      relations: ["folder"],
    });

    return valuts.map((valut) => valut.decryptPassword());
  }

  async findByFolder(folderId: number | null, owner: User): Promise<Valut[]> {
    let whereCondition = {};

    if (folderId === null) {
      whereCondition = {
        folder: null,
        owner: { id: owner.id },
      };
    } else {
      whereCondition = {
        folder: { id: folderId },
        owner: { id: owner.id },
      };
    }

    const valuts = await this.repository.find({
      where: whereCondition,
      relations: ["folder"],
    });

    return valuts.map((valut) => valut.decryptPassword());
  }

  async create(valutData: Partial<Valut>): Promise<Valut> {
    const valut = this.repository.create(valutData);

    if (valut.password) {
      valut.encryptPassword();
    }

    const savedValut = await this.repository.save(valut);
    return savedValut.decryptPassword();
  }

  async save(valut: Valut): Promise<Valut> {
    valut.encryptPassword();

    const savedValut = await this.repository.save(valut);
    return savedValut.decryptPassword();
  }

  async update(id: number, valutData: Partial<Valut>): Promise<Valut | null> {
    // If we're updating the password, encrypt it
    if (valutData.password) {
      const valut = this.repository.create({ password: valutData.password });
      valut.encryptPassword();
      valutData.password = valut.password;
    }

    await this.repository.update(id, valutData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async findByIdAndOwner(id: number, owner: User): Promise<Valut | null> {
    const valut = await this.repository.findOne({
      where: {
        id,
        owner: { id: owner.id },
      },
      relations: ["folder"],
    });

    if (valut) {
      valut.decryptPassword();
    }

    return valut;
  }
}
