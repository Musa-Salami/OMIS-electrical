const express = require('express');
const router = express.Router();
const { apiLimiter } = require('../middleware/limiter');

module.exports = function (db) {
  // POST /api/services – submit a service request
  router.post('/', apiLimiter, (req, res) => {
    const { full_name, email, phone, address, service_type, description } = req.body;

    if (!full_name || !email || !phone || !address || !service_type || !description) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const allowed = ['electrical', 'solar', 'both'];
    if (!allowed.includes(service_type)) {
      return res.status(400).json({ error: 'Invalid service_type.' });
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO service_requests (full_name, email, phone, address, service_type, description)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(full_name, email, phone, address, service_type, description);
      const row = db.prepare('SELECT * FROM service_requests WHERE id = ?').get(result.lastInsertRowid);
      return res.status(201).json(row);
    } catch (err) {
      return res.status(500).json({ error: 'Database error.' });
    }
  });

  // GET /api/services – list all service requests (admin)
  router.get('/', apiLimiter, (req, res) => {
    const rows = db.prepare('SELECT * FROM service_requests ORDER BY created_at DESC').all();
    return res.json(rows);
  });

  // GET /api/services/:id – get a single service request
  router.get('/:id', apiLimiter, (req, res) => {
    const row = db.prepare('SELECT * FROM service_requests WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found.' });
    return res.json(row);
  });

  // PATCH /api/services/:id/status – update status (admin)
  router.patch('/:id/status', apiLimiter, (req, res) => {
    const { status } = req.body;
    const allowed = ['pending', 'in_progress', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const existing = db.prepare('SELECT * FROM service_requests WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Not found.' });

    db.prepare('UPDATE service_requests SET status = ? WHERE id = ?').run(status, req.params.id);
    const updated = db.prepare('SELECT * FROM service_requests WHERE id = ?').get(req.params.id);
    return res.json(updated);
  });

  return router;
};
