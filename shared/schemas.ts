import { z } from 'zod'

export const OBJECT_TYPES = z.enum([
  'Star',
  'Planet',
  'Galaxy',
  'Nebula',
  'Cluster',
  'Black Hole',
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
