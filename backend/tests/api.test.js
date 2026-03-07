const request = require('supertest');
const path = require('path');
const fs = require('fs');
const { createDb } = require('../db/database');

// Use an in-memory DB for tests
const TEST_DB = ':memory:';
process.env.DB_PATH = TEST_DB;

// We must create the app after setting DB_PATH so server.js picks it up.
// Instead, we directly assemble the app here to use an in-memory DB.
const express = require('express');
const cors = require('cors');

function buildApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const db = createDb(TEST_DB);
  app.use('/api/services', require('../routes/services')(db));
  app.use('/api/technicians', require('../routes/technicians')(db));
  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
  return app;
}

describe('Health check', () => {
  const app = buildApp();

  test('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Service Requests API', () => {
  let app;

  beforeEach(() => {
    app = buildApp();
  });

  const validRequest = {
    full_name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '0801234567',
    address: '12 Solar St, Lagos',
    service_type: 'solar',
    description: 'Need solar panels installed on roof.',
  };

  test('POST /api/services creates a request', async () => {
    const res = await request(app).post('/api/services').send(validRequest);
    expect(res.status).toBe(201);
    expect(res.body.full_name).toBe('Jane Doe');
    expect(res.body.status).toBe('pending');
    expect(res.body.service_type).toBe('solar');
  });

  test('POST /api/services rejects missing fields', async () => {
    const res = await request(app).post('/api/services').send({ full_name: 'Jane' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('POST /api/services rejects invalid service_type', async () => {
    const res = await request(app)
      .post('/api/services')
      .send({ ...validRequest, service_type: 'plumbing' });
    expect(res.status).toBe(400);
  });

  test('GET /api/services returns list', async () => {
    await request(app).post('/api/services').send(validRequest);
    const res = await request(app).get('/api/services');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/services/:id returns single request', async () => {
    const created = await request(app).post('/api/services').send(validRequest);
    const res = await request(app).get(`/api/services/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });

  test('GET /api/services/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/services/99999');
    expect(res.status).toBe(404);
  });

  test('PATCH /api/services/:id/status updates status', async () => {
    const created = await request(app).post('/api/services').send(validRequest);
    const res = await request(app)
      .patch(`/api/services/${created.body.id}/status`)
      .send({ status: 'in_progress' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('in_progress');
  });

  test('PATCH /api/services/:id/status rejects invalid status', async () => {
    const created = await request(app).post('/api/services').send(validRequest);
    const res = await request(app)
      .patch(`/api/services/${created.body.id}/status`)
      .send({ status: 'unknown' });
    expect(res.status).toBe(400);
  });
});

describe('Technician Applications API', () => {
  let app;

  beforeEach(() => {
    app = buildApp();
  });

  const validApplication = {
    full_name: 'Ade Smith',
    email: 'ade@example.com',
    phone: '0809876543',
    specialization: 'electrical',
    years_experience: 5,
    certifications: 'COREN, NABTEB',
    cover_letter: 'I am experienced in industrial electrical installations.',
  };

  test('POST /api/technicians creates an application', async () => {
    const res = await request(app).post('/api/technicians').send(validApplication);
    expect(res.status).toBe(201);
    expect(res.body.full_name).toBe('Ade Smith');
    expect(res.body.status).toBe('pending');
    expect(res.body.specialization).toBe('electrical');
  });

  test('POST /api/technicians rejects missing fields', async () => {
    const res = await request(app).post('/api/technicians').send({ full_name: 'Ade' });
    expect(res.status).toBe(400);
  });

  test('POST /api/technicians rejects invalid specialization', async () => {
    const res = await request(app)
      .post('/api/technicians')
      .send({ ...validApplication, specialization: 'plumbing' });
    expect(res.status).toBe(400);
  });

  test('POST /api/technicians rejects negative years_experience', async () => {
    const res = await request(app)
      .post('/api/technicians')
      .send({ ...validApplication, years_experience: -1 });
    expect(res.status).toBe(400);
  });

  test('GET /api/technicians returns list', async () => {
    await request(app).post('/api/technicians').send(validApplication);
    const res = await request(app).get('/api/technicians');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/technicians/:id returns single application', async () => {
    const created = await request(app).post('/api/technicians').send(validApplication);
    const res = await request(app).get(`/api/technicians/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });

  test('GET /api/technicians/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/technicians/99999');
    expect(res.status).toBe(404);
  });

  test('PATCH /api/technicians/:id/status updates status', async () => {
    const created = await request(app).post('/api/technicians').send(validApplication);
    const res = await request(app)
      .patch(`/api/technicians/${created.body.id}/status`)
      .send({ status: 'accepted' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('accepted');
  });

  test('PATCH /api/technicians/:id/status rejects invalid status', async () => {
    const created = await request(app).post('/api/technicians').send(validApplication);
    const res = await request(app)
      .patch(`/api/technicians/${created.body.id}/status`)
      .send({ status: 'hired' });
    expect(res.status).toBe(400);
  });
});
