const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { JWT_SECRET, requireAuth } = require('../middleware/auth');

const router = express.Router();

function toUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    fullName: row.full_name,
    avatarUrl: row.avatar_url,
    subscriptionType: row.subscription_type,
  };
}

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { username, email, password, fullName } = req.body || {};
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  const existing = db
    .prepare('SELECT id FROM users WHERE email = ? OR username = ?')
    .get(String(email), String(username));
  if (existing) {
    return res.status(409).json({ message: 'El email o nombre de usuario ya está en uso' });
  }

  const hash = bcrypt.hashSync(String(password), 10);
  const info = db
    .prepare('INSERT INTO users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)')
    .run(String(username), String(email), hash, fullName || null);

  const user = toUser(db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid));
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ user, token });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(String(email || ''));
  if (!row || !bcrypt.compareSync(String(password || ''), row.password_hash)) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(row.id);

  const user = toUser(row);
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ user, token });
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  const user = toUser(db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId));
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ user });
});

module.exports = router;
