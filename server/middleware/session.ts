import connectPgSimple from 'connect-pg-simple'
import session from 'express-session'
import { badSecret, exampleBadSecret } from '../constants/warnings.ts'
import pool from '../db/pool.ts'

const PGStore = connectPgSimple(session)

function serverSessionSecret() {
  const secret = process.env['SERVER_SESSION_SECRET']
  if (!secret || secret.length < 8 || secret === exampleBadSecret) {
    // Warning if user doesn't have a good secret
    console.log(badSecret)
  }

  return secret
}

const middleware = session({
  secret: serverSessionSecret() || 'secret', // please set this in your .env file
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new PGStore({ pool: pool }),
})

export default middleware
