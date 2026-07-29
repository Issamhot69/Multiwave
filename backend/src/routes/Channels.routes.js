'use strict';

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const ChannelsController = require('../controllers/channels.controller');

router.post('/', authMiddleware, ChannelsController.createChannel);
router.get('/', ChannelsController.listChannels);
router.put('/:id', authMiddleware, ChannelsController.updateChannel);
router.delete('/:id', authMiddleware, ChannelsController.deleteChannel);
router.post('/:id/join', authMiddleware, ChannelsController.joinChannel);
router.post('/:id/leave', authMiddleware, ChannelsController.leaveChannel);

module.exports = router;

// ─── Posts Channels avec Cloudinary ───
const multer = require('multer');
const { uploadToCloudinary } = require('../config/cloudinary');
const db = require('../models');
const upload = multer({ dest: '/tmp/uploads/' });

router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await db.Posts.findAll({
      where: { channel_id: req.params.id },
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: posts });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/:id/posts', upload.single('media'), async (req, res) => {
  try {
    const { content, user_id } = req.body;
    let media_url = null;
    let media_type = 'none';

    if (req.file) {
      media_url = await uploadToCloudinary(req.file.path, 'multiwave/channels');
      media_type = req.file.mimetype.startsWith('video') ? 'video' : 
                   req.file.mimetype.startsWith('audio') ? 'audio' : 'image';
    }

    const post = await db.Posts.create({
      user_id, content, media: media_url, media_type,
      channel_id: req.params.id,
      status: 'public', likes_count: 0, comments_count: 0
    });
    res.status(201).json({ success: true, data: { ...post.toJSON(), media_url } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
