import * as accountRepository from "../repositories/accountRepository.js";
import * as transactionRepository from "../repositories/transactionRepository.js";
import { AccountNotFoundError } from "../errors/NotFound.js";

export async function depositTransaction(accountId: string, amount: number) {
    if (await accountRepository.findAccountById(accountId) === null) {
        throw new AccountNotFoundError(accountId);
    }

    return transactionRepository.depositTransaction(accountId, amount);
} 

export async function withdrawTransaction(accountId: string, amount: number) {
    if (await accountRepository.findAccountById(accountId) === null) {
        throw new AccountNotFoundError(accountId);
    }

    return transactionRepository.withdrawTransaction(accountId, amount);
}

export async function getTransactionsForCustomer(customerId: string) {
    return transactionRepository.getTransactionsForCustomer(customerId);
}

export async function getTransactionsForAccount(accountId: string) {
    return transactionRepository.getTransactionsForAccount(accountId);
}