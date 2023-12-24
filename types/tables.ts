export interface DBUser {
  id: number
  username: string
  password_hash: Buffer
  password_salt: Buffer
  created_at: Date
  admin: boolean
}
