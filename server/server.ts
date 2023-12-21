import 'dotenv/config'
import express from 'express'
import sessionMiddleware from './modules/session-middleware.ts'
import userRouter from './routes/user.router.ts'
import passport from './strategies/user.strategy.ts'

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Passport Session Configuration //
app.use(sessionMiddleware)

// start up passport sessions
app.use(passport.initialize())
app.use(passport.session())

/* Routes */
app.use('/api/user', userRouter)

// Serve static files
app.use(express.static('dist'))

// App Set //
const PORT = process.env['PORT'] || 5001

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
