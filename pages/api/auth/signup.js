
import { connectToDB, insertNewUser } from "../../../helpers/db"

import { hashpassword } from "../../../helpers/auth"

const handler = async (req, res) => {


    if (req.method === 'POST') {

        const newUser = req.body

        const { email, password } = newUser

        if (!email ||
            !email.includes('@') ||
            !password ||
            password.trim().length < 5
        ) {
            res.status(422).json({
                message:
                    "invalid input password should be at least 7 characters"
            });
            return;
        }

        const client = await connectToDB()
      
        const existingUser = await client.db().collection('users').findOne({
            email: email
        })
        // console.log("client", client)

        if (existingUser) {
            res.status(422).json({ message: "user already exists"})
            client.close()
            return
        }
        const hashedPassword = await hashpassword(password)
        const userData = {email, hashedPassword}
    
        const result = await insertNewUser(client, 'users', userData)
        console.log("result", result)
        res.status(201).json({ message: result })
        client.close()
    }

    if (req.method === 'GET') {
        res.status(201).json({ message: "hi" })
    }
}

export default handler