import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
} from "typeorm";
import { User } from "./User";
import { Folder } from "./Folder";

@Entity({ name: "Valut" })
export class Valut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "nvarchar", length: "MAX", nullable: true })
  customFieldsJson: string | null;

  // Private property to store customFields
  private _customFields: Array<{ name: string; value: string }> | null = null;

  // Define getter and setter for customFields to handle JSON conversion
  get customFields(): Array<{ name: string; value: string }> | null {
    if (this._customFields) return this._customFields;
    if (!this.customFieldsJson) return null;
    try {
      this._customFields = JSON.parse(this.customFieldsJson);
      return this._customFields;
    } catch (e) {
      console.error("Error parsing customFieldsJson:", e);
      return [];
    }
  }

  set customFields(value: Array<{ name: string; value: string }> | null) {
    this._customFields = value;
    this.customFieldsJson = value ? JSON.stringify(value) : null;
  }

  @ManyToOne(() => Folder, (folder) => folder.valuts, { nullable: true })
  @JoinColumn({ name: "folder_id" })
  folder: Folder | null;

  @ManyToOne(() => User, (user) => user.valuts, { nullable: false })
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // For testing purposes, we're skipping actual encryption/decryption

  // This is a placeholder for password encryption
  encryptPassword() {
    // Skip encryption for testing
    return this;
  }

  // This is a placeholder for password decryption
  decryptPassword() {
    // Skip decryption for testing
    return this;
  }

  // Helper method to convert to a simple object for API responses
  toResponseObject() {
    // Skip decryption for testing
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      password: this.password,
      description: this.description,
      customFields: this.customFields || [],
      folderId: this.folder ? this.folder.id.toString() : null,
    };
  }

  // TypeORM lifecycle hooks
  @BeforeInsert()
  beforeInsertActions() {
    // Skip encryption for testing
    // Make sure customFields are properly serialized
    if (this.customFields && !this.customFieldsJson) {
      this.customFieldsJson = JSON.stringify(this.customFields);
    }
  }

  @BeforeUpdate()
  beforeUpdateActions() {
    // Make sure customFields are properly serialized
    if (this.customFields && typeof this.customFields !== "string") {
      this.customFieldsJson = JSON.stringify(this.customFields);
    }
  }

  @AfterLoad()
  afterLoadActions() {
    // Parse customFieldsJson to customFields if available
    if (this.customFieldsJson) {
      try {
        const parsed = JSON.parse(this.customFieldsJson);
        this._customFields = parsed;
      } catch (e) {
        console.error("Error parsing customFieldsJson:", e);
        this._customFields = [];
      }
    }
  }
}
