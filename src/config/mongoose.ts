import mongoose, { ConnectOptions } from 'mongoose'
import config from '.'

const opts: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

export async function mongooseConnect () {
  try {
    await mongoose.connect(config.MONGO_URI, opts)
    console.log('Database is connected')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
