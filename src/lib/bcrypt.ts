import bcrypt from 'bcryptjs'

export const encrypted = (stringToEncrypted: string): string => {
  return bcrypt.hashSync(stringToEncrypted, bcrypt.genSaltSync(10))
}

export const compareEncrypted = (
  stringEncrypted: string,
  stringToCompare: string
): boolean => {
  return bcrypt.compareSync(stringToCompare, stringEncrypted)
}
