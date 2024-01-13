import { z } from 'zod'
import { EDBObjectTypes } from '~typings/tables'

export const OBJECT_TYPES = z.enum([
  'Star',
  'Planet',
  'Galaxy',
  'Nebula',
  'Cluster',
  'BlackHole',
])

export type ZObjectType = z.infer<typeof OBJECT_TYPES>

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required.' })
    .max(64, { message: 'Username must be less than 64 characters.' }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})

export const RegisterSchema = LoginSchema

// Parts of the item submission schema that the client could reuse
export const ArcMinuteSchemaPart = z.coerce.number().nonnegative().max(59)
export const ArcSecondSchemaPart = z.coerce.number().nonnegative().lt(60)
// The server has degrees and sign separated, while the client does not
export const ServerDeclinatorSchemaPart = z.optional(
  z.object({
    sign: z.number().min(-1).max(1).int(),
    degrees: z.number().nonnegative().lt(90).int(),
    arcmin: ArcMinuteSchemaPart,
    arcsec: ArcSecondSchemaPart,
  }),
)

const BaseItemSubmissionSchema = z.object({
  name: z.string().min(1, { message: 'Name must be at least 1 character.' }),
  distance: z.optional(
    z.object({
      value: z.coerce.number().positive({
        message: 'Distances are always positive',
      }),
      error: z.coerce.number().nonnegative({
        message: 'A margin of error cannot be negative',
      }),
    }),
  ),
  apparent_magnitude: z.coerce.number().optional(),
  absolute_magnitude: z.coerce.number().optional(),
  mass: z.optional(
    z.coerce.number().positive({
      message: 'Negative masses have yet to be discovered',
    }),
  ),
  redshift: z.coerce.number().optional(),
  nasa_image_id: z.optional(
    z.string().max(64, { message: 'Image ID too long' }),
  ),
})

export const ServerItemSubmissionSchema = BaseItemSubmissionSchema.merge(
  z.object({
    type: z.nativeEnum(EDBObjectTypes),
    right_ascension: z
      .string({ invalid_type_error: 'Right ascension must be a string' })
      .min(9, { message: 'Right ascension input is incomplete' })
      .max(15, { message: 'Right ascension must be less than 15 characters' })
      // Regex partially based on https://github.com/validatorjs/validator.js/blob/master/src/lib/isTime.js
      .regex(/^([01]?\d|2[0-3]):([0-5]\d):([0-5]\d)($|\.\d{1,6}$)/, {
        message: 'Invalid format',
      })
      .optional(),
    declination: ServerDeclinatorSchemaPart,
  }),
)

export const ClientItemSubmissionSchema = BaseItemSubmissionSchema.merge(
  z.object({
    type: OBJECT_TYPES,
    right_ascension: z.optional(
      z.object({
        hours: z.coerce.number().nonnegative().max(23).int(),
        min: z.coerce.number().nonnegative().max(59).int(),
        sec: z.coerce.number().nonnegative().lt(60),
      }),
    ),
    declination: z.optional(
      z.object({
        degrees: z.coerce.number().min(-90).max(90).int(),
        arcmin: ArcMinuteSchemaPart,
        arcsec: ArcSecondSchemaPart,
      }),
    ),
  }),
)

export const TABLE_PAGE_SIZES = ['5', '10', '25', '50', '100'] as const

export const ItemListingQuerySchema = z.object({
  search: z.string().default(''),
  page: z.coerce.number().int().nonnegative().default(0),
  page_size: z.enum(TABLE_PAGE_SIZES).default('10').transform(Number),
})
