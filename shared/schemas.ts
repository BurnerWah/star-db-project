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
