import { Request, Response } from 'express'
import { encrypted, compareEncrypted } from '../lib/bcrypt'
import { generateToken } from '../lib/jwt'
import UserService from '../services/user.service'

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body
  const passwordHash = encrypted(password)
  const data = {
    username,
    password: passwordHash
  }
  const Service = new UserService()

  try {
    const user = await Service.create(data)
    if (user) {
      return res.status(201).json({ id: user._id })
    }
    return res.status(400).json({ message: 'user is already created' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'internal error server' })
  }
}

export const findUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body
  const Service = new UserService()
  try {
    const user = await Service.find(username)
    if (user) {
      if (compareEncrypted(user.password, password)) {
        const TOKEN = generateToken({
          id: user._id,
          username,
          password,
          active: user.active
        })
        return res.status(200).json({ token: TOKEN })
      }
      return res.status(400).json({ message: 'wrong credentials' })
    }
    return res.status(400).json({ message: 'user not found' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'internal error server' })
  }
}

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params
  // console.log(req.user)

  const Service = new UserService()
  try {
    const user = await Service.findId(id)
    if (user) {
      return res.status(200).json({ user })
    }
    return res.status(400).json({ message: 'user not found' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'internal error server' })
  }
}

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { username, password } = req.body
  const passwordHash = encrypted(password)
  const Service = new UserService()
  try {
    const response = await Service.update(id, username, passwordHash)
    if (response) {
      return res.status(200).json({ message: 'user updated successfully' })
    }
    return res.status(400).json({ message: 'user not found' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'internal error server' })
  }
}

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params
  const Service = new UserService()
  try {
    await Service.delete(id)
    return res.status(200).json({ message: 'user deleted successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'internal error server' })
  }
}

export const activeUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params
  const Service = new UserService()
  try {
    await Service.active(id)
    return res.status(200).json({ message: 'active user' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'internal error server' })
  }
}
