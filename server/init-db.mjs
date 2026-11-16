import { DatabaseSync } from 'node:sqlite';
import { existsSync } from 'node:fs';

const url = process.env.DATABASE_URL || 'sqlite:database.sqlite';
if (!url.startsWith('sqlite:')) {
  throw new Error('DATABASE_URL must be a sqlite: URL.');
}
const filename = url.slice('sqlite:'.length);
if (existsSync(filename)) {
  throw new Error(`Database already exists: ${filename}. Refusing to replace or modify it.`);
}
const db = new DatabaseSync(filename);
db.exec(`CREATE TABLE Post (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
)`);
db.close();
console.log(`Created empty Post table in ${filename}`);
