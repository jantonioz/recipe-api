require('dotenv').config()

module.exports = {
  database: {
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    connectionStr: process.env.DATABASE_CONN_STR
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  api: {
    port: process.env.PORT,
    base: process.env.BASE
  }
}