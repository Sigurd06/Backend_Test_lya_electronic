import { Router } from 'express'

import { createUser } from '../controllers/users.controller'

export default function (): Router {
  const router = Router()

  /**
   * @swagger
   * tags:
   *  name: Users
   *  description: Users endpoint
   */

  router.post('/users', createUser)

  return router
}
