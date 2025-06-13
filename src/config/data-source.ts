import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Folder } from "../entities/Folder";
import { Valut } from "../entities/Valut";
import path from "path";

// Load environment variables
dotenv.config();

// Create the data source configuration
const dataSourceConfig = {
  type: "mssql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "1433", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // Enable automatic schema synchronization for development
  logging: true, // Enable logging for better debugging
  entities: [User, Folder, Valut],
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
    // Add connection timeout and retry settings
    connectionTimeout: 30000,
    requestTimeout: 30000,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    enableArithAbort: true,
  },
  migrations: [path.join(__dirname, "../migrations/*.{ts,js}")],
  migrationsTableName: "migrations",
  subscribers: ["src/subscribers/*.ts"],
};

// Export the data source
export const AppDataSource = new DataSource(dataSourceConfig as any);
