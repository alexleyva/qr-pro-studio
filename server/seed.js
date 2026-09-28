const fs = require('fs');
const path = require('path');
const db = require('./db');

// Siembra los marcos que ya están en database/images como marcos predefinidos públicos.
function seedPresetFrames() {
  const imagesDir = path.join(__dirname, '..', 'database', 'images');
  if (!fs.existsSync(imagesDir)) return;

  const files = fs
    .readdirSync(imagesDir)
    .filter((f) => /\.(png|jpe?g|svg|webp)$/i.test(f));

  const insert = db.prepare(
    'INSERT INTO custom_frames (user_id, name, description, image_url, thumbnail_url, is_public, category) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  let count = 0;
  for (const file of files) {
    const imageUrl = '/images/' + encodeURIComponent(file);
    const existing = db.prepare('SELECT id FROM custom_frames WHERE image_url = ?').get(imageUrl);
    if (existing) continue;

    const name = file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
    insert.run(null, name || file, 'Marco predefinido', imageUrl, imageUrl, 1, 'general');
    count++;
  }

  if (count > 0) console.log(`🌱 Se sembraron ${count} marcos predefinidos`);
}

const PRESET_LOGOS = [
  { name: 'WhatsApp', file: 'whatsapp.png' },
  { name: 'Instagram', file: 'instagram.png' },
  { name: 'X (Twitter)', file: 'twitter.png' },
  { name: 'Facebook', file: 'facebook.png' },
  { name: 'YouTube', file: 'youtube.png' },
  { name: 'LinkedIn', file: 'linkedin.png' },
  { name: 'PayPal', file: 'paypal.png' },
  { name: 'Bitcoin', file: 'bitcoin.png' },
];

// Siembra los logos predefinidos (database/images/logos) en la tabla custom_logos.
function seedPresetLogos() {
  const insert = db.prepare(
    'INSERT INTO custom_logos (user_id, name, description, image_url, thumbnail_url, is_public, category) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  let count = 0;
  for (const logo of PRESET_LOGOS) {
    const imageUrl = '/images/logos/' + logo.file;
    const existing = db.prepare('SELECT id FROM custom_logos WHERE image_url = ?').get(imageUrl);
    if (existing) continue;
    insert.run(null, logo.name, 'Logo predefinido', imageUrl, imageUrl, 1, 'social');
    count++;
  }

  if (count > 0) console.log(`🌱 Se sembraron ${count} logos predefinidos`);
}

module.exports = { seedPresetFrames, seedPresetLogos };
