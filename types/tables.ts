export interface DBUser {
  id: number
  username: string
  argon2id_hash: string
  created_at: Date
  admin: boolean
}
