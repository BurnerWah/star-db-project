import type { RequestHandler } from 'express'

export const rejectUnauthenticated: RequestHandler = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next()
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403)
  }
}

export const rejectNonAdmin: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated() && req.user.administrator) {
    next()
  } else {
    res.sendStatus(403)
  }
}
