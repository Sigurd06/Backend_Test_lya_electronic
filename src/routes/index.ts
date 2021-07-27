import { json, Router, urlencoded } from 'express'
import config from '../config'
import cors from 'cors'

import usersRoutes from './users.routes'

export default function (): Router {
  const router = Router()
  router
    .use(
      cors({
        origin: config.ALLOWED_ORIGIN
      })
    )
    .use(urlencoded({ extended: false }))
    .use(json())

  router.use(usersRoutes())

  return router
}
