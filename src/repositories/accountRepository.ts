import { ObjectId, Double } from "mongodb";
import { getAccountCollection } from "../db.js";
import type { Account, AccountInput } from "../types/account.js";

type AccountDocument = {
    _id: ObjectId;
    user_id: string;
    balance: Double;
    account_type: string;
    created_at: Date;
};

const collection = () => getAccountCollection();

//  Helper function to convert document to Account object
function toAccount(document: AccountDocument): Account {
    return {
        id: document._id.toString(),
        user_id: document.user_id,
        balance: Number(document.balance),
        account_type: document.account_type,
        created_at: document.created_at,
    };
}

export async function createAccount(accountDetails: AccountInput): Promise<Account> {
    const account = {
        user_id: accountDetails.user_id,
        balance: new Double(0.0),
        account_type: accountDetails.account_type,
        created_at: new Date(),
    }

    const result = await collection().insertOne(account);

    return {
        ...account,
        balance: 0,
        id: result.insertedId.toString(),
    };
}

export async function getAccounts(customer_id: string): Promise<Account[]> {
    //  Get all accounts that have matching customer_id
    const accounts = await collection().find<AccountDocument>({user_id: customer_id}).toArray();
    return accounts.map(toAccount);
}