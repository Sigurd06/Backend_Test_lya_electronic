import config from '.'

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Test',
      version: '1.0.0',
      description: 'Backend developer test ( lya electronic )'
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`
      }
    ]
  },
  apis: ['./src/routes/*.ts']
}
