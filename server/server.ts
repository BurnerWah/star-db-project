import 'dotenv/config'
import express from 'express'
import sessionMiddleware from './middleware/session.ts'
import userRouter from './routes/user.ts'
import passport from './strategies/user.ts'

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
app.use(express.static('dist/client'))

// App Set //
const PORT = process.env['PORT'] ?? 5001

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
