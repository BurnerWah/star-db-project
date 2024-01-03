import { Router } from 'express'
import { ParsedItem } from '~typings/structs.ts'
import { DBObject, DBObjectType } from '~typings/tables.ts'
import { parseDeclination } from '../db/normalizers.ts'
import pool from '../db/pool.ts'
import { rejectUnauthenticated } from '../middleware/authentication.ts'

const saved = Router()

saved.get('/', rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.sendStatus(401)
    return
  }
  try {
    // This query gives the client a lot more information than they need, but
    // it's the simpllest possible query to get everything. It'll be turned
    // into a longer but more limited query later, but postgres has no way
    // to select all columns except one.
    const results = await pool.query<
      DBObject & {
        [Column in keyof DBObjectType as `type_${Column}`]: DBObjectType[Column]
      }
    >(
      /*sql*/ `
        SELECT
	        o.*,
	        t.name AS type_name
        FROM
	        users_objects AS uo
	        INNER JOIN objects AS o ON uo.object_id = o.id
	        INNER JOIN object_types AS t ON o.type_id = t.id
        WHERE
	        uo.user_id = $1;
      `,
      [req.user.id],
    )
    const savedItems: ParsedItem[] = results.rows.map((row) => ({
      id: row.id,
      name: row.name,
      type: {
        id: row.type_id,
        name: row.type_name,
      },
      right_ascension: row.right_ascension,
      declination: row.declination
        ? parseDeclination(row.declination)
        : undefined,
      distance:
        row.distance && row.distance_error
          ? {
              value: row.distance,
              error: row.distance_error,
            }
          : undefined,
      apparent_magnitude: row.apparent_magnitude,
      absolute_magnitude: row.absolute_magnitude,
      mass: row.mass,
      redshift: row.redshift,
    }))
    res.send(savedItems)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default saved