const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'web',
  password: 'zz1973',
  port: 5432,
});

module.exports = pool;
