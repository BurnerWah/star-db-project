import { Router } from 'express'
import { z } from 'zod'
import { ItemListingQuerySchema } from '~shared/schemas.ts'
import { ItemDetails } from '~typings/requests.ts'
import { ParsedItem } from '~typings/structs.ts'
import { DBObject, DBObjectType } from '~typings/tables.ts'
import { parseDeclination } from '../db/normalizers.ts'
import pool from '../db/pool.ts'
import { validate } from '../middleware/validator.ts'

const items = Router()

// This would be simpler with Omit<>, but it feels better to use Pick<> for
// selections, since that's what's actually happening.
type ItemQuery = Pick<
  DBObject,
  | 'id'
  | 'name'
  | 'right_ascension'
  | 'declination'
  | 'distance'
  | 'distance_error'
  | 'apparent_magnitude'
  | 'absolute_magnitude'
  | 'mass'
  | 'redshift'
> & {
  [Column in keyof DBObjectType as `type_${Column}`]: DBObjectType[Column]
}

items.get(
  '/',
  validate(z.object({ query: ItemListingQuerySchema })),
  async (req, res) => {
    try {
      const result = await pool.query<ItemQuery>(/*sql*/ `
        SELECT
          o.id,
          o.name,
          t.id AS type_id,
          t.name AS type_name,
          o.right_ascension,
          o.declination,
          o.distance,
          o.distance_error,
          o.apparent_magnitude,
          o.absolute_magnitude,
          o.mass,
          o.redshift
        FROM
          objects AS o
          INNER JOIN object_types AS t ON o.type_id = t.id;
      `)
      const items: ParsedItem[] = result.rows.map((item) => ({
        id: item.id,
        name: item.name,
        type: {
          id: item.type_id,
          name: item.type_name,
        },
        right_ascension: item.right_ascension,
        declination: item.declination
          ? parseDeclination(item.declination)
          : undefined,
        distance:
          item.distance && item.distance_error
            ? {
                value: item.distance,
                error: item.distance_error,
              }
            : undefined,
        apparent_magnitude: item.apparent_magnitude,
        absolute_magnitude: item.absolute_magnitude,
        mass: item.mass,
        redshift: item.redshift,
      }))
      res.send(items)
    } catch (error) {
      console.log('Error getting items: ', error)
      res.sendStatus(500)
    }
  },
)

items.get(
  '/:id',
  validate(z.object({ params: z.object({ id: z.coerce.number() }) })),
  async (req, res) => {
    try {
      // In stretch goals, this would also left join some other tables to get more specialized data
      // A subquery is used to join the user's saved items to the list of items,
      // and the IS NOT NULL operator can convert this into a boolean indicating
      // whether the user has saved the item. If the user isn't logged in, the
      // user_id in the subquery should be null, but since it's a left join that
      // just means that it'll say that every item is not saved.
      const result = await pool.query<
        Omit<DBObject, 'created_by' | 'created_at' | 'type_id'> & {
          [Column in keyof DBObjectType as `type_${Column}`]: DBObjectType[Column]
        } & { saved: boolean }
      >(
        /*sql*/ `
          SELECT
            o.id,
            o.name,
            t.id AS type_id,
            t.name AS type_name,
            o.right_ascension,
            o.declination,
            o.distance,
            o.distance_error,
            o.apparent_magnitude,
            o.absolute_magnitude,
            o.mass,
            o.redshift,
            o.nasa_image_id,
            s.object_id IS NOT NULL AS saved
          FROM objects AS o
          INNER JOIN object_types AS t ON o.type_id = t.id
          LEFT JOIN (
            SELECT object_id
            FROM users_objects
            WHERE user_id = $2
          ) AS s ON o.id = s.object_id
          WHERE o.id = $1;
        `,
        [req.params.id, req.user?.id],
      )
      const row = result.rows[0]
      if (!row) {
        res.sendStatus(404)
        return
      }
      res.send({
        id: row.id,
        name: row.name,
        type: {
          id: row.type_id,
          name: row.type_name,
        },
        right_ascension: row.right_ascension as unknown as string,
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
        nasa_image_id: row.nasa_image_id,
        saved: row.saved,
      } as ItemDetails)
    } catch (error) {
      console.log('Error getting item: ', error)
      res.sendStatus(500)
    }
  },
)

export default items
