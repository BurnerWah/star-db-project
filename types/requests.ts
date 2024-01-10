import type {
  Declination,
  MeasurementWithUncertainty,
  ParsedItem,
} from './structs'
import type { DBObject, DBObjectType, DBUser, EDBObjectTypes } from './tables'

export interface RegisterBody {
  username: string
  password: string
}

export type LoginBody = RegisterBody

export type UserResponse = Pick<DBUser, 'id' | 'username' | 'administrator'>

export interface ListItem extends Omit<ParsedItem, 'right_ascension'> {
  right_ascension?: string
}

export type ListItemsBody = ListItem[]

export interface ItemDetails
  extends Omit<
    DBObject,
    | 'type'
    | 'created_by'
    | 'created_at'
    | 'right_ascension'
    | 'declination'
    | 'distance'
    | 'distance_error'
  > {
  type: DBObjectType
  right_ascension?: string | null
  declination?: Declination
  distance?: MeasurementWithUncertainty
  saved: boolean
}

export interface ItemSubmission {
  name: DBObject['name']
  type: EDBObjectTypes
  right_ascension?: string | undefined
  declination?: Declination | undefined
  distance?: MeasurementWithUncertainty | undefined
  apparent_magnitude?: DBObject['apparent_magnitude']
  absolute_magnitude?: DBObject['absolute_magnitude']
  mass?: DBObject['mass']
  redshift?: DBObject['redshift']
  nasa_image_id?: DBObject['nasa_image_id']
}

export interface ItemSaveBody {
  id: DBObject['id']
}

export interface ListingResponse {
  page: number
  pageCount: number
  items: ListItem[]
}
