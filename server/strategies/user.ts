import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import oldPool from '../db/pool.js'
import { comparePassword } from '../lib/encryption.js'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  oldPool
    .query('SELECT * FROM "user" WHERE id = $1', [id])
    .then((result) => {
      // Handle Errors
      const user = result?.rows && result?.rows?.[0]

      if (user) {
        // user found
        delete user.password // remove password so it doesn't get sent
        // done takes an error (null in this case) and a user
        done(null, user)
      } else {
        // user not found
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null)
      }
    })
    .catch((error) => {
      console.log('Error with query during deserializing user ', error)
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null)
    })
})

// Does actual work of logging in
passport.use(
  'local',
  new LocalStrategy((username, password, done) => {
    oldPool
      .query('SELECT * FROM "user" WHERE username = $1', [username])
      .then((result) => {
        const user = result?.rows && result?.rows?.[0]
        if (user && comparePassword(password, user.password)) {
          // All good! Passwords match!
          // done takes an error (null in this case) and a user
          done(null, user)
        } else {
          // Not good! Username and password do not match.
          // done takes an error (null in this case) and a user (also null in this case)
          // this will result in the server returning a 401 status code
          done(null, null)
        }
      })
      .catch((error) => {
        console.log('Error with query for user ', error)
        // done takes an error (we have one) and a user (null in this case)
        // this will result in the server returning a 500 status code
        done(error, null)
      })
  }),
)

export default passport
