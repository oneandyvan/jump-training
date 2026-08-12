import dotenv from "dotenv";
import { MongoClient, type Collection, type Document } from "mongodb";
import { MongoConnectionNotFound } from "./errors/MongoError.js";

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
let accountCollection: Collection<Document> | null = null;
let transactionCollection: Collection<Document> | null = null;

export async function connectToDatabase() {
    await client.connect();
    const db = client.db(dbName);
    customerCollection = db.collection("customers");
    accountCollection = db.collection("accounts");
    transactionCollection = db.collection("transactions");
    console.log(`Connected to MongoDB database \"${dbName}\"`);
}

export function getCustomerCollection() {
    if (!customerCollection) {
        throw new MongoConnectionNotFound();
    }

    return customerCollection;
}

export function getAccountCollection() {
    if (!accountCollection) {
        throw new MongoConnectionNotFound();
    }

    return accountCollection;
}

export function getTransactionCollection() {
    if (!transactionCollection) {
        throw new MongoConnectionNotFound();
    }

    return transactionCollection;
}