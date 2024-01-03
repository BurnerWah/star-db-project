import { ParsedItem } from './structs'
import { DBUser } from './tables'

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
