// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, deletePost } = require('../models/postModel');

// Define routes
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', createPost);
router.delete('/posts/:id', deletePost);

module.exports = router;
