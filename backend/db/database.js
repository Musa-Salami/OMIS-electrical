const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'omis.db');

function createDb(dbPath) {
  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS service_requests (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name   TEXT    NOT NULL,
      email       TEXT    NOT NULL,
      phone       TEXT    NOT NULL,
      address     TEXT    NOT NULL,
      service_type TEXT   NOT NULL CHECK(service_type IN ('electrical','solar','both')),
      description TEXT    NOT NULL,
      status      TEXT    NOT NULL DEFAULT 'pending'
                          CHECK(status IN ('pending','in_progress','completed','cancelled')),
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS technician_applications (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name     TEXT    NOT NULL,
      email         TEXT    NOT NULL,
      phone         TEXT    NOT NULL,
      specialization TEXT  NOT NULL CHECK(specialization IN ('electrical','solar','both')),
      years_experience INTEGER NOT NULL,
      certifications  TEXT,
      cover_letter    TEXT    NOT NULL,
      status          TEXT    NOT NULL DEFAULT 'pending'
                              CHECK(status IN ('pending','reviewing','accepted','rejected')),
      created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return db;
}

module.exports = { createDb, DB_PATH };
