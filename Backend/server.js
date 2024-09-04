// server.js
const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(cors({
  origin:"*",
}));
app.use(express.json());

// Use the routes defined in postRoutes.js
app.use('/api', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
