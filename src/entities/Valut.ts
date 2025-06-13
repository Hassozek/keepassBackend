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
import * as crypto from "crypto";

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

  // Private storage for decrypted password
  private _decryptedPassword: string | null = null;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "text", nullable: true })
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
    if (value) {
      this.customFieldsJson = JSON.stringify(value);
    } else {
      this.customFieldsJson = null;
    }
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

  encryptPassword() {
    try {
      const encryptionKey = process.env.ENCRYPTION_KEY;
      if (!encryptionKey) {
        console.error("ENCRYPTION_KEY not found in environment variables");
        return this;
      }

      if (!this.password || this.password.trim().length === 0) {
        return this;
      }

      // If already encrypted (contains the :), don't encrypt again
      if (this.password.includes(":")) {
        return this;
      }

      // Store decrypted version for later use
      this._decryptedPassword = this.password;

      // Generate a random initialization vector
      const iv = crypto.randomBytes(16);

      // Create cipher using AES-256-CBC
      const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(encryptionKey.substring(0, 32), "utf-8"),
        iv,
      );

      // Encrypt the password
      let encryptedPassword = cipher.update(this.password, "utf8", "hex");
      encryptedPassword += cipher.final("hex");

      // Store the IV with the encrypted password
      this.password = iv.toString("hex") + ":" + encryptedPassword;
    } catch (error) {
      console.error("Error encrypting password:", error);
    }

    return this;
  }

  // Method to decrypt the password
  decryptPassword() {
    try {
      const encryptionKey = process.env.ENCRYPTION_KEY;
      if (!encryptionKey) {
        console.error("ENCRYPTION_KEY not found in environment variables");
        return this;
      }

      if (
        !this.password ||
        this.password.trim().length === 0 ||
        !this.password.includes(":")
      ) {
        return this;
      }

      // Extract IV and encrypted password
      const parts = this.password.split(":");
      if (parts.length !== 2) {
        console.error("Invalid encrypted password format");
        return this;
      }

      const iv = Buffer.from(parts[0], "hex");
      const encryptedPassword = parts[1];

      // Create decipher
      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(encryptionKey.substring(0, 32), "utf-8"),
        iv,
      );

      // Decrypt the password
      let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf8");
      decryptedPassword += decipher.final("utf8");

      // Store the decrypted version
      this._decryptedPassword = decryptedPassword;
      this.password = decryptedPassword;
    } catch (error) {
      console.error("Error decrypting password:", error);
    }

    return this;
  }

  // Helper method to convert to a simple object for API responses
  toResponseObject() {
    let customFieldsData = [];

    if (this.customFieldsJson) {
      try {
        customFieldsData = JSON.parse(this.customFieldsJson);
      } catch (e) {
        console.error("Error parsing customFieldsJson in response:", e);
      }
    } else if (this._customFields) {
      customFieldsData = this._customFields;
    }

    // Return decrypted password if available, otherwise use the stored one
    const passwordToUse = this._decryptedPassword || this.password;

    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      password: passwordToUse,
      description: this.description,
      customFields: customFieldsData || [],
      folderId: this.folder ? this.folder.id.toString() : null,
    };
  }

  // TypeORM lifecycle hooks
  @BeforeInsert()
  beforeInsertActions() {
    if (this._customFields && !this.customFieldsJson) {
      this.customFieldsJson = JSON.stringify(this._customFields);
    }

    // Encrypt password before saving to database
    this.encryptPassword();
  }

  @BeforeUpdate()
  beforeUpdateActions() {
    // Make sure customFields are properly serialized
    if (this._customFields) {
      this.customFieldsJson = JSON.stringify(this._customFields);
    }

    // Encrypt password before updating in database
    this.encryptPassword();
  }

  // Force save custom fields before insert
  beforeSave() {
    if (this._customFields && !this.customFieldsJson) {
      this.customFieldsJson = JSON.stringify(this._customFields);
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

    // Clear the decrypted password cache after loading from DB
    this._decryptedPassword = null;
  }

  // Remove duplicate lifecycle hooks
}
