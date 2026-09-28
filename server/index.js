const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const framesRoutes = require('./routes/frames');
const logosRoutes = require('./routes/logos');
const { seedPresetFrames, seedPresetLogos } = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Archivos estáticos: marcos predefinidos (database/images) y subidos (server/uploads)
app.use('/images', express.static(path.join(__dirname, '..', 'database', 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/frames', framesRoutes);
app.use('/api/logos', logosRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  res.status(500).json({ message: err.message || 'Error interno del servidor' });
});

// Sembrar marcos y logos predefinidos al arrancar
seedPresetFrames();
seedPresetLogos();

app.listen(PORT, () => {
  console.log(`✅ QR Pro Studio API corriendo en http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
