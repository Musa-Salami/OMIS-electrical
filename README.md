# OMIS Electrical & Solar — Installation Service System

A full-stack web application for managing electrical and solar installation service requests, and a platform for technicians to apply for hiring.

---

## Features

| Feature | Description |
|---|---|
| **Service Requests** | Clients can submit requests for electrical, solar, or combined installations |
| **Technician Applications** | Technicians can apply to join the OMIS network |
| **Admin Dashboard** | View and manage all requests and applications; update statuses in real time |
| **REST API** | Full CRUD API powering the frontend |

---

## Tech Stack

- **Backend**: Node.js + Express + SQLite (`better-sqlite3`)
- **Frontend**: Vanilla HTML, CSS, and JavaScript (no build step required)

---

## Project Structure

```
OMIS-electrical/
├── backend/
│   ├── server.js              # Express app entry point
│   ├── package.json
│   ├── db/
│   │   └── database.js        # SQLite schema & connection helper
│   ├── routes/
│   │   ├── services.js        # /api/services routes
│   │   └── technicians.js     # /api/technicians routes
│   └── tests/
│       └── api.test.js        # Jest + Supertest API tests
└── frontend/
    ├── index.html             # Landing page
    ├── service-request.html   # Client service request form
    ├── technician-apply.html  # Technician application form
    ├── admin.html             # Admin dashboard
    └── assets/
        ├── css/style.css
        └── js/
            ├── service-request.js
            ├── technician-apply.js
            └── admin.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher

### Install & Run

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Start the server
npm start
```

The server starts on **http://localhost:3000** and serves both the API and the frontend.

Open your browser and navigate to `http://localhost:3000`.

---

## API Reference

### Service Requests

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/services` | Submit a new service request |
| `GET` | `/api/services` | List all service requests |
| `GET` | `/api/services/:id` | Get a single service request |
| `PATCH` | `/api/services/:id/status` | Update request status |

**Valid `service_type` values:** `electrical`, `solar`, `both`  
**Valid `status` values:** `pending`, `in_progress`, `completed`, `cancelled`

#### Example: Submit a Service Request
```bash
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "08012345678",
    "address": "12 Solar Street, Lagos",
    "service_type": "solar",
    "description": "Need solar panels installed on my roof."
  }'
```

---

### Technician Applications

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/technicians` | Submit a technician application |
| `GET` | `/api/technicians` | List all applications |
| `GET` | `/api/technicians/:id` | Get a single application |
| `PATCH` | `/api/technicians/:id/status` | Update application status |

**Valid `specialization` values:** `electrical`, `solar`, `both`  
**Valid `status` values:** `pending`, `reviewing`, `accepted`, `rejected`

---

## Running Tests

```bash
cd backend
npm test
```

All 18 API tests cover happy-path and error cases for both resources.
