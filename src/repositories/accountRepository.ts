import { ObjectId } from "mongodb";
import { getAccountCollection } from "../db.js";
import type { Account, AccountInput } from "../types/account.js";

type AccountDocument = {
    _id: ObjectId;
    user_id: string;
    balance: number;
    account_type: string;
    created_at: Date;
};

const collection = () => getAccountCollection();

//  Helper function to convert document to Account object
function toAccount(document: AccountDocument): Account {
    return {
        id: document._id.toString(),
        user_id: document.user_id,
        balance: document.balance,
        account_type: document.account_type,
        created_at: document.created_at,
    };
}

export async function createAccount(accountDetails: AccountInput): Promise<Account> {
    const account = {
        user_id: accountDetails.user_id,
        balance: 0,
        account_type: accountDetails.account_type,
        created_at: new Date(),
    }

    const result = await collection().insertOne({account});

    return {
        ...account,
        id: result.insertedId.toString(),
    };
}