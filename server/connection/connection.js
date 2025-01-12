let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./book.db");

db.run(`PRAGMA foreign_keys = ON;`)

async function createTables() {
    try {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS Books (
          id INTEGER PRIMARY KEY,
          title TEXT NOT NULL UNIQUE,
          author TEXT NOT NULL,
          publicaton TEXT NOT NULL,
          finished INTEGER DEFAULT 0 NOT NULL
        );
      `);
  
      console.log('Tabel berhasil dibuat.');
    } catch (error) {
      console.error('Gagal membuat tabel:', error.message);
    }
  }

  createTables();


  


module.exports = db;