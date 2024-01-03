import { Declination, MeasurementWithUncertainty, ParsedItem } from './structs'
import { DBObject, DBObjectType, DBUser } from './tables'

export interface RegisterBody {
  username: string
  password: string
}

export type LoginBody = RegisterBody

export type UserResponse = Pick<DBUser, 'id' | 'username' | 'admin'>

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
}
