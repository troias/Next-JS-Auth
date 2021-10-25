import NextAuth from "next-auth"
import { connectToDB } from '../../../helpers/db'
import { comparePassword } from '../../../helpers/auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
               async authorize(credentials) {

                    const client = await connectToDB()
                    const usersColletion = client.db().collection('users')
                    const user = await usersColletion.findOne({ email: credentials.email })

                    if (!user) {
                        client.close()
                        throw new Error("No user found")

                    }

                    const isValid = await comparePassword(credentials.password, user.hashedPassword)

                    if (!isValid) {
                        client.close()
                        throw new Error("Invalid password")
                    }
                    
                    client.close()
                    console.log("user", user.hashedPassword)
                     return {
                        email: user.email,
                    }
               
                }
            
        }),
    ]
})



