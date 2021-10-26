import { getSession } from 'next-auth/client'
import { connectToDB } from '../../../helpers/db'
import { comparePassword, hashpassword} from '../../../helpers/auth'

const handler = async (req, res) => {

    console.log("req.body", req.body)


    if (!req.method === "PATCH") {
        return
    }

    const session = await getSession({
        req: req,
    })
    console.log("session", session)

    if (!session) {
        res.status(401).json({ message: "Auth failed" })
        return
    }

    const newPass = req.body.newPassword
    const oldPass = req.body.oldPassword
    const useremail = session.user.email
    console.log("newPass", newPass)
    const client = await connectToDB()

    const userCollection = await client.db().collection('users')
    const user = await userCollection.findOne({ email: useremail })

    

    if (!user) {
        res.status(404).json({ message: "Failed to find user"})
        client.close()
        return
    }

    const currPass = user.hashedPassword

    const isValid = await comparePassword(oldPass, currPass )
    console.log("isValid", isValid)
    if (!isValid) {
        res.status(403).json({ message: "Password does not match"})
        client.close()
        return
    }

    const hashedPassword = await hashpassword(newPass)

    const result = await userCollection.updateOne({
        email: useremail
    }, {
        $set: {
            hashedPassword: hashedPassword
        }
    })

    client.close()
    res.status(200).json({ message: "Password updated"})
}

export default handler;