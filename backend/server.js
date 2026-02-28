const express = require('express');
const cors = require('cors');
const path = require('path');
const { apiLimiter } = require('./middleware/limiter');
const { createDb, DB_PATH } = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Initialize database
const db = createDb(DB_PATH);

// Routes (rate limiting applied per-handler inside each router)
app.use('/api/services', require('./routes/services')(db));
app.use('/api/technicians', require('./routes/technicians')(db));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Fallback to frontend for all other GET requests
app.get('*', apiLimiter, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Only start listening when this file is run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`OMIS server running on http://localhost:${PORT}`);
  });
}

module.exports = { app, db };
