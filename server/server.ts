import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import session from './middleware/session.ts'
import items from './routes/items.ts'
import user from './routes/user.ts'
import passport from './strategies/argon2id.ts'

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// This is such a funny name for a logger I love it
app.use(morgan('dev'))

// Passport Session Configuration
app.use(session)

// start up passport sessions
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api/user', user)
app.use('/api/items', items)

// Serve static files
app.use(express.static('dist/client'))

// App Set
const PORT = process.env['PORT'] ?? 5001

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
