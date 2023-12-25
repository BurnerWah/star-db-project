import { DBUser } from './tables'

export interface RegisterBody {
  username: string
  password: string
}

export type LoginBody = RegisterBody

export type UserResponse = Pick<DBUser, 'id' | 'username' | 'admin'>
