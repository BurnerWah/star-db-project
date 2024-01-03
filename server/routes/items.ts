import { Router } from 'express'
import { DBObject } from '~typings/tables.ts'
import pool from '../db/pool.ts'

const items = Router()

items.get('/', async (req, res) => {
  try {
    const result = await pool.query<DBObject>(/*sql*/ `
      SELECT * FROM objects
    `)
    res.send(result.rows)
  } catch (error) {
    console.log('Error getting items: ', error)
    res.sendStatus(500)
  }
})

export default items
