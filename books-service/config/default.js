module.exports = {
  port: process.env.PROJECT_PORT || 4000,
  db: {
    host: process.env.PROJECT_DB_HOST || 'db',
    port: process.env.PROJECT_DB_PORT || 28015,
    db: process.env.PROJECT_DB_DB || 'books',
    table: process.env.PROJECT_DB_TABLE || 'books'
  }
};
