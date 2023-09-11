const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
});

pool.query('SELECT current_database()', (err, res) => {
  if (err) {
    console.error('Query error:', err);
  } else {
    console.log('Database name:', res.rows[0].current_database);
  }
});

module.exports = pool;
