import pg from 'pg'
let pool: pg.Pool

// When our app is deployed to the internet
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg:
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
if (process.env['DATABASE_URL']) {
  pool = new pg.Pool({
    connectionString: process.env['DATABASE_URL'],
    ssl: {
      rejectUnauthorized: false, // DevSkim: ignore DS125134 until 2024-01-19
    },
  })
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is
// also running on our computer (localhost)
else {
  pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'prime_app', // 	💥 Change this to the name of your database!
  })
}

export default pool
