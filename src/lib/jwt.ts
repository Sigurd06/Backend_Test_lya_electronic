import jwt from 'jsonwebtoken'
import config from '../config'

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, config.SECRET_KEY, {
    expiresIn: '5min',
    algorithm: 'HS256'
  })
}
