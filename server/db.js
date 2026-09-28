const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'database', 'qr_pro_studio.db');
const SCHEMA_PATH = path.join(__dirname, '..', 'database', 'schema.sql');

// Asegurar que el directorio de la base de datos existe
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);

// Aplicar esquema (idempotente gracias a CREATE TABLE IF NOT EXISTS)
if (fs.existsSync(SCHEMA_PATH)) {
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(schema);
}

module.exports = db;
