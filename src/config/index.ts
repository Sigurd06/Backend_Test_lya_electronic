import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT || 3000,
  SECRET_KEY: process.env.SECRET_KEY || 'secret',
  MONGO_URI:
        process.env.MONGO_URI || 'mongodb://localhost:27017/backend_test',
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || '*'
}
