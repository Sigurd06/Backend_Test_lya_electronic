import { Router } from 'express'
import passport from 'passport'
import {
  activeUser,
  createUser,
  deleteUser,
  findUser,
  getUserById,
  updateUserById
} from '../controllers/users.controller'

export default function (): Router {
  const router = Router()

  router.post('/users', createUser)

  router.post('/authorization', findUser)

  router.get(
    '/users/:id',
    passport.authenticate('jwt', { session: false }),
    getUserById
  )

  router.put(
    '/users/:id',
    passport.authenticate('jwt', { session: false }),
    updateUserById
  )

  router.delete(
    '/users/:id',
    passport.authenticate('jwt', { session: false }),
    deleteUser
  )

  router.patch(
    '/users/:id/active',
    passport.authenticate('jwt', { session: false }),
    activeUser
  )

  return router
}
