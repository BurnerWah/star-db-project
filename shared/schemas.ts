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
export const ItemNameSchemaPart = z
  .string()
  .min(1, { message: 'Name must be at least 1 character.' })
export const ArcMinuteSchemaPart = z.coerce.number().min(0).max(59)
export const ArcSecondSchemaPart = z.coerce.number().min(0).lt(60)
// The server has degrees and sign separated, while the client does not
export const ServerDeclinatorSchemaPart = z.optional(
  z.object({
    sign: z.number().min(-1).max(1).int(),
    degrees: z.number().min(0).lt(90).int(),
    arcmin: ArcMinuteSchemaPart,
    arcsec: ArcSecondSchemaPart,
  }),
)
export const DistanceSchemaPart = z.optional(
  z.object({
    value: z.coerce.number().positive({
      message: 'Distances are always positive',
    }),
    error: z.coerce.number().positive({
      message: 'A margin of error cannot be negative',
    }),
  }),
)
export const ApparentMagnitudeSchemaPart = z.optional(z.coerce.number())
export const AbsoluteMagnitudeSchemaPart = z.optional(z.coerce.number())
export const MassSchemaPart = z.optional(
  z.coerce.number().positive({
    message: 'Negative masses have yet to be discovered',
  }),
)
export const RedshiftSchemaPart = z.optional(z.coerce.number())
export const NasaImageIdSchemaPart = z.optional(
  z.string().max(64, { message: 'Image ID too long' }),
)

export const ItemSubmissionSchema = z.object({
  name: ItemNameSchemaPart,
  type: z.nativeEnum(EDBObjectTypes),
  right_ascension: z.optional(
    z
      .string({ invalid_type_error: 'Right ascension must be a string' })
      .min(9, { message: 'Right ascension input is incomplete' })
      .max(15, { message: 'Right ascension must be less than 15 characters' })
      .regex(/^\d\d:\d\d:\d\d(?:\.\d{,6})?$/, { message: 'Invalid format' }),
  ),
  declination: ServerDeclinatorSchemaPart,
  distance: DistanceSchemaPart,
  apparent_magnitude: ApparentMagnitudeSchemaPart,
  absolute_magnitude: AbsoluteMagnitudeSchemaPart,
  mass: MassSchemaPart,
  redshift: RedshiftSchemaPart,
  nasa_image_id: NasaImageIdSchemaPart,
})

export const ClientItemSubmissionSchema = ItemSubmissionSchema.extend({
  type: OBJECT_TYPES,
  right_ascension: z.optional(
    z.object({
      hours: z.coerce.number().positive().max(23).int(),
      min: z.coerce.number().positive().max(59).int(),
      sec: z.coerce.number().positive().lt(60),
    }),
  ),
  declination: z.optional(
    z.object({
      degrees: z.coerce.number().min(-90).max(90).int(),
      arcmin: ArcMinuteSchemaPart,
      arcsec: ArcSecondSchemaPart,
    }),
  ),
})

export const ItemListingQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().nonnegative().optional(),
  page_size: z.enum(['5', '10', '25', '50', '100']).optional(),
})
