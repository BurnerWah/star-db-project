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
    params?: ZodTypeAny
    body?: ZodTypeAny
    query?: ZodTypeAny
  }>,
>(
  schema: Schema,
): RequestHandler<
  z.infer<Schema>['params'],
  unknown,
  z.infer<Schema>['body'],
  z.infer<Schema>['query']
> {
  return async (req, res, next) => {
    try {
      const { params, body, query } = await schema.parseAsync({
        params: req.params,
        body: req.body,
        query: req.query,
      })

      // Assign the validated values to the request object
      req.params = params
      req.body = body
      req.query = query

      return next()
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
