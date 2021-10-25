import { MongoClient } from 'mongodb'
const connectionString = `${process.env.NEXT_PUBLIC_MONGO_DB_HOST}${process.env.NEXT_PUBLIC_MONGO_DB_USERNAME}:${process.env.NEXT_PUBLIC_MONGO_DB_PASS}${process.env.NEXT_PUBLIC_MONGO_DB_HOST_CLUSTER}`

export const connectToDB = async () =>{
    const db = MongoClient.connect(connectionString)
    return db
}

export const insertNewUser = async (client, collection, data) => {
    const db = client.db()
    const result = await db.collection(collection).insertOne(data)
    return result
}

