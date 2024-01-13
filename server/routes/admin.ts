import { Router } from 'express'
import { z } from 'zod'
import { ServerItemSubmissionSchema } from '~shared/schemas.ts'
import { unparseDeclination } from '../db/normalizers.ts'
import pool from '../db/pool.ts'
import { rejectNonAdmin } from '../middleware/authentication.ts'
import { validate } from '../middleware/validator.ts'

const admin = Router()

admin.use(rejectNonAdmin)

admin.delete(
  '/delete/:id',
  validate(z.object({ params: z.object({ id: z.coerce.number() }) })),
  async (req, res) => {
    const { id } = req.params
    try {
      const result = await pool.query(
        `DELETE FROM objects WHERE id = $1::integer`,
        [id],
      )
      console.log(result)
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  },
)

admin.post(
  '/add',
  validate(z.object({ body: ServerItemSubmissionSchema })),
  async (req, res) => {
    try {
      const result = await pool.query(
        /*sql*/ `
          INSERT INTO objects (
            name,
            type_id,
            created_by,
            right_ascension,
            declination,
            distance,
            distance_error,
            apparent_magnitude,
            absolute_magnitude,
            mass,
            redshift,
            nasa_image_id
          )
          VALUES (
            $1,  $2,  $3,  $4,
            $5,  $6,  $7,  $8,
            $9,  $10, $11, $12
          )
        `,
        [
          req.body.name,
          req.body.type,
          req.user!.id, // User should alwys be set anyways
          req.body.right_ascension,
          req.body.declination
            ? unparseDeclination(req.body.declination)
            : null,
          req.body.distance?.value,
          req.body.distance?.error,
          req.body.apparent_magnitude,
          req.body.absolute_magnitude,
          req.body.mass,
          req.body.redshift,
          req.body.nasa_image_id,
        ],
      )
      console.log(result)
      res.sendStatus(201)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  },
)

export default admin
