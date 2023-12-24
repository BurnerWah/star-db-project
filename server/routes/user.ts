import { Router } from 'express'
import { pbkdf2, randomBytes } from 'node:crypto'
import { RegisterBody } from '~typings/requests.ts'
import { DBUser } from '~typings/tables.ts'
import { PBKDF2_CONFIG } from '../constants/security.ts'
import pool from '../db/pool.ts'
import { rejectUnauthenticated } from '../middleware/authentication.ts'
import passport from '../strategies/pbkdf2.ts'

const router = Router()

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user)
})

/**
 * Handles POST request with new user data
 * Partially based on passport example
 * This honestly feels like a bit of a hack
 * @see {@link https://github.com/passport/todos-express-password/blob/master/routes/auth.js passport example}
 */
router.post<'/register', never, unknown, RegisterBody>(
  '/register',
  async (req, res, next) => {
    const { username, password } = req.body
    try {
      const salt = randomBytes(PBKDF2_CONFIG.saltlength)
      pbkdf2(
        password,
        salt,
        PBKDF2_CONFIG.iterations,
        PBKDF2_CONFIG.keylen,
        PBKDF2_CONFIG.digest,
        async (err, hashedPassword) => {
          if (err) return next(err)
          try {
            const result = await pool.query<DBUser>(
              /*sql*/ `
              INSERT INTO "users" (
                username,
                password_hash,
                password_salt
              )
              VALUES ($1, $2, $3)
              RETURNING *
            `,
              [username, hashedPassword, salt],
            )
            // res.sendStatus(201)
            req.login(result.rows[0], (err) => {
              if (err) return next(err)
              res.redirect('/')
            })
          } catch (error) {
            console.log('User registration failed: ', error)
            res.sendStatus(500)
          }
        },
      )
    } catch (error) {
      console.log('User registration failed: ', error)
      res.sendStatus(500)
    }
  },
)

/**
 * Handles login form authenticate/login POST
 * This refused to work until I just directly copied the passport example's login method
 * @see {@link https://github.com/passport/todos-express-password/blob/master/routes/auth.js passport example}
 */
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  }),
  // (_req, res) => {
  //   res.sendStatus(200)
  // },
)

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) return next(err)
    res.redirect('/')
  })
  // res.sendStatus(200)
})

export default router
