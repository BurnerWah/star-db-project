export interface DBUser {
  id: number
  username: string
  argon2id_hash: string
  created_at: Date
  admin: boolean
}

export enum EDBObjectTypes {
  Star = 1,
  Planet = 2,
  Galaxy = 3,
  Nebula = 4,
  Cluster = 5,
  'Black Hole' = 6,
}

export interface DBObjectType {
  id: EDBObjectTypes | number
  name: keyof typeof EDBObjectTypes
}

export interface DBObject {
  id: number
  name: string
  created_by: DBUser['id']
  created_at: Date
  type: DBObjectType['id']
  right_ascension?: Date
  declination?: number
  distance?: number
  distance_error?: number
  apparent_magnitude?: number
  absolute_magnitude?: number
  mass?: number
  redshift?: number
  nasa_image_id?: string
}
