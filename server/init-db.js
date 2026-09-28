// Inicializa la base de datos (aplica esquema) y siembra los marcos predefinidos.
const db = require('./db');
const { seedPresetFrames, seedPresetLogos } = require('./seed');

seedPresetFrames();
seedPresetLogos();
console.log('✅ Base de datos inicializada correctamente');
process.exit(0);
