import { Algorithm, type Options as Argon2Options } from '@node-rs/argon2'

/**
 * Argon2 options
 * @see {@link https://soatok.blog/2022/12/29/what-we-do-in-the-etc-shadow-cryptography-with-passwords/ What We Do in the /etc/shadow - Cryptography with Passwords}
 * @see {@link https://github.com/napi-rs/node-rs/tree/main/packages/argon2#api Argon2 API}
 */
export const ARGON2_OPTIONS: Argon2Options = {
  // This is measured in KiB, not bytes
  // Multiplying it by another 1024 makes it use 64GiB of memory
  memoryCost: 1024 * 64,
  algorithm: Algorithm.Argon2id,
}
