import {getSession} from 'next-auth/client'

const handler = async (req,res) => {

    if (!req.method === "PATCH") {
        return
    }

    const session = await getSession({
        req: req,
    })

    if (!session) {
        res.status(401).json({message: "Auth failed"})
        return 
    }

    if (session) {

    }

}

export default handler;