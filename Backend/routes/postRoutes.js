// routes/postRoutes.js

const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, deletePost, updatePost } = require('../models/postModel');

// Existing routes...
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', createPost);
router.delete('/posts/:id', deletePost);

// New route for updating a post
router.put('/posts/:id', updatePost);

module.exports = router;
