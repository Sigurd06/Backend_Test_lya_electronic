import { Request, Response } from 'express'

export const createUser = (req: Request, res: Response): Response => {
  return res.status(201)
}
