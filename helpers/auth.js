import { hash, compare } from 'bcryptjs'

export const hashpassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    console.log("hashedPassword", hashedPassword)
    return hashedPassword
}

export const comparePassword = async (password, hashedPassword) => {
   const result = await compare(password, hashedPassword)
   return result
}