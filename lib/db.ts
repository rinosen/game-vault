// lib/db.ts
import Database from 'better-sqlite3';

// Ini akan membuat file 'games.db' otomatis jika belum ada
const db = new Database('games.db');

// Buat tabel jika belum ada (Schema Manual)
const createTable = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      platform TEXT NOT NULL,
      status TEXT NOT NULL,
      rating INTEGER,
      review TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// Jalankan fungsi buat tabel saat file ini dipanggil pertama kali
createTable();

export default db;