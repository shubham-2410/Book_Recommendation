const Database = require('better-sqlite3');

require('dotenv').config();
const dbPath = process.env.DB;

// Create a database instance with connection pooling
const connectDB = () => {
  return new Database(dbPath, { verbose: console.log, connection: { maximum: 5, minimum: 1 } });
};

module.exports = { connectDB };