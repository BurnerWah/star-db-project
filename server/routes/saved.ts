import { Router } from 'express'
import { z } from 'zod'
import { ItemListingQuerySchema } from '~shared/schemas.ts'
import type { ListingResponse } from '~typings/requests.ts'
import type { ParsedItem } from '~typings/structs.ts'
import type { DBObject, DBObjectType } from '~typings/tables.ts'
import { LISTING_PAGE_SIZE } from '../constants/queries.ts'
import { parseDeclination } from '../db/normalizers.ts'
import pool from '../db/pool.ts'
import { rejectUnauthenticated } from '../middleware/authentication.ts'
import { validate } from '../middleware/validator.ts'

const saved = Router()

saved.use(rejectUnauthenticated)

saved.get(
  '/',
  validate(z.object({ query: ItemListingQuerySchema })),
  async (req, res) => {
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
        } & { total_rows: number }
      >(
        /*sql*/ `
          SELECT
            o.*,
            t.name AS type_name,
            c.count AS total_rows
          FROM
            users_objects AS uo
            INNER JOIN objects AS o ON uo.object_id = o.id
            INNER JOIN object_types AS t ON o.type_id = t.id
            JOIN (
              SELECT count(*)
              FROM users_objects
              WHERE user_id = $1
            ) as c ON true
          WHERE
            uo.user_id = $1
            AND o.name ILIKE '%' || $2 || '%'
          ORDER BY
            o.name
          LIMIT 5 OFFSET 5 * $3
          ;
        `,
        [req.user.id, req.query.search ?? '', req.query.page ?? 0],
      )
      const items: ParsedItem[] = results.rows.map((row) => ({
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
      const total_rows = results.rows[0]?.total_rows ?? 0
      res.send({
        page: req.query.page ?? 0,
        pageCount: Math.ceil(total_rows / LISTING_PAGE_SIZE),
        items,
      } as ListingResponse)
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  },
)

saved.put(
  '/add',
  validate(
    z.object({
      body: z.object({ id: z.number() }),
    }),
  ),
  async (req, res) => {
    if (!req.user) {
      res.sendStatus(401)
      return
    }
    console.log(`User with id ${req.user.id} is saving item ${req.body.id}`)
    try {
      const result = await pool.query(
        /*sql*/ `
          INSERT INTO users_objects (
            user_id,
            object_id
          ) VALUES ($1, $2);
        `,
        [req.user.id, req.body.id],
      )
      console.log(result)
      res.sendStatus(201)
    } catch (error) {
      console.log('Error saving item: ', error)
      res.sendStatus(500)
    }
  },
)

saved.delete(
  '/remove/:id',
  validate(z.object({ params: z.object({ id: z.string() }) })),
  async (req, res) => {
    if (!req.user) {
      res.sendStatus(401)
      return
    }
    try {
      const result = await pool.query(
        `DELETE FROM users_objects WHERE user_id = $1 AND object_id = $2`,
        [req.user.id, req.params.id],
      )
      console.log(result)
      res.sendStatus(200)
    } catch (error) {
      console.log('Error removing item: ', error)
    }
  },
)

export default saved
