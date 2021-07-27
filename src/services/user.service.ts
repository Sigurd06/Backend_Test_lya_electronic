import User, { IUser } from '../models/User.model'

export default class AuthService {
  async create (data: {
    username: string
    password: string
  }): Promise<IUser | null> {
    const response = await this.find(data.username)
    if (!response) {
      const newUser: IUser = new User({
        username: data.username,
        password: data.password
      })
      return await newUser.save()
    }
    return null
  }

  async find (username: string): Promise<IUser | null> {
    const user = await User.findOne({ username })
    if (!user) return null
    return user
  }

  async findId (id: string): Promise<IUser | null> {
    const user = await User.findById(id)
    if (!user) return null
    return user
  }

  async update (
    id: string,
    username: string,
    password: string
  ): Promise<boolean> {
    const user = await this.findId(id)
    if (user) {
      await User.findByIdAndUpdate(user._id, { username, password })
      return true
    }
    return false
  }

  async active (id: string): Promise<void> {
    await User.findByIdAndUpdate(id, { active: true })
  }

  async delete (id: string): Promise<void> {
    await User.findByIdAndDelete(id)
  }
}
