// src/controllers/upload.controller.js
const { uploadToCloudinary } = require('../config/cloudinary');

module.exports = {
  async uploadImage(req, res) {
    try {
      if (!req.file) return res.status(400).json({ success: false, error: 'Aucun fichier reçu' });
      const url = await uploadToCloudinary(req.file.path, 'multiwave/images');
      res.json({ success: true, url, path: url });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async uploadVideo(req, res) {
    try {
      if (!req.file) return res.status(400).json({ success: false, error: 'Aucun fichier reçu' });
      const url = await uploadToCloudinary(req.file.path, 'multiwave/videos');
      res.json({ success: true, url, path: url });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async uploadAudio(req, res) {
    try {
      if (!req.file) return res.status(400).json({ success: false, error: 'Aucun fichier reçu' });
      const url = await uploadToCloudinary(req.file.path, 'multiwave/audio');
      res.json({ success: true, url, path: url });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async uploadWhisper(req, res) {
    try {
      if (!req.file) return res.status(400).json({ success: false, error: 'Aucun fichier reçu' });
      const url = await uploadToCloudinary(req.file.path, 'multiwave/whisper');
      res.json({ success: true, url, path: url });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async uploadWhatsapp(req, res) {
    try {
      if (!req.file) return res.status(400).json({ success: false, error: 'Aucun fichier reçu' });
      const url = await uploadToCloudinary(req.file.path, 'multiwave/whatsapp');
      res.json({ success: true, url, path: url });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};
