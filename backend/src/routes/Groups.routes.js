// src/routes/groups.routes.js
const express = require("express");  
const router = express.Router(); 
const GroupsController = require("../controllers/groups.controller");
const { authMiddleware } = require("../middlewares/auth.middleware"); // Middleware auth

// CREATE GROUP
router.post('/', authMiddleware, GroupsController.createGroup);

// GET ALL GROUPS
router.get('/', authMiddleware, GroupsController.getAllGroups);

// GET ONE GROUP
router.get('/:id', authMiddleware, GroupsController.getGroupById);

// UPDATE GROUP
router.put('/:id', authMiddleware, GroupsController.updateGroup);

// DELETE GROUP
router.delete('/:id', authMiddleware, GroupsController.deleteGroup);

module.exports = router;


// ─── Posts Groupes avec Cloudinary ───
const multer = require('multer');
const { uploadToCloudinary } = require('../config/cloudinary');
const db = require('../models');
const uploadG = multer({ dest: '/tmp/uploads/' });

router.post('/:id/posts', uploadG.single('media'), async (req, res) => {
  try {
    const { content, user_id } = req.body;
    let media_url = null;
    let media_type = 'none';

    if (req.file) {
      media_url = await uploadToCloudinary(req.file.path, 'multiwave/groups');
      media_type = req.file.mimetype.startsWith('video') ? 'video' :
                   req.file.mimetype.startsWith('audio') ? 'audio' : 'image';
    }

    const post = await db.Posts.create({
      user_id, content, media: media_url, media_type,
      group_id: req.params.id,
      status: 'public', likes_count: 0, comments_count: 0
    });
    res.status(201).json({ success: true, data: { ...post.toJSON(), media_url } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
