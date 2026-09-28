const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'qr-pro-studio-secret-change-me';

function getTokenFromHeader(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

// Exige autenticación. Si no hay token válido, responde 401.
function requireAuth(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

// Autenticación opcional: adjunta userId si hay token válido, pero nunca rechaza.
function optionalAuth(req, res, next) {
  const token = getTokenFromHeader(req);
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.userId = payload.userId;
    } catch (err) {
      // token inválido: se ignora
    }
  }
  next();
}

module.exports = { JWT_SECRET, requireAuth, optionalAuth };
