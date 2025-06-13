import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Valut } from "./Valut";

@Entity({ name: "Folder" })
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @ManyToOne(() => Folder, (folder) => folder.children, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  parent: Folder | null;

  @OneToMany(() => Folder, (folder) => folder.parent, { cascade: true })
  children: Folder[];

  @OneToMany(() => Valut, (valut) => valut.folder, { cascade: true })
  valuts: Valut[];

  @ManyToOne(() => User, (user) => user.folders, { nullable: false })
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper method to convert to a simple object for API responses
  toResponseObject() {
    return {
      id: this.id.toString(),
      name: this.name,
      parentId: this.parent ? this.parent.id.toString() : null,
    };
  }
}
