import pg, { PoolConfig } from 'pg'

const dbUrl = process.env['DATABASE_URL']

// When our app is deployed to the internet
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
const urlConfig: PoolConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
}

// When we're running this app on our own computer
// we'll connect to the postgres database that is
// also running on our computer (localhost)
const normalConfig: PoolConfig = {
  host: 'localhost',
  port: 5432,
  database: 'starforge',
}

const pool = new pg.Pool(dbUrl ? urlConfig : normalConfig)

export default pool
