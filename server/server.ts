import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'node:path'
import { limiter } from './middleware/rate-limit.ts'
import session from './middleware/session.ts'
import admin from './routes/admin.ts'
import items from './routes/items.ts'
import saved from './routes/saved.ts'
import user from './routes/user.ts'
import passport from './strategies/argon2id.ts'

const app = express()

// Middleware
app.use(morgan('dev'))
app.use(helmet())

// Express body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Passport Session Configuration
app.use(session)

// start up passport sessions
app.use(passport.initialize())
app.use(passport.session())

// Rate-limiting
app.use('/api', limiter)

// Routes
app.use('/api/user', user)
app.use('/api/items', items)
app.use('/api/saved', saved)
app.use('/api/admin', admin)

// Serve static files
app.use(express.static('dist/client'))
// Fallback for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.resolve('dist/client/index.html'))
})

// App Set
const PORT = process.env['PORT'] ?? 5001

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
