import type { RequestHandler } from 'express'
import type { ZodObject, ZodTypeAny, z } from 'zod'

/**
 * Middleware to validate a request body, query, and/or params using Zod.
 * It also infers type information from the schema which can be used in later
 * request handlers.
 * @param schema A schema containing a body, query, and/or params object to validate
 * @returns A middleware function to be used with Express
 * @see {@link https://dev.to/franciscomendes10866/schema-validation-with-zod-and-expressjs-111p Schema Validation with Zod and Express.js}
 * @see {@link https://zod.dev/ Zod Documentation}
 */
export function validate<
  Schema extends ZodObject<{
    body?: ZodTypeAny
    query?: ZodTypeAny
    params?: ZodTypeAny
  }>,
  Params = {
    [Key in keyof z.infer<Schema>['params']]: string
  },
  ReqBody = z.infer<Schema>['body'],
  Query = z.infer<Schema>['query'],
>(schema: Schema): RequestHandler<Params, unknown, ReqBody, Query> {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
