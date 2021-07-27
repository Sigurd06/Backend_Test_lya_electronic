import config from './config'
import { mongooseConnect } from './config/mongoose'
import App from './app'

const { PORT } = config

const app = App.init(PORT)

app.start(async (): Promise<void> => {
  console.log('Server is running on PORT:', PORT)
  await mongooseConnect()
})
