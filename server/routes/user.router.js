import { Router } from 'express'
import { rejectUnauthenticated } from '../modules/authentication-middleware.js'
import { encryptPassword } from '../modules/encryption.js'
import pool from '../modules/pool.js'
import userStrategy from '../strategies/user.strategy.js'

const router = Router()

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user)
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  try {
    await pool.query(
      /*sql*/ `
        INSERT INTO "user" (
          username,
          password
        )
        VALUES ($1, $2)
        RETURNING id
      `,
      [req.body.username, encryptPassword(req.body.password)],
    )
    res.sendStatus(201)
  } catch (error) {
    console.log('User registration failed: ', error)
    res.sendStatus(500)
  }
  // pool
  //   .query(
  //     /*sql*/ `
  //       INSERT INTO "user" (
  //         username,
  //         password
  //       )
  //       VALUES ($1, $2)
  //       RETURNING id
  //     `,
  //     [req.body.username, encryptPassword(req.body.password)],
  //   )
  //   .then(() => res.sendStatus(201))
  //   .catch((err) => {
  //     console.log('User registration failed: ', err)
  //     res.sendStatus(500)
  //   })
})

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (_req, res) => {
  res.sendStatus(200)
})

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout()
  res.sendStatus(200)
})

export default router
