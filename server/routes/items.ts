import { Router } from 'express'
import { MeasurementWithUncertainty } from '~typings/structs.ts'
import { DBObject, DBObjectType } from '~typings/tables.ts'
import { parseDeclination } from '../db/normalizers.ts'
import pool from '../db/pool.ts'

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
  | 'nasa_image_id'
> & {
  [Column in keyof DBObjectType as `type_${Column}`]: DBObjectType[Column]
}

items.get('/', async (req, res) => {
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
	      o.redshift,
	      o.nasa_image_id
      FROM
	      objects AS o
	      INNER JOIN object_types AS t ON o.type_id = t.id;
    `)
    const items = result.rows.map((item) => ({
      id: item.id,
      name: item.name,
      type: {
        id: item.type_id,
        name: item.type_name,
      } as DBObjectType,
      right_ascension: item.right_ascension,
      declination: item.declination
        ? parseDeclination(item.declination)
        : undefined,
      distance:
        item.distance && item.distance_error
          ? ({
              value: item.distance,
              error: item.distance_error,
            } as MeasurementWithUncertainty)
          : undefined,
      apparent_magnitude: item.apparent_magnitude,
      absolute_magnitude: item.absolute_magnitude,
      mass: item.mass,
      redshift: item.redshift,
      nasa_image_id: item.nasa_image_id,
    }))
    res.send(items)
  } catch (error) {
    console.log('Error getting items: ', error)
    res.sendStatus(500)
  }
})

export default items
