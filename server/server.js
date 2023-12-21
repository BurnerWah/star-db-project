// import { urlencoded } from 'body-parser'
import 'dotenv/config'
import express from 'express'
import sessionMiddleware from './modules/session-middleware.js'
import userRouter from './routes/user.router.js'
import passport from './strategies/user.strategy.js'

const app = express()

// Body parser middleware
app.use(express.json())
// app.use(urlencoded({ extended: true }))

// Passport Session Configuration //
app.use(sessionMiddleware)

// start up passport sessions
app.use(passport.initialize())
app.use(passport.session())

/* Routes */
app.use('/api/user', userRouter)

// Serve static files
app.use(express.static('build'))

// App Set //
const PORT = process.env['PORT'] || 5001

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
