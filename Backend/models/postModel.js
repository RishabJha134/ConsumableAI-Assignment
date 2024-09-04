// models/postModel.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db'); // Using a file-based database for persistence

// Initialize database and create table if it does not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )`);
});

const getAllPosts = (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

const getPostById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(row);
  });
};

const createPost = (req, res) => {
  const { title, content } = req.body;
  db.run("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
};

const deletePost = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(204).end();
  });
};

module.exports = { getAllPosts, getPostById, createPost, deletePost };
