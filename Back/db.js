const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SEU_DATABASE',
  password: 'SENHA_DO_SEU_BANCO',
  port: 5432,
});

module.exports = pool;
