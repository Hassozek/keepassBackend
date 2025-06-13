import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Folder } from "./Folder";
import { Valut } from "./Valut";

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 180, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Folder, (folder) => folder.owner)
  folders: Folder[];

  @OneToMany(() => Valut, (valut) => valut.owner)
  valuts: Valut[];
}
