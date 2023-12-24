import { verify } from '@node-rs/argon2'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { DBUser } from '~typings/tables.ts'
import { ARGON2_OPTIONS } from '../constants/security.ts'
import pool from '../db/pool.ts'

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const result = await pool.query<DBUser>(
        /*sql*/ `
          SELECT * FROM users
          WHERE username = $1
        `,
        [username],
      )
      const user = result.rows[0]
      if (user) {
        const hash = user.argon2id_hash
        const valid = await verify(hash, password, ARGON2_OPTIONS)
        if (valid) {
          return cb(null, user)
        }
        return cb(null, false, {
          message: 'Incorrect username or password.',
        })
      }
    } catch (error) {
      console.log('Error with local strategy:', error)
      return cb(error)
    }
  }),
)

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username, admin: user.admin })
  })
})

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user)
  })
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends DBUser {}
  }
}

export default passport
