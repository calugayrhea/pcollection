// config/env.js

require('dotenv').config();

const env = {
  databaseHost: process.env.DATABASE_HOST || 'localhost',
  databaseUser: process.env.DATABASE_USER || 'root',
  databasePassword: process.env.DATABASE_PASSWORD || '',
  databaseName: process.env.DATABASE_NAME || 'collections',
};

module.exports = env;
