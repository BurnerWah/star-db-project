import { Router } from 'express'
import { rejectNonAdmin } from '../middleware/authentication.ts'

const admin = Router()

admin.use(rejectNonAdmin)

export default admin
