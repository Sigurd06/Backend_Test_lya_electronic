import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  password: string
  active?: boolean
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

export default model<IUser>('User', UserSchema)
