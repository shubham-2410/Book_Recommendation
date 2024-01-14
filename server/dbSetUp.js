const sqlite3 = require('sqlite3').verbose();

// Function to set up books table
async function setupBooksTable(db) {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Function to set up users table
async function setupUsersTable(db) {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        account_type TEXT NOT NULL CHECK(account_type IN ('user', 'admin')),
        favourite_genre TEXT,
        favourite_author TEXT,
        favorite_book INTEGER REFERENCES books(id)
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Function to seed the books table with sample data
async function seedBooksTable(db) {
  const sampleBooks = [
    { "title": "Quantum Nexus", "author": "Evelyn Stellar", "genre": "Sci-Fi" },
    { "title": "Eternal Embrace", "author": "Lucas Heartfield", "genre": "Romance" },
    { "title": "Midnight Shadows", "author": "Olivia Enigma", "genre": "Mystery" },
    { "title": "Fatal Pursuit", "author": "Max Thrillmore", "genre": "Thriller" },
    { "title": "Nebula Chronicles", "author": "Evelyn Stellar", "genre": "Sci-Fi" },
    { "title": "Love's Awakening", "author": "Lucas Heartfield", "genre": "Romance" },
    { "title": "Enigmatic Whispers", "author": "Olivia Enigma", "genre": "Mystery" },
    { "title": "Perilous Game", "author": "Max Thrillmore", "genre": "Thriller" },
    { "title": "Galactic Odyssey", "author": "Evelyn Stellar", "genre": "Sci-Fi" },
    { "title": "Passionate Hearts", "author": "Lucas Heartfield", "genre": "Romance" },
    { "title": "Secrets Unveiled", "author": "Olivia Enigma", "genre": "Mystery" },
    { "title": "Deadly Conspiracy", "author": "Max Thrillmore", "genre": "Thriller" },
    { "title": "Time Warp Chronicles", "author": "Evelyn Stellar", "genre": "Sci-Fi" },
    { "title": "Everlasting Love", "author": "Lucas Heartfield", "genre": "Romance" },
    { "title": "Cryptic Clues", "author": "Olivia Enigma", "genre": "Mystery" },
    { "title": "Mind Games", "author": "Max Thrillmore", "genre": "Thriller" },
    { "title": "Celestial Odyssey", "author": "Evelyn Stellar", "genre": "Sci-Fi" },
    { "title": "Infinite Desire", "author": "Lucas Heartfield", "genre": "Romance" },
    { "title": "Whispers in the Dark", "author": "Olivia Enigma", "genre": "Mystery" },
    { "title": "Dangerous Pursuits", "author": "Max Thrillmore", "genre": "Thriller" },
    { "title": "Space-time Paradox", "author": "Evelyn Stellar", "genre": "Sci-Fi" },
    { "title": "Heart's Refuge", "author": "Lucas Heartfield", "genre": "Romance" },
    { "title": "Lost Secrets", "author": "Olivia Enigma", "genre": "Mystery" },
    { "title": "Lethal Vendetta", "author": "Max Thrillmore", "genre": "Thriller" },
    { "title": "Stellar Odyssey", "author": "Evelyn Stellar", "genre": "Sci-Fi" },
    { "title": "Endless Love", "author": "Lucas Heartfield", "genre": "Romance" },
    { "title": "Hidden Truths", "author": "Olivia Enigma", "genre": "Mystery" },
    { "title": "Chasing Shadows", "author": "Max Thrillmore", "genre": "Thriller" },
    { "title": "Dimensional Rift", "author": "Evelyn Stellar", "genre": "Sci-Fi" },
    { "title": "Passionate Secrets", "author": "Lucas Heartfield", "genre": "Romance" },
    { "title": "Twisted Mysteries", "author": "Olivia Enigma", "genre": "Mystery" },
    { "title": "Deadly Whispers", "author": "Max Thrillmore", "genre": "Thriller" },
    { "title": "Astro-romance", "author": "Evelyn Stellar", "genre": "Sci-Fi" },
    { "title": "Love Beyond Time", "author": "Lucas Heartfield", "genre": "Romance" },
    { "title": "Conspiracy Revealed", "author": "Olivia Enigma", "genre": "Mystery" },
    { "title": "Perilous Plot", "author": "Max Thrillmore", "genre": "Thriller" }
  ]
  ;

  await Promise.all(sampleBooks.map(async (book) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO books (title, author, genre) VALUES (?, ?, ?)', [book.title, book.author, book.genre], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }));
}

// Function to show books
async function showBooks(db) {
  try {
    const query = 'SELECT * FROM books';

    const rows = await new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // Display or process the retrieved data
    console.log('Books:');
    rows.forEach((row) => {
      console.log(`ID: ${row.id}, Title: ${row.title}, Author: ${row.author}, Genre: ${row.genre}`);
    });
  } catch (error) {
    console.error('Error in showBooks:', error.message);
  }
}

// Function to perform the complete database setup
async function setupDatabase() {
  const db = new sqlite3.Database('bookRecommendation.db');

  try {
    // Set up books table
    await setupBooksTable(db);

    // Set up users table
    await setupUsersTable(db);

    // Seed the books table with sample data
    await seedBooksTable(db);

    // Show books
    await showBooks(db);
  } catch (error) {
    console.error('Error setting up database:', error.message);
  } finally {
    // Close the database connection
    db.close();
  }
}

// Call setupDatabase asynchronously
(async () => {
  const db = new sqlite3.Database('bookRecommendation.db', (err) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
    } else {
      console.log('Connected to the database');

      // Call setupDatabase
      setupDatabase();
    }
  });
})();
