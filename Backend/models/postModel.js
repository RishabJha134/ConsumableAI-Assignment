// models/postModel.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Function to get all posts
const getAllPosts = (req, res) => {
  db.all('SELECT * FROM posts', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Function to get a post by ID
const getPostById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(row);
  });
};

// Function to create a new post
const createPost = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.run(sql, [title, content], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, content });
  });
};

// Function to delete a post
const deletePost = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  });
};

// Function to update a post
const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
  db.run(sql, [title, content, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post updated successfully', changes: this.changes });
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost
};
