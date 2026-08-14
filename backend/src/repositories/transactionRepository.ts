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

export async function withdrawTransaction(accountId: string, amount: number) {
    //  Update balance in account
    const balanceResult = await accountRepository.withdraw(accountId, amount);

    if (!balanceResult) {
        throw new Error(`Couldn't withdraw money from account ${accountId}`);
    }

    //  Create transaction record
    const transaction = {
        account_id: accountId,
        txn_type: "WITHDRAW",
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

export async function getTransactionsForAccount(accountId: string): Promise<Transaction[]> {
    const documents = await collection().find({ account_id: accountId }).toArray() as TransactionDocument[];
    return documents.map(toTransaction);
}

export async function getTransactionsForCustomer(customerId: string): Promise<Transaction[]> {
    //  First, get all accounts for the customer
    const accounts = await accountRepository.getAccounts(customerId);
    const accountIds = accounts.map(account => account.id);

    //  Then, get all transactions for these accounts
    const documents = await collection().find({ account_id: { $in: accountIds } }).toArray() as TransactionDocument[];
    return documents.map(toTransaction);
}