import express, { Application } from 'express'

import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './config/swagger'

import routes from './routes'

export default class App {
    _app: Application

    constructor (private port: number | string) {
      this._app = express()
      this.routes()
    }

    routes () {
      this._app.use(routes())
      this._app.use('/docs', swaggerUI.serve, swaggerUI.setup(this.swagger()))
    }

    swagger (): swaggerUI.JsonObject {
      return swaggerJSDoc(options)
    }

    start (callback: any | Function): void {
      this._app.listen(this.port, callback)
    }

    static init (port: number | string): App {
      return new App(port)
    }
}
