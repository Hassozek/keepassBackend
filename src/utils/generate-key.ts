import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Generate a random encryption key if not exists
const envFile = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envFile, 'utf8');

if (!envContent.includes('ENCRYPTION_KEY=')) {
  // Generate a secure key
  const encryptionKey = crypto.randomBytes(32).toString('base64');
  
  // Append to .env file
  fs.appendFileSync(envFile, `\n# Encryption\nENCRYPTION_KEY=${encryptionKey}\n`);
  
  console.log('Encryption key generated and added to .env file');
} else {
  console.log('Encryption key already exists in .env file');
}
