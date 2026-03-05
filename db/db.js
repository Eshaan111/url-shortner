const Database = require('better-sqlite3');
const db = new Database('myapp.db');

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    long TEXT UNIQUE NOT NULL,
    short TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert (prepared statement)
// const insert = db.prepare('INSERT INTO codes (long, short) VALUES (?, ?)');
// const result = insert.run('alice@example.com', 'alcgm.com');
// console.log(result.lastInsertRowid); // → 1

// Query one row
// const codes = db.prepare('SELECT * FROM codes WHERE id = ?').get(1);
// console.log(codes); // → { id: 1, name: 'Alice', ... }

// Query all rows
// const code = db.prepare('SELECT * FROM codes').all();

// // Transactions
// const insertMany = db.transaction((users) => {
//   for (const u of users) insert.run(u.name, u.email);
// });
// insertMany([
//   { name: 'Bob', email: 'bob@example.com' },
//   { name: 'Carol', email: 'carol@example.com' },
// ]);

module.exports = db;