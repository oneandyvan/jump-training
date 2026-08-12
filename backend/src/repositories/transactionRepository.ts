import { ObjectId, Double } from "mongodb";
import { getTransactionCollection } from "../db.js";
import type { Transaction } from "../types/transaction.js";
import * as accountRepository from "./accountRepository.js";

type TransactionDocument = {
    _id: ObjectId;
    account_id: string;
    txn_type: string;
    amount: number;
    created_at: Date;
};

const collection = () => getTransactionCollection();

//  Helper function to convert document to Transaction object
function toTransaction(document: TransactionDocument): Transaction {
    return {
        id: document._id.toString(),
        account_id: document.account_id,
        txn_type: document.txn_type,
        amount: document.amount,
        created_at: document.created_at
    };
}

export async function depositTransaction(accountId: string, amount: number) {
    //  Update balance in account
    const balanceResult = await accountRepository.deposit(accountId, amount);

    if (!balanceResult) {
        throw new Error(`Couldn't deposit money for account ${accountId}`);
    }

    //  Create transaction record
    const transaction = {
        account_id: accountId,
        txn_type: "DEPOSIT",
        amount: new Double(amount),
        created_at: new Date(),
    }

    await collection().insertOne(transaction);

    return {
        txn_type: transaction.txn_type,
        amount: amount,
        created_at: transaction.created_at
    };
}