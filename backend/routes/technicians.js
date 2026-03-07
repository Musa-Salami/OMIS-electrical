const express = require('express');
const router = express.Router();
const { apiLimiter } = require('../middleware/limiter');

module.exports = function (db) {
  // POST /api/technicians – submit a technician application
  router.post('/', apiLimiter, (req, res) => {
    const { full_name, email, phone, specialization, years_experience, certifications, cover_letter } = req.body;

    if (!full_name || !email || !phone || !specialization || years_experience === undefined || !cover_letter) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const allowedSpec = ['electrical', 'solar', 'both'];
    if (!allowedSpec.includes(specialization)) {
      return res.status(400).json({ error: 'Invalid specialization.' });
    }

    const exp = parseInt(years_experience, 10);
    if (isNaN(exp) || exp < 0) {
      return res.status(400).json({ error: 'years_experience must be a non-negative integer.' });
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO technician_applications
          (full_name, email, phone, specialization, years_experience, certifications, cover_letter)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(full_name, email, phone, specialization, exp, certifications || null, cover_letter);
      const row = db.prepare('SELECT * FROM technician_applications WHERE id = ?').get(result.lastInsertRowid);
      return res.status(201).json(row);
    } catch (err) {
      return res.status(500).json({ error: 'Database error.' });
    }
  });

  // GET /api/technicians – list all applications (admin)
  router.get('/', apiLimiter, (req, res) => {
    const rows = db.prepare('SELECT * FROM technician_applications ORDER BY created_at DESC').all();
    return res.json(rows);
  });

  // GET /api/technicians/:id – get a single application
  router.get('/:id', apiLimiter, (req, res) => {
    const row = db.prepare('SELECT * FROM technician_applications WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found.' });
    return res.json(row);
  });

  // PATCH /api/technicians/:id/status – update status (admin)
  router.patch('/:id/status', apiLimiter, (req, res) => {
    const { status } = req.body;
    const allowed = ['pending', 'reviewing', 'accepted', 'rejected'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const existing = db.prepare('SELECT * FROM technician_applications WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Not found.' });

    db.prepare('UPDATE technician_applications SET status = ? WHERE id = ?').run(status, req.params.id);
    const updated = db.prepare('SELECT * FROM technician_applications WHERE id = ?').get(req.params.id);
    return res.json(updated);
  });

  return router;
};
