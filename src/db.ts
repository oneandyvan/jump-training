import dotenv from "dotenv";
import { MongoClient, type Collection, type Document } from "mongodb";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE;

if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}
if (!dbName) {
    throw new Error("MONGODB_DATABASE is not defined in environment variables");
}

const client = new MongoClient(uri);
let customerCollection: Collection<Document> | null = null;

export async function connectToDatabase() {
    await client.connect();
    const db = client.db(dbName);
    customerCollection = db.collection("customers");
    console.log(`Connected to MongoDB database \"${dbName}\"`);
}

export function getCustomerCollection() {
    if (!customerCollection) {
        throw new Error("MongoDB client is not connected. Call connectToDatabase() first.");
    }

    return customerCollection;
}
