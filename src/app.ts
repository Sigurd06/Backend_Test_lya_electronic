import express, { Application } from 'express'

import passport from 'passport'
import authMiddleware from './middleware/authentication'

import routes from './routes'

export default class App {
  _app: Application

  constructor (private port: number | string) {
    this._app = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this._app.use(passport.initialize())
    passport.use(authMiddleware)
  }

  routes () {
    this._app.use(routes())
  }

  start (callback: any | Function): void {
    this._app.listen(this.port, callback)
  }

  static init (port: number | string): App {
    return new App(port)
  }
}
