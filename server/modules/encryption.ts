import bcryptjs from 'bcryptjs'

// This determines how secure the salt should be
const SALT_WORK_FACTOR = 10

export function encryptPassword(password: string) {
  // This generates a random salt
  const salt = bcryptjs.genSaltSync(SALT_WORK_FACTOR)

  // This next line hashes the user password and the random salt
  // this salt and hash (and not the actual password) will then get stored in the database
  return bcryptjs.hashSync(password, salt)
}

export function comparePassword(
  candidatePassword: string,
  storedPassword: string,
) {
  /*
  This takes in the candidate password (what the user entered) to check it.
  The stored password has the original salt, so it will run the
  candidate password and salt through the same hashing process as before.
  If that result is the same as the stored password, then we have a match!
  If this interests you, check out this video https://www.youtube.com/watch?v=8ZtInClXe1Q
  */
  return bcryptjs.compareSync(candidatePassword, storedPassword)
}
