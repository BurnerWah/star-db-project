import { Router } from 'express'
import pool from '../db/pool.ts'
import { rejectNonAdmin } from '../middleware/authentication.ts'

const admin = Router()

admin.use(rejectNonAdmin)

admin.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      /*sql*/ `
        DELETE FROM objects WHERE id = $1;
      `,
      [id],
    )
    console.log(result)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

export default admin
