import { pbkdf2 } from 'node:crypto'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { DBUser } from '~typings/tables.ts'
import { PBKDF2_CONFIG } from '../constants/security.ts'
import pool from '../db/pool.ts'

// Based on https://github.com/passport/todos-express-password/blob/master/routes/auth.js

passport.use(
  new LocalStrategy(async (username, password, callback) => {
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
        const hash = user.password_hash
        const salt = user.password_salt
        pbkdf2(
          password,
          salt,
          PBKDF2_CONFIG.iterations,
          PBKDF2_CONFIG.keylen,
          PBKDF2_CONFIG.digest,
          (err, hashedPassword) => {
            if (err) {
              return callback(err)
            }
            if (hashedPassword.equals(hash)) {
              return callback(null, user)
            }
            return callback(null, false, {
              message: 'Incorrect username or password.',
            })
          },
        )
      } else {
        return callback(null, false, {
          message: 'Incorrect username or password.',
        })
      }
    } catch (error) {
      console.log('Error with local strategy:', error)
      return callback(error)
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
