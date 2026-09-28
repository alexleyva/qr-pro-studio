const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'frames');
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '.png').toLowerCase();
    cb(null, `frame-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (PNG, JPG, SVG, WebP)'));
    }
  },
});

function toFrame(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    imageUrl: row.image_url,
    thumbnailUrl: row.thumbnail_url,
    isPublic: !!row.is_public,
    isPremium: !!row.is_premium,
    category: row.category,
  };
}

// GET /api/frames - listar marcos públicos y del usuario
router.get('/', optionalAuth, (req, res) => {
  const userId = req.userId || 0;
  const rows = db
    .prepare(
      'SELECT * FROM custom_frames WHERE is_public = 1 OR user_id = ? OR user_id IS NULL ORDER BY created_at DESC, id DESC'
    )
    .all(userId);
  res.json({ frames: rows.map(toFrame) });
});

// POST /api/frames/upload - subir un marco
router.post('/upload', optionalAuth, upload.single('frame'), (req, res) => {
  try {
    const { name, description, category, isPublic } = req.body || {};
    if (!req.file) {
      return res.status(400).json({ message: 'No se recibió ningún archivo' });
    }
    if (!name) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const imageUrl = `/uploads/frames/${req.file.filename}`;
    const info = db
      .prepare(
        'INSERT INTO custom_frames (user_id, name, description, image_url, thumbnail_url, is_public, category) VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
      .run(
        req.userId || null,
        String(name),
        description || null,
        imageUrl,
        imageUrl,
        String(isPublic) === 'true' ? 1 : 0,
        category || 'general'
      );

    const row = db.prepare('SELECT * FROM custom_frames WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json({ frame: toFrame(row) });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error al subir el marco' });
  }
});

// DELETE /api/frames/:id - eliminar un marco
router.delete('/:id', optionalAuth, (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare('SELECT * FROM custom_frames WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ message: 'Marco no encontrado' });

  // Permitir eliminar marcos públicos/predefinidos o los del propio usuario
  const canDelete = row.user_id === null || (req.userId && row.user_id === req.userId);
  if (!canDelete) {
    return res.status(403).json({ message: 'No tienes permiso para eliminar este marco' });
  }

  const imageUrl = String(row.image_url || '');
  if (imageUrl.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, '..', imageUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  db.prepare('DELETE FROM custom_frames WHERE id = ?').run(id);
  res.json({ message: 'Marco eliminado correctamente' });
});

module.exports = router;
